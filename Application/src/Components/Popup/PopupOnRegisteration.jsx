import React from "react";
import ReactDOM from "react-dom";

function PopupOnRegisteration({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };
  
  const popupStyle = {
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "0.5rem",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
    maxWidth: "400px",
    width: "100%",
    zIndex: 9999,
    position: "relative",
  };

  return ReactDOM.createPortal(
    <div style={overlayStyle}>
      <div style={popupStyle}>
        {children}
        {/* <button
          style={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
            background: "transparent",
            border: "none",
            fontSize: "1.25rem",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          ✕
        </button> */}
      </div>
    </div>,
    document.body
  );
}

export default PopupOnRegisteration;