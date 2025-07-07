import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import Navbar from './components/Navbar'
import ProductCatalog from './components/ProductCatalog'

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
                  {/* <Route path="/admin" element={<AdminPanel showToast={showToast} />} /> */}
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