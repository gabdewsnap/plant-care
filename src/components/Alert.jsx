import React, { useEffect } from "react";
import { styled } from "styled-components";

const AlertWrapper = styled.div`
  position: fixed;
  top:20px;
  right: 20px;
  background: #f6fff3ff;
  color: #38735c;
  border: 2px solid #38735c;
  padding: 1rem;
  border-radius: 12px;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  
  &.show {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default function Alert({ message, isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000); // auto-close after 2s
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AlertWrapper className={isVisible ? "show" : ""}>
       {message} 
    </AlertWrapper>
  );
}