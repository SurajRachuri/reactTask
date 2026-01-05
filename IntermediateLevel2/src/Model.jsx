import { useEffect } from "react";
import { createPortal } from "react-dom";
// import "./Modal.css";

function Modal({ isOpen, onClose, title, children, footer }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        {title && (
          <div className="modal-header">
            <h3>{title}</h3>
            <button className="close-btn" onClick={onClose}>
              ×
            </button>
          </div>
        )}

        {/* BODY */}
        <div className="modal-body">{children}</div>

        {/* FOOTER */}
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default Modal;
