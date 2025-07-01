import React, { useState } from 'react'
import { useProducts } from '../context/ProductContext'
import { useCart } from '../context/CartContext'
import ProductCard from './ProductCard'

const ProductCatalog = ({ showToast }) => {
    const { products, searchProducts } = useProducts()
    const { addItem } = useCart()
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredProducts, setFilteredProducts] = useState(products)

    React.useEffect(() => {
        setFilteredProducts(products)
    }, [products])

    const handleSearch = () => {
        const results = searchProducts(searchQuery)
        setFilteredProducts(results)
        
        if (searchQuery && results.length === 0) {
            showToast(`No se encontraron productos para "${searchQuery}"`, 'info')
        }
    }

    const handleAddToCart = (product) => {
        addItem(product)
        showToast(`${product.name} agregado al carrito`, 'success')
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
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
                            onKeyPress={handleKeyPress}
                        />
                        <button 
                            className="btn btn-outline-primary search-btn" 
                            type="button"
                            onClick={handleSearch}
                        >
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="row">
                {filteredProducts.length === 0 ? (
                    <div className="col-12">
                        <div className="empty-state">
                            <i className="bi bi-search"></i>
                            <p>No se encontraron productos</p>
                        </div>
                    </div>
                ) : (
                    filteredProducts.map(product => (
                        <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
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