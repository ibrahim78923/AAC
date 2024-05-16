import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import React from 'react';
import { AllSurveys } from './AllSurveys';
import { Published } from './Published';
import { Draft } from './Draft';

export const CustomerSatisfaction = () => {
  const tabsDataArray = ['All Surveys', 'Published', 'Draft'];
  return (
    <HorizontalTabs tabsDataArray={tabsDataArray}>
      <AllSurveys />
      <Published />
      <Draft />
    </HorizontalTabs>
  );
};
