'use client';
import { useState, useRef, useEffect } from 'react';
import Modal from './Modal';

function AddTransaction({ user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle clicks outside the modal to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div>
      <button
        className='px-3 py-1 mr-2 text-xs sm:text-base font-medium rounded-full border bg-primary-800 text-white'
        onClick={toggleModal}
      >
        Add Transaction
      </button>

      {isModalOpen && (
        <Modal modalRef={modalRef} toggleModal={toggleModal} user={user} />
      )}
    </div>
  );
}

export default AddTransaction;
