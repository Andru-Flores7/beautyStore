import React, { useState, useEffect, useRef } from 'react'
import { useProducts } from '../context/ProductContext'
import { useCart } from '../context/CartContext'
import ProductCard from './ProductCard'

const categoriasFijas = [
  'Todos',
  'Insumos De Uñas',
  'Insumos De Pestañas',
  'Productos Varios',
  'Maquillaje'
]

const ProductCatalog = ({ showToast }) => {
  const { products } = useProducts()
  const { addItem } = useCart()
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const debounceTimeout = useRef(null)

  useEffect(() => {
    let results = products

    // Filtrar por categoría
    if (selectedCategory !== 'Todos') {
      results = results.filter(p =>
        (p.categoria || '').trim().toLowerCase() === selectedCategory.trim().toLowerCase()
      )
    }

    // Filtrar por búsqueda
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase()
      results = results.filter(p =>
        (p.nombre || '').toLowerCase().includes(query) ||
        (p.categoria || '').toLowerCase().includes(query)
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
    showToast(`${product.nombre || 'Producto'} agregado al carrito`, 'success')
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12 text-center">
          <h1 className="display-4 fw-bold text-primary mb-3">Productos de Belleza</h1>
          <p className="lead text-muted">Descubre nuestra colección exclusiva de productos de belleza</p>
        </div>
      </div>

      {/* Etiquetas de categorías fijas */}
      <div className="row mb-3">
        <div className="col-12 d-flex justify-content-center gap-2 flex-wrap">
          {categoriasFijas.map(cat => (
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
