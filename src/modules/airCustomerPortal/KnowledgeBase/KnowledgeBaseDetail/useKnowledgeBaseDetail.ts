import { useRouter } from 'next/router';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { useState } from 'react';
import { useTheme } from '@mui/material';

export const useKnowledgeBaseDetail = () => {
  const router = useRouter();
  const theme = useTheme();
  const [searchValue, SetSearchValue] = useState<string>('');

  const handleKnowledgeBase = () => {
    router?.push({
      pathname: AIR_CUSTOMER_PORTAL?.KNOWLEDGE_BASE,
    });
  };

  return {
    handleKnowledgeBase,
    searchValue,
    SetSearchValue,
    theme,
  };
};
