import TanstackTable from '@/components/Table/TanstackTable';
import {
  accordionNameInfo,
  columnsAdCampaigns,
  columnsCta,
  columnsEmail,
  columnsForms,
  columnsSocialPosts,
  dataAdCampaigns,
  dataCta,
  dataEmail,
  dataForms,
  dataSocialForms,
} from './CustomizedAccordian.data';
import { useState } from 'react';

const useCustomizedAccordians = () => {
  const [accordianTableInfo, setAccordianTableInfo] = useState<any>(null);
  const SelectedAccordianTable = (accordianDescription: any) => {
    if (accordianDescription?.name === accordionNameInfo?.adCampaign) {
      setAccordianTableInfo(
        <TanstackTable
          columns={columnsAdCampaigns}
          data={dataAdCampaigns}
          isPagination
        />,
      );
    } else if (accordianDescription?.name === accordionNameInfo?.cta) {
      setAccordianTableInfo(
        <TanstackTable columns={columnsCta} data={dataCta} isPagination />,
      );
    } else if (accordianDescription?.name === accordionNameInfo?.forms) {
      setAccordianTableInfo(
        <TanstackTable columns={columnsForms} data={dataForms} isPagination />,
      );
    } else if (accordianDescription?.name === accordionNameInfo?.email) {
      setAccordianTableInfo(
        <TanstackTable columns={columnsEmail} data={dataEmail} isPagination />,
      );
    } else if (accordianDescription?.name === accordionNameInfo?.socailPosts) {
      setAccordianTableInfo(
        <TanstackTable
          columns={columnsSocialPosts}
          data={dataSocialForms}
          isPagination
        />,
      );
    }
  };
  return {
    SelectedAccordianTable,
    accordianTableInfo,
  };
};
export default useCustomizedAccordians;
