import React, { useState, useEffect } from 'react'
import { useProducts } from '../context/ProductContext'

const ProductModal = ({ show, onHide, product, onSuccess, showToast }) => {
    const { addProduct, updateProduct } = useProducts()
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        image: '',
        description: ''
    })

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                price: product.price.toString(),
                category: product.category,
                image: product.image,
                description: product.description
            })
        } else {
            setFormData({
                name: '',
                price: '',
                category: '',
                image: '',
                description: ''
            })
        }
    }, [product, show])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const validateForm = () => {
        if (!formData.name || formData.name.length < 2) {
            showToast('El nombre del producto debe tener al menos 2 caracteres', 'warning')
            return false
        }

        if (!formData.price || parseFloat(formData.price) <= 0) {
            showToast('El precio debe ser mayor a 0', 'warning')
            return false
        }

        if (!formData.category) {
            showToast('Debe seleccionar una categoría', 'warning')
            return false
        }

        if (!formData.image || !isValidUrl(formData.image)) {
            showToast('Debe proporcionar una URL válida para la imagen', 'warning')
            return false
        }

        if (!formData.description || formData.description.length < 10) {
            showToast('La descripción debe tener al menos 10 caracteres', 'warning')
            return false
        }

        return true
    }

    const isValidUrl = (string) => {
        try {
            new URL(string)
            return true
        } catch (_) {
            return false
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        try {
            if (product) {
                updateProduct(product.id, formData)
                onSuccess('Producto actualizado exitosamente')
            } else {
                addProduct(formData)
                onSuccess('Producto agregado exitosamente')
            }
        } catch (error) {
            showToast('Error al guardar el producto', 'danger')
            console.error('Error saving product:', error)
        }
    }

    if (!show) return null

    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">
                            <i className={`bi ${product ? 'bi-pencil' : 'bi-plus-circle'} me-2`}></i>
                            {product ? 'Editar Producto' : 'Agregar Producto'}
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
                                <label htmlFor="name" className="form-label">Nombre del Producto *</label>
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
                                <label htmlFor="price" className="form-label">Precio *</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    step="0.01" 
                                    min="0" 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Categoría *</label>
                                <select 
                                    className="form-select" 
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccionar categoría</option>
                                    <option value="Maquillaje">Maquillaje</option>
                                    <option value="Cuidado de la Piel">Cuidado de la Piel</option>
                                    <option value="Cuidado del Cabello">Cuidado del Cabello</option>
                                    <option value="Fragancias">Fragancias</option>
                                    <option value="Cuidado Corporal">Cuidado Corporal</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">URL de la Imagen *</label>
                                <input 
                                    type="url" 
                                    className="form-control" 
                                    id="image"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    required 
                                />
                                <div className="form-text">Ingresa la URL de una imagen del producto</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Descripción *</label>
                                <textarea 
                                    className="form-control" 
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="3" 
                                    required
                                ></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onHide}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                            <i className="bi bi-save me-2"></i>
                            {product ? 'Actualizar Producto' : 'Guardar Producto'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductModal