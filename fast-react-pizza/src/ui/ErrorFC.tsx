import { useNavigate, useRouteError, isRouteErrorResponse } from 'react-router-dom'

function ErrorFC() {
  const navigate = useNavigate()
  const error = useRouteError()
  let errorMessage: string

  if (isRouteErrorResponse(error)) {
    // Type assertion using the type guard
    errorMessage = error.error?.message || error.statusText
  } else if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  } else {
    errorMessage = 'Unknown error'
  }

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{errorMessage}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  )
}

export default ErrorFC
