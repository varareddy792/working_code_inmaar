import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    //top: '50%',
    //left: '50%',
    //right: 'auto',
    //bottom: 'auto',
    //marginRight: '-50%',
    //transform: 'translate(-50%, -50%)',
  },
};

const ReactModal = ({ isModalOpen, setOpenModel, modalBody }) => {
  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }

  const closeModal = () => {
    //setIsOpen(false);
    setOpenModel(false)
  }

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        //className=""
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button className="float-right bg-indigo-600 text-white font-bold rounded-lg w-6 h-8" onClick={closeModal}>X</button>
        {modalBody}
      </Modal>
    </div>
  );
}

export default ReactModal;