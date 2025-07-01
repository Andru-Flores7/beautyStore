import React from 'react'
import { useCart } from '../context/CartContext'

const Navbar = ({ currentSection, setCurrentSection, onCartClick }) => {
    const { getTotalItems } = useCart()
    const totalItems = getTotalItems()

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container">
                <a className="navbar-brand fw-bold text-primary" href="#">
                    <i className="bi bi-gem me-2"></i>Beauty Store
                </a>
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
                            <button 
                                className={`nav-link btn btn-link ${currentSection === 'catalog' ? 'active' : ''}`}
                                onClick={() => setCurrentSection('catalog')}
                            >
                                Catálogo
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className={`nav-link btn btn-link ${currentSection === 'admin' ? 'active' : ''}`}
                                onClick={() => setCurrentSection('admin')}
                            >
                                Administración
                            </button>
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