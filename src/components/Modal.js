import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './Modal.css';
export default function Modal({ onClose, children }) {
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    return (_jsx("div", { className: "modal-overlay", onClick: handleBackdropClick, children: _jsxs("div", { className: "modal-content", children: [_jsx("button", { className: "modal-close", onClick: onClose, children: "\u2715" }), children] }) }));
}
