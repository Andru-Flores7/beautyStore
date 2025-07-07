import React, { useState } from 'react'
import { useCart } from '../context/CartContext'

const CheckoutModal = ({ show, onHide, onSuccess, showToast }) => {
    const { getTotal, clearCart, items } = useCart()
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        email: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const generateOrderId = () => {
        return 'ORD-' + Date.now().toString().slice(-8)
    }

    const saveOrder = (order) => {
        const orders = JSON.parse(localStorage.getItem('beautyOrders') || '[]')
        orders.push(order)
        localStorage.setItem('beautyOrders', JSON.stringify(orders))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
            showToast('Por favor complete todos los campos obligatorios', 'warning')
            return
        }

        // Generar mensaje para WhatsApp
        const telefono = '543884636451'
        const productos = items.map(item =>
            `• ${item.product.name} x${item.quantity} - $${(item.product.price * item.quantity).toFixed(2)}`
        ).join('\n')
        const total = `$${getTotal().toFixed(2)}`
        const mensaje =
            `¡Hola! Quiero hacer un pedido:\n\n` +
            `*Datos del cliente:*\n` +
            `Nombre: ${formData.name}\n` +
            `Teléfono: ${formData.phone}\n` +
            `Dirección: ${formData.address}\n` +
            (formData.email ? `Email: ${formData.email}\n` : '') +
            `\n*Pedido:*\n${productos}\n\n` +
            `*Total:* ${total}`

        const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`
        window.open(url, '_blank')

        // Limpia el carrito y el formulario
        clearCart()
        setFormData({
            name: '',
            phone: '',
            address: '',
            email: ''
        })

        // Cierra el modal y muestra el de éxito
        onSuccess()
    }

    if (!show) return null

    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header bg-success text-white">
                        <h5 className="modal-title">
                            <i className="bi bi-person-fill me-2"></i>Datos del Cliente
                        </h5>
                        <button 
                            type="button" 
                            className="btn-close btn-close-white" 
                            onClick={onHide}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nombre Completo *</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Teléfono *</label>
                                <input 
                                    type="tel" 
                                    className="form-control" 
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Dirección *</label>
                                <textarea 
                                    className="form-control" 
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows="3" 
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email (opcional)</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="alert alert-info">
                                <i className="bi bi-info-circle me-2"></i>
                                <strong>Total del pedido: ${getTotal().toFixed(2)}</strong>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onHide}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-success" onClick={handleSubmit}>
                            <i className="bi bi-send me-2"></i>Enviar Pedido
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutModal