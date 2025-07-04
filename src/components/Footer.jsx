import React from 'react'

const Footer = () => (
  <footer className="bg-light text-center text-muted py-3 mt-auto shadow-sm">
    <div className="container">
      <small>
        &copy; {new Date().getFullYear()} Beauty Store · Hecho con <i className="bi bi-heart-fill text-danger"></i> en Argentina
      </small>
    </div>
  </footer>
)

export default Footer