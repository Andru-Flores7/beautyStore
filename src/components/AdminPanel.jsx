import React, { useState } from 'react'
import { useProducts } from '../context/ProductContext'
import ProductModal from './ProductModal'

const AdminPanel = ({ showToast }) => {
    const { products, deleteProduct } = useProducts()
    const [showModal, setShowModal] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)

    const handleAddProduct = () => {
        setEditingProduct(null)
        setShowModal(true)
    }

    const handleEditProduct = (product) => {
        setEditingProduct(product)
        setShowModal(true)
    }

    const handleDeleteProduct = (product) => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar "${product.name}"?`)) {
            deleteProduct(product.id)
            showToast('Producto eliminado exitosamente', 'success')
        }
    }

    const handleModalSuccess = (message) => {
        setShowModal(false)
        setEditingProduct(null)
        showToast(message, 'success')
    }

    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/60x60?text=No+Image'
    }

    return (
        <div className="container py-5">
            <div className="row mb-4">
                <div className="col-12">
                    <h1 className="display-4 fw-bold text-primary mb-3">Panel de Administración</h1>
                    <button 
                        className="btn btn-success btn-lg"
                        onClick={handleAddProduct}
                    >
                        <i className="bi bi-plus-circle me-2"></i>Agregar Nuevo Producto
                    </button>
                </div>
            </div>

            {/* Admin Products Table */}
            <div className="row">
                <div className="col-12">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0"><i className="bi bi-table me-2"></i>Gestión de Productos</h5>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Imagen</th>
                                            <th>Nombre</th>
                                            <th>Precio</th>
                                            <th>Categoría</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="text-center py-4">
                                                    <div className="empty-state">
                                                        <i className="bi bi-inbox"></i>
                                                        <p>No hay productos disponibles</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            products.map(product => (
                                                <tr key={product.id}>
                                                    <td>
                                                        <img 
                                                            src={product.image} 
                                                            alt={product.name} 
                                                            className="admin-product-img"
                                                            onError={handleImageError}
                                                        />
                                                    </td>
                                                    <td>
                                                        <strong>{product.name}</strong>
                                                    </td>
                                                    <td>
                                                        <span className="text-primary fw-bold">
                                                            ${product.price.toFixed(2)}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-secondary">
                                                            {product.category}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="btn-group" role="group">
                                                            <button 
                                                                className="btn btn-sm btn-outline-primary" 
                                                                onClick={() => handleEditProduct(product)}
                                                                title="Editar"
                                                            >
                                                                <i className="bi bi-pencil"></i>
                                                            </button>
                                                            <button 
                                                                className="btn btn-sm btn-outline-danger" 
                                                                onClick={() => handleDeleteProduct(product)}
                                                                title="Eliminar"
                                                            >
                                                                <i className="bi bi-trash"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ProductModal 
                show={showModal}
                onHide={() => setShowModal(false)}
                product={editingProduct}
                onSuccess={handleModalSuccess}
                showToast={showToast}
            />
        </div>
    )
}

export default AdminPanel