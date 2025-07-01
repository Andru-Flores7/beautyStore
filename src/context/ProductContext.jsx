import React, { createContext, useContext, useState, useEffect } from 'react'
import { initialProducts } from '../data/initialProducts'

const ProductContext = createContext()

export const useProducts = () => {
    const context = useContext(ProductContext)
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider')
    }
    return context
}

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = () => {
        const savedProducts = localStorage.getItem('beautyProducts')
        if (savedProducts) {
            setProducts(JSON.parse(savedProducts))
        } else {
            setProducts(initialProducts)
            localStorage.setItem('beautyProducts', JSON.stringify(initialProducts))
        }
    }

    const saveProducts = (newProducts) => {
        localStorage.setItem('beautyProducts', JSON.stringify(newProducts))
        setProducts(newProducts)
    }

    const addProduct = (productData) => {
        const newProduct = {
            id: generateId(),
            ...productData,
            price: parseFloat(productData.price)
        }
        const updatedProducts = [...products, newProduct]
        saveProducts(updatedProducts)
        return newProduct
    }

    const updateProduct = (id, productData) => {
        const updatedProducts = products.map(product => 
            product.id === parseInt(id) 
                ? { ...product, ...productData, price: parseFloat(productData.price) }
                : product
        )
        saveProducts(updatedProducts)
        return updatedProducts.find(p => p.id === parseInt(id))
    }

    const deleteProduct = (id) => {
        const updatedProducts = products.filter(product => product.id !== parseInt(id))
        saveProducts(updatedProducts)
    }

    const getProductById = (id) => {
        return products.find(product => product.id === parseInt(id))
    }

    const searchProducts = (query) => {
        if (!query) return products
        
        const searchTerm = query.toLowerCase()
        return products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        )
    }

    const generateId = () => {
        return products.length > 0 
            ? Math.max(...products.map(p => p.id)) + 1 
            : 1
    }

    const value = {
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        searchProducts
    }

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}