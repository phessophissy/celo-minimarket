import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '2rem',
          maxWidth: '600px',
          margin: '2rem auto',
          background: 'linear-gradient(135deg, #1a2f23 0%, #2d4a3e 100%)',
          color: '#e8f5e9',
          borderRadius: '16px',
          border: '2px solid rgba(239, 83, 80, 0.5)',
          fontFamily: 'Century Gothic, sans-serif'
        }}>
          <h2 style={{ color: '#ef5350' }}>⚠️ Application Error</h2>
          <p>Something went wrong. This might be caused by:</p>
          <ul>
            <li>Multiple wallet extensions conflicting (MetaMask, Pocket Universe, etc.)</li>
            <li>Browser extension compatibility issues</li>
            <li>Network connectivity problems</li>
          </ul>
          <p><strong>Try:</strong></p>
          <ol>
            <li>Disabling conflicting wallet extensions</li>
            <li>Refreshing the page</li>
            <li>Using a different browser or incognito mode</li>
          </ol>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginTop: '1rem'
            }}
          >
            🔄 Reload Page
          </button>
          <details style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.8 }}>
            <summary style={{ cursor: 'pointer' }}>Technical Details</summary>
            <pre style={{ 
              background: 'rgba(0,0,0,0.3)', 
              padding: '1rem', 
              borderRadius: '8px',
              overflow: 'auto',
              marginTop: '0.5rem'
            }}>
              {this.state.error?.toString()}
            </pre>
          </details>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
