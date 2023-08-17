import { createContext, useContext, useMemo, useState } from 'react';
import { faker } from '@faker-js/faker';

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

// Create a context
const PostContext = createContext();

function PostProvider({ children }) {
  const [posts, setPosts] = useState(() => Array.from({ length: 30 }, () => createRandomPost()));
  const [searchQuery, setSearchQuery] = useState('');

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  /**
   * Because when the dark mode is triggered,the Provider will re-render.
   * memo the object to prevent the children of Provider also re-render which helps the optimization
   */
  const value = useMemo(
    () => ({
      posts: searchedPosts,
      onAddPost: handleAddPost,
      onClearPosts: handleClearPosts,
      searchQuery,
      setSearchQuery,
    }),
    [searchQuery, searchedPosts]
  );

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

function usePosts() {
  const context = useContext(PostContext);

  // Check if the context was misused
  if (context === undefined) throw new Error('PostContext is used outside of the PostProvider');

  return context;
}

export { PostProvider, usePosts };
