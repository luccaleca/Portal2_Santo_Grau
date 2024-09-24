import React from 'react';
import '../../styles/promocoes/ModalPromocao.css';

const Modal = ({ children, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close-btn" onClick={onClose}>
                    Cancelar
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
