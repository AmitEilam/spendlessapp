'use client';
import { useState, useRef, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
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
        className='flex items-center px-3 py-1 mr-2 text-xs sm:text-base font-medium rounded-md border border-primary-800 bg-white text-primary-800 hover:bg-primary-800 hover:text-white'
        onClick={toggleModal}
      >
        <FaPlus className='mr-1' />
        Add Transaction
      </button>

      {isModalOpen && (
        <Modal modalRef={modalRef} toggleModal={toggleModal} user={user} />
      )}
    </div>
  );
}

export default AddTransaction;
