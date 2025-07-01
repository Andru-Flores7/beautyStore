import React, { useEffect } from 'react'

const ToastContainer = ({ toasts }) => {
    return (
        <div className="toast-container">
            {toasts.map(toast => (
                <Toast key={toast.id} toast={toast} />
            ))}
        </div>
    )
}

const Toast = ({ toast }) => {
    const getToastClass = (type) => {
        const baseClass = 'toast align-items-center text-white border-0 mb-2'
        switch (type) {
            case 'success':
                return `${baseClass} bg-success`
            case 'danger':
                return `${baseClass} bg-danger`
            case 'warning':
                return `${baseClass} bg-warning`
            case 'info':
            default:
                return `${baseClass} bg-info`
        }
    }

    return (
        <div className={getToastClass(toast.type)} role="alert">
            <div className="d-flex">
                <div className="toast-body">
                    {toast.message}
                </div>
            </div>
        </div>
    )
}

export default ToastContainer