// components/ui/MessagePopup.js
import React, { useEffect, useState } from 'react';

const MessagePopup = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, 5000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div className={`message-popup ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="message-content">
        {message}
      </div>
    </div>
  );
};

export default MessagePopup;
