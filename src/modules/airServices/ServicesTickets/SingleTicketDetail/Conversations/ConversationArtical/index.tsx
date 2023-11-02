import React, { useState, useEffect } from 'react';
import ConversationModel from '@/components/Model/CoversationModel';

const ConversationArtical = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    openModal();
  }, []);

  return (
    <>
      <ConversationModel
        open={isModalOpen}
        handleClose={closeModal}
        selectedItem="Add User"
        okText="Add"
        footer={true}
      />
      Hello, this is my ConversationArtical
    </>
  );
};

export default ConversationArtical;
