import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../SupabaseClient'

const ProductContext = createContext()

export const useProducts = () => useContext(ProductContext)

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])

  // Se ejecuta al cargar la app
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('productos').select('*')

    if (error) {
      console.error('❌ Error al obtener productos:', error.message)
    } else {
      setProducts(data)
    }
  }

  const searchProducts = (query) => {
    return products.filter(p =>
      p.nombre?.toLowerCase().includes(query.toLowerCase())
    )
  }

  const value = {
    products,
    fetchProducts,
    searchProducts
  }

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}
