import React from "react";
import "./Model.css"; // ודא שקובץ ה־CSS נמצא תקין

interface ModalProps {
  title: string;
  subtitle?: string;
  modalContent: React.ReactNode;
  isOpen: boolean;
  toggleModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, subtitle, modalContent, isOpen, toggleModal }) => {
  if (!isOpen) return null;

  return (
    <div className={`overlay open`} onClick={toggleModal}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <header>
          <h2>{title}</h2>
          {subtitle && <h3>{subtitle}</h3>}
        </header>
        <div className="content">{modalContent}</div>
      </div>
    </div>
  );
};

export default Modal;
