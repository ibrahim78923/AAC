import { useState } from 'react';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { AIR_SERVICES } from '@/constants';
import { actionBtnData, articlesColumnsFunction, data } from './Articles.data';

export const useArticles = () => {
  const { KNOWLEDGE_BASE } = AIR_SERVICES;
  const { push } = useRouter();
  const [selectedArticlesData, setSelectedArticlesData] = useState([]);
  const [selectedArticlesTab, setSelectedArticlesTab] = useState('all');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [moveFolderModal, setMoveFolderModal] = useState(false);

  const handleSelectedArticlesTab = (tab: string) => {
    setSelectedArticlesTab(tab);
  };
  const handleSingleArticleNavigation = (id: string) => {
    push(`${KNOWLEDGE_BASE}?id=${id}`);
  };
  const articlesColumns = articlesColumnsFunction(
    data,
    selectedArticlesData,
    setSelectedArticlesData,
    handleSingleArticleNavigation,
  );
  const handleDeleteSubmit = () => {
    setOpenDeleteModal(false);
    enqueueSnackbar('Article deleted successfully', {
      variant: 'success',
      autoHideDuration: 2000,
    });
  };
  const dropdownOptions = actionBtnData(setOpenDeleteModal, setMoveFolderModal);

  return {
    articlesColumns,
    selectedArticlesTab,
    handleSelectedArticlesTab,
    selectedArticlesData,
    openDeleteModal,
    setOpenDeleteModal,
    handleDeleteSubmit,
    moveFolderModal,
    setMoveFolderModal,
    dropdownOptions,
  };
};
