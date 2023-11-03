import { useState } from 'react';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';
import { articlesColumnsFunction, data } from './Articles.data';

export const useArticles = () => {
  const { KNOWLEDGE_BASE } = AIR_SERVICES;

  const { push } = useRouter();
  const [selectedArticlesData, setSelectedArticlesData] = useState([]);
  const [selectedArticlesTab, setSelectedArticlesTab] = useState('all');

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

  return {
    articlesColumns,
    selectedArticlesTab,
    handleSelectedArticlesTab,
  };
};
