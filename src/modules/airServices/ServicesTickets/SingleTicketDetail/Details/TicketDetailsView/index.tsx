import Header from '../../components/Header';
import React from 'react';
import DetailsVeiwPropSect from './DetailsViewPropertiesSection';
import DetialViewTimeEnterires from './DetailViewTimeEnteries';

export default function TicketDetail() {
  return (
    <>
      <Header />
      <DetailsVeiwPropSect />
      <DetialViewTimeEnterires />
    </>
  );
}
