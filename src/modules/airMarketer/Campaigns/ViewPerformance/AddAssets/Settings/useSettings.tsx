import TanstackTable from '@/components/Table/TanstackTable';
import {
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
} from '../../Tabs/Performace/CustomizedAccordions/CustomizedAccordian.data';
import { useState } from 'react';
import { assetsTabInfo } from './Settings.data';

const useSettings = () => {
  const [accordianTableInfo, setAccordianTableInfo] = useState<any>(null);
  const SelectedAccordianTable = (accordianDescription: any) => {
    if (accordianDescription?.name === assetsTabInfo?.adCampaign) {
      setAccordianTableInfo(
        <TanstackTable
          columns={columnsAdCampaigns}
          data={dataAdCampaigns}
          isPagination
        />,
      );
    } else if (accordianDescription?.name === assetsTabInfo?.cta) {
      setAccordianTableInfo(
        <TanstackTable columns={columnsCta} data={dataCta} isPagination />,
      );
    } else if (accordianDescription?.name === assetsTabInfo?.forms) {
      setAccordianTableInfo(
        <TanstackTable columns={columnsForms} data={dataForms} isPagination />,
      );
    } else if (accordianDescription?.name === assetsTabInfo?.email) {
      setAccordianTableInfo(
        <TanstackTable columns={columnsEmail} data={dataEmail} isPagination />,
      );
    } else if (accordianDescription?.name === assetsTabInfo?.socailPosts) {
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
export default useSettings;
