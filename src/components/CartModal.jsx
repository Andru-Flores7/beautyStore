import React, { useEffect } from 'react'
import { useCart } from '../context/CartContext'
import '../assets/css/CartModal.css'
import formatPrice from '../utils/formatPrice'

const CartModal = ({ show, onHide, onCheckout, showToast }) => {
    const { items, updateQuantity, removeItem, getTotal } = useCart()

    // Efecto para blur de fondo
    useEffect(() => {
        if (show) {
            document.body.classList.add('modal-blur-bg')
        } else {
            document.body.classList.remove('modal-blur-bg')
        }
        return () => document.body.classList.remove('modal-blur-bg')
    }, [show])

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) return
        updateQuantity(productId, newQuantity)
    }

    const handleRemoveItem = (productId, productName) => {
        removeItem(productId)
        showToast(`${productName} eliminado del carrito`, 'info')
    }

    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/80x80?text=No+Image'
    }

    if (!show) return null

    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">
                            <i className="bi bi-cart3 me-2"></i>Carrito de Compras
                        </h5>
                        <button 
                            type="button" 
                            className="btn-close btn-close-white" 
                            onClick={onHide}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {items.length === 0 ? (
                            <div className="text-center py-4">
                                <i className="bi bi-cart-x display-1 text-muted"></i>
                                <p className="lead text-muted mt-3">Tu carrito está vacío</p>
                            </div>
                        ) : (
                            <div>
                                {items.map(item => (
                                    <div key={item.product.id} className="cart-item">
                                        <div className="row align-items-center">
                                            <div className="col-3">
                                                <img 
                                                    src={item.product.image} 
                                                    alt={item.product.name} 
                                                    className="img-fluid rounded"
                                                    onError={handleImageError}
                                                />
                                            </div>
                                            <div className="col-6">
                                                <h6 className="mb-1">{item.product.name}</h6>
                                                <small className="text-muted">{item.product.category}</small>
                                                <div className="fw-bold text-primary">
                                                    {formatPrice(item.product.price)}
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="quantity-control d-flex align-items-center justify-content-center gap-2">
                                                    <button
                                                        className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
                                                        style={{ width: 32, height: 32, padding: 0 }}
                                                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                        aria-label="Disminuir cantidad"
                                                    >
                                                        <i className="bi bi-dash fs-5"></i>
                                                    </button>
                                                    <span className="mx-2 fs-5 fw-semibold" style={{ minWidth: 32, textAlign: 'center' }}>
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
                                                        style={{ width: 32, height: 32, padding: 0 }}
                                                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                                                        aria-label="Aumentar cantidad"
                                                    >
                                                        <i className="bi bi-plus fs-5"></i>
                                                    </button>
                                                </div>
                                                <button 
                                                    className="btn btn-sm btn-outline-danger mt-2 w-100"
                                                    onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <div className="w-100">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="mb-0">
                                    Total: <span className="text-primary">{formatPrice(getTotal())}</span>
                                </h5>
                                <button 
                                    className="btn btn-success btn-lg" 
                                    disabled={items.length === 0}
                                    onClick={onCheckout}
                                >
                                    <i className="bi bi-credit-card me-2"></i>Finalizar Compra
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartModal