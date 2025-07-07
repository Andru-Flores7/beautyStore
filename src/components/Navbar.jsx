import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Navbar = ({ onCartClick }) => {
    const { getTotalItems } = useCart()
    const totalItems = getTotalItems()
    const location = useLocation()

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container">
                <Link
                    className="navbar-brand fw-bold text-primary"
                    to="/"
                    style={{ cursor: 'pointer' }}
                >
                    <i className="bi bi-gem me-2"></i>Beauty Store
                </Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link 
                                className={`nav-link btn btn-link${location.pathname === '/' ? ' active' : ''}`}
                                to="/"
                            >
                                Catálogo
                            </Link>
                        </li>
                  
                    </ul>
                    <button 
                        className="btn btn-outline-primary position-relative"
                        onClick={onCartClick}
                    >
                        <i className="bi bi-cart3"></i>
                        Carrito
                        {totalItems > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {totalItems}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar