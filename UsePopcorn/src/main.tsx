import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
// import Expander from './challenges/Expander.jsx'
// import StarRating from './components/StarRating.tsx'
// import Convertor from './challenges/Convertor.jsx'
import Geolocation from './challenges/Geolocation';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    <Geolocation />
    {/* <Convertor /> */}
    {/* <StarRating
      maxRating={5}
      messages={['Terrible', 'Bad', 'OK', 'Good', 'Amazing']}
    />
    <StarRating size={24} defaultRating={3} color="blue" /> */}
    {/* <Expander /> */}
  </React.StrictMode>
);
