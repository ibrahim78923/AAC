import { useState } from 'react';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { useTheme } from '@mui/material';
import { AIR_SERVICES } from '@/constants';
import { actionBtnData, articlesColumnsFunction, data } from './Articles.data';

export const useArticles = () => {
  const { KNOWLEDGE_BASE_VIEW_ARTICLE, KNOWLEDGE_BASE_EDIT_ARTICLE } =
    AIR_SERVICES;
  const theme = useTheme();
  const { push } = useRouter();
  const [selectedArticlesData, setSelectedArticlesData] = useState([]);
  const [selectedArticlesTab, setSelectedArticlesTab] = useState('all');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [moveFolderModal, setMoveFolderModal] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  const handleSelectedArticlesTab = (tab: string) => {
    setSelectedArticlesTab(tab);
  };
  const handleSingleArticleNavigation = (id: string) => {
    push(`${KNOWLEDGE_BASE_VIEW_ARTICLE}?id=${id}`);
  };
  const handleEditNavigation = (id: string) => {
    push(`${KNOWLEDGE_BASE_EDIT_ARTICLE}?id=${id}`);
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
  const dropdownOptions = actionBtnData(
    setOpenDeleteModal,
    setMoveFolderModal,
    handleEditNavigation,
  );

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
    theme,
    openFilter,
    setOpenFilter,
  };
};
