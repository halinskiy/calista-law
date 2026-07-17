import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="container">
      <p className="mono">404</p>
      <h1>Page not found</h1>
      <Link to="/">Back to home</Link>
    </main>
  )
}
