import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { IoClose } from 'react-icons/io5';

function Modal({ isOpen, onClose, category, price, date, notes }) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'
      onClick={onClose} // Close modal when clicking outside
    >
      <div
        className='bg-white rounded-lg p-5 px-12 max-w-sm mx-auto relative'
        onClick={(e) => e.stopPropagation()} // Prevent click event from bubbling to the parent
      >
        <button
          onClick={onClose}
          className='absolute -m-2 top-4 right-4 text-primary-800'
        >
          <IoClose size={24} />
        </button>
        <h2 className='text-xl font-bold mb-4'>Transaction Details</h2>
        <div className='mb-4 flex'>
          <p className='font-semibold mr-2'>📅</p>
          <p>{date}</p>
        </div>
        <div className='mb-4 flex'>
          <p className='font-semibold mr-2'>📍</p>
          <p>{category}</p>
        </div>
        <div className='mb-4 flex'>
          <p className='font-semibold mr-2'>💰</p>
          <p>
            {price}
            &#8362;
          </p>
        </div>
        <div className='mb-4 flex'>
          <p className='font-semibold mr-2'>📝</p>
          <p>{notes}</p>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
