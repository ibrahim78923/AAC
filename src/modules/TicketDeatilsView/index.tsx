import React from 'react';
import ToofPage from './TopofPage';
import DetailViewCard from './viewcardDetail';

import DetailTabs from './detailTab';
import DetailsProperties from './detailsProperties';
import CustomNotistack from '@/components/CustomNotistack';

export default function TicketDetaile() {
  return (
    <>
      <ToofPage />
      <DetailViewCard />
      <DetailTabs />
      <DetailsProperties />
      <CustomNotistack />
    </>
  );
}
