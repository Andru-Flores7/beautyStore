import React, { useState, useEffect, useRef } from 'react'
import { useProducts } from '../context/ProductContext'
import { useCart } from '../context/CartContext'
import ProductCard from './ProductCard'

// Obtiene las categorías únicas de los productos, normalizando espacios y mayúsculas
const getCategories = (products) => {
    const map = new Map()
    products.forEach(p => {
        if (p.category && p.category.trim()) {
            // Normaliza para evitar duplicados por mayúsculas/espacios
            const key = p.category.trim().toLowerCase()
            if (!map.has(key)) {
                map.set(key, p.category.trim())
            }
        }
    })
    return ['Todos', ...Array.from(map.values())]
}

const ProductCatalog = ({ showToast }) => {
    const { products, searchProducts } = useProducts()
    const { addItem } = useCart()
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredProducts, setFilteredProducts] = useState(products)
    const [selectedCategory, setSelectedCategory] = useState('Todos')
    const debounceTimeout = useRef(null)
    const categories = getCategories(products)

    useEffect(() => {
        let results = searchProducts(searchQuery)
        if (selectedCategory !== 'Todos') {
            results = results.filter(p =>
                p.category &&
                p.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
            )
        }
        setFilteredProducts(results)

        if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
        if (searchQuery) {
            debounceTimeout.current = setTimeout(() => {
                if (results.length === 0) {
                    showToast(`No se encontraron productos para "${searchQuery}"`, 'info')
                }
            }, 500)
        }
        return () => clearTimeout(debounceTimeout.current)
    }, [searchQuery, products, selectedCategory])

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

            {/* Etiquetas de categorías dinámicas */}
            <div className="row mb-3">
                <div className="col-12 d-flex justify-content-center gap-2 flex-wrap">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
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