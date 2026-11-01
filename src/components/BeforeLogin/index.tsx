import React from 'react'

const BeforeLogin: React.FC = () => {
  return (
    <div>
      <h1 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: 600 }}>
        Souskai Admin
      </h1>
      <p style={{ margin: 0 }}>
        Client accounts are read-only: browse collections and preview pages freely. Publishing is
        reserved for the team.
      </p>
    </div>
  )
}

export default BeforeLogin
