import React, { useState } from 'react';
import { useTheme } from '@mui/material';
import ConversationCannedResponse from '../ConversationCannedResponse';
import ConversationAddArticle from '../ConversationAddArticle';

export const useConversationArticleSelect = () => {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<any>({
    component: null,
    title: '',
  });

  const handleCannedResponseClick = () => {
    setSelectedComponent({
      component: (
        <ConversationCannedResponse
          onAddButtonClick={(selectedTitle: any) =>
            handleAddButtonClick(selectedTitle)
          }
        />
      ),
      title: 'Canned Response Modal',
    });
    setIsModalOpen(true);
  };

  const handleArticleClick = () => {
    setSelectedComponent({
      component: (
        <ConversationAddArticle
          onAddContractButtonClick={(selectedTitle: any) =>
            handleAddButtonClick(selectedTitle)
          }
        />
      ),
      title: 'Article Modal',
    });
    setIsModalOpen(true);
  };

  const handleAddButtonClick = (selectedTitle: any) => {
    selectedTitle;
    setIsModalOpen(false);
  };

  return {
    handleCannedResponseClick,
    handleArticleClick,
    isModalOpen,
    setIsModalOpen,
    theme,
    selectedComponent,
  };
};
