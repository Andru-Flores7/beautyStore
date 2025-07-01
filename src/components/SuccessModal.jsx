import React from 'react'

const SuccessModal = ({ show, onHide, orderNumber }) => {
    if (!show) return null

    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header bg-success text-white">
                        <h5 className="modal-title">
                            <i className="bi bi-check-circle me-2"></i>¡Pedido Enviado!
                        </h5>
                    </div>
                    <div className="modal-body text-center">
                        <i className="bi bi-check-circle-fill display-1 text-success mb-3"></i>
                        <h4>¡Gracias por tu compra!</h4>
                        <p className="lead">
                            Tu pedido ha sido enviado exitosamente. Nos pondremos en contacto contigo pronto.
                        </p>
                        <div className="alert alert-info mt-3">
                            <strong>Número de pedido:</strong> {orderNumber}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" onClick={onHide}>
                            Continuar Comprando
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuccessModal