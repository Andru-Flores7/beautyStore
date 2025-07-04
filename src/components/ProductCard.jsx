import React from 'react'
import"../assets/css/ProductCard.css"
import formatPrice from '../utils/formatPrice'

const ProductCard = ({ product, onAddToCart }) => {
    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/300x250?text=No+Image'
    }

    return (
        <div className="card product-card h-100 fade-in">
            <div className="product-img-container">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-img"
                    onError={handleImageError}
                />
            </div>
            <div className="card-body d-flex flex-column">
                <div className="mb-2">
                    <span className="product-category">{product.category}</span>
                </div>
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted flex-grow-1">{product.description}</p>
                <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="product-price">{formatPrice(product.price)}</span>
                    </div>
                    <button 
                        className="btn btn btn-primary w-100"
                        onClick={() => onAddToCart(product)}
                    >
                        <i className="bi bi-cart-plus me-2"></i>Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard