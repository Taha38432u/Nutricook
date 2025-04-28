const Modal = ({
  isOpen,
  closeModal,
  children,
  modalName = "Custom Modal",
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
      onClick={closeModal}
    >
      <div
        className="w-full max-w-2xl rounded-lg bg-gray-800 p-8 shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside modal
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl text-white">{modalName}</h2>
          <button
            onClick={closeModal}
            className="text-2xl font-bold text-white"
          >
            &times; {/* Close button */}
          </button>
        </div>
        {children} {/* Render children passed to modal */}
      </div>
    </div>
  );
};

export default Modal;
