import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import React from 'react';
import { AllSurveys } from './AllSurveys';
import { Published } from './Published';
import { Draft } from './Draft';
import { Inactive } from './Inactive';

export const CustomerSupport = () => {
  const tabsDataArray = ['All Surveys', 'Published', 'Draft', 'Inactive'];
  return (
    <HorizontalTabs tabsDataArray={tabsDataArray}>
      <AllSurveys />
      <Published />
      <Draft />
      <Inactive />
    </HorizontalTabs>
  );
};
