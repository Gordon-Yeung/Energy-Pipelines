// components/ui/MessagePopup.js
import React from 'react';

const MessagePopup = ({ message, onClose }) => {
  return (
    <div className="message-popup-overlay">
      <div className="message-popup">
        <p className="message-text">{message}</p>
        <button 
          className="message-close-button"
          onClick={onClose}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default MessagePopUp;
