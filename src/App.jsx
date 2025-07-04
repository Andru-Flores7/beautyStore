import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import './App.css'
import Navbar from './components/Navbar'
import ProductCatalog from './components/ProductCatalog'
import AdminPanel from './components/AdminPanel'
import CartModal from './components/CartModal'
import CheckoutModal from './components/CheckoutModal'
import SuccessModal from './components/SuccessModal'
import ToastContainer from './components/ToastContainer'
import { ProductProvider } from './context/ProductContext'
import { CartProvider } from './context/CartContext'
import Footer from './components/Footer'


function App() {
  const [showCartModal, setShowCartModal] = useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [toasts, setToasts] = useState([])

  const showToast = (message, type = 'info') => {
    const id = Date.now()
    const newToast = { id, message, type }
    setToasts(prev => [...prev, newToast])
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 5000)
  }

  const handleCheckoutSuccess = (orderId) => {
    setOrderNumber(orderId)
    setShowCartModal(false)
    setShowCheckoutModal(false)
    setShowSuccessModal(true)
  }

  const handleConfirm = () => {
    // Reemplaza estos con tus propios estados/props
    const telefono = '543884636451'
    const nombreCliente = formData.nombre
    const emailCliente = formData.email
    const direccionCliente = formData.direccion
    const productos = cartItems.map(item =>
      `• ${item.product.name} x${item.quantity} - ${formatPrice(item.product.price * item.quantity)}`
    ).join('\n')
    const total = formatPrice(getTotal())

    const mensaje = 
      `¡Hola! Quiero hacer un pedido:\n\n` +
      `*Datos del cliente:*\n` +
      `Nombre: ${nombreCliente}\n` +
      `Email: ${emailCliente}\n` +
      `Dirección: ${direccionCliente}\n\n` +
      `*Pedido:*\n${productos}\n\n` +
      `*Total:* ${total}`

    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')
    // Opcional: puedes cerrar el modal aquí si lo deseas
    onHide()
  }

  return (
    <ProductProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Navbar onCartClick={() => setShowCartModal(true)} />
            <div className="main-content">
              <main className="container-fluid">
                <Routes>
                  <Route path="/" element={<ProductCatalog showToast={showToast} />} />
                  <Route path="/admin" element={<AdminPanel showToast={showToast} />} />
                </Routes>
              </main>
            </div>
            <CartModal 
              show={showCartModal}
              onHide={() => setShowCartModal(false)}
              onCheckout={() => setShowCheckoutModal(true)}
              showToast={showToast}
            />
            <CheckoutModal 
              show={showCheckoutModal}
              onHide={() => setShowCheckoutModal(false)}
              onSuccess={handleCheckoutSuccess}
              showToast={showToast}
            />
            <SuccessModal 
              show={showSuccessModal}
              onHide={() => setShowSuccessModal(false)}
              orderNumber={orderNumber}
            />
            <ToastContainer toasts={toasts} />
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ProductProvider>
  )
}

export default App