import React, { useState, useEffect, useRef } from 'react'
import { useProducts } from '../context/ProductContext'
import { useCart } from '../context/CartContext'
import ProductCard from './ProductCard'

const ProductCatalog = ({ showToast }) => {
    const { products, searchProducts } = useProducts()
    const { addItem } = useCart()
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredProducts, setFilteredProducts] = useState(products)
    const debounceTimeout = useRef(null)

    useEffect(() => {
        // Búsqueda reactiva desde la primera letra
        const results = searchProducts(searchQuery)
        setFilteredProducts(results)

        // Debounce para el toast
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
        if (searchQuery) {
            debounceTimeout.current = setTimeout(() => {
                if (results.length === 0) {
                    showToast(`No se encontraron productos para "${searchQuery}"`, 'info')
                }
            }, 500)
        }
        // Limpieza
        return () => clearTimeout(debounceTimeout.current)
    }, [searchQuery, products])

    const handleAddToCart = (product) => {
        addItem(product)
        showToast(`${product.name} agregado al carrito`, 'success')
    }

    return (
        <div className="container py-5">
            <div className="row mb-4">
                <div className="col-12 text-center">
                    <h1 className="display-4 fw-bold text-primary mb-3">Productos de Belleza</h1>
                    <p className="lead text-muted">Descubre nuestra colección exclusiva de productos de belleza</p>
                </div>
            </div>
            
            {/* Search and Filter */}
            <div className="row mb-4">
                <div className="col-md-6 offset-md-3">
                    <div className="input-group">
                        <input 
                            type="text" 
                            className="form-control search-input" 
                            placeholder="Buscar productos..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button 
                            className="btn btn-outline-primary search-btn" 
                            type="button"
                            onClick={() => {}} 
                        >
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {filteredProducts.length === 0 ? (
                    <div className="col-12">
                        <div className="empty-state">
                            <i className="bi bi-search"></i>
                            <p>No se encontraron productos</p>
                        </div>
                    </div>
                ) : (
                    filteredProducts.map(product => (
                        <div key={product.id} className="col">
                            <ProductCard 
                                product={product} 
                                onAddToCart={handleAddToCart}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default ProductCatalog