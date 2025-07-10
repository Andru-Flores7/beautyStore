import React from 'react'

const Footer = () => (
  <footer className="bg-light text-center text-muted py-3 mt-auto shadow-sm">
    <div className="container">
      <div className="mb-2">
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="mx-2 text-reset">
          <i className="bi bi-instagram fs-4"></i>
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="mx-2 text-reset">
          <i className="bi bi-facebook fs-4"></i>
        </a>
        <a href="https://wa.me/543884636451" target="_blank" rel="noopener noreferrer" className="mx-2 text-reset">
          <i className="bi bi-whatsapp fs-4"></i>
        </a>
      </div>
      <small>
        &copy; {new Date().getFullYear()} Lashess Elegance Studio· Hecho por Andru <i className="bi bi-eyeglasses"></i>
      </small>
    </div>
  </footer>
)

export default Footer