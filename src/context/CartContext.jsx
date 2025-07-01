import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState([])

    useEffect(() => {
        loadCart()
    }, [])

    const loadCart = () => {
        const savedCart = localStorage.getItem('beautyCart')
        if (savedCart) {
            setItems(JSON.parse(savedCart))
        }
    }

    const saveCart = (newItems) => {
        localStorage.setItem('beautyCart', JSON.stringify(newItems))
        setItems(newItems)
    }

    const addItem = (product, quantity = 1) => {
        const existingItem = items.find(item => item.product.id === product.id)
        
        if (existingItem) {
            const updatedItems = items.map(item =>
                item.product.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            )
            saveCart(updatedItems)
        } else {
            const newItems = [...items, { product: { ...product }, quantity }]
            saveCart(newItems)
        }
    }

    const removeItem = (productId) => {
        const updatedItems = items.filter(item => item.product.id !== productId)
        saveCart(updatedItems)
    }

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeItem(productId)
        } else {
            const updatedItems = items.map(item =>
                item.product.id === productId
                    ? { ...item, quantity }
                    : item
            )
            saveCart(updatedItems)
        }
    }

    const getTotal = () => {
        return items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
    }

    const getTotalItems = () => {
        return items.reduce((total, item) => total + item.quantity, 0)
    }

    const clearCart = () => {
        setItems([])
        localStorage.removeItem('beautyCart')
    }

    const value = {
        items,
        addItem,
        removeItem,
        updateQuantity,
        getTotal,
        getTotalItems,
        clearCart
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}