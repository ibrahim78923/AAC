import React from 'react';
import Overview from '../Overview';
import Associations from '../Associations';
import PurchaseOrders from '../PurchaseOrders';
import Contract from '../Contract';
import Expense from '../Expense';
import Activity from '../Activity';
import Software from '../Software';
import Attachment from '../Attachment';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { logitechMouseTabsData } from './LogitechTabs.data';

const LogitechTabs: React.FC = () => {
  return (
    <>
      <HorizontalTabs tabsDataArray={logitechMouseTabsData}>
        <Overview />
        <Associations />
        <PurchaseOrders />
        <Contract />
        <Expense />
        <Activity />
        <Software />
        <Attachment />
      </HorizontalTabs>
    </>
  );
};

export default LogitechTabs;
