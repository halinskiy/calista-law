import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="container" style={{ padding: '10rem var(--gutter) 8rem' }}>
      <p className="mono">404</p>
      <h1 style={{ marginTop: '0.5rem' }}>Page not found</h1>
      <p style={{ marginTop: '1rem' }}>
        <Link to="/" style={{ color: 'var(--brand)', fontWeight: 600 }}>
          Back to home →
        </Link>
      </p>
    </main>
  )
}
