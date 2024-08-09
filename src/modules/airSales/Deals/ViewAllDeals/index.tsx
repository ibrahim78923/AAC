import CommonDrawer from '@/components/CommonDrawer';
import Search from '@/components/Search';

import useViewAllDeals from './useViewAllDeals';

import { columnsData } from './ViewAllDeals.data';

import { v4 as uuidv4 } from 'uuid';
import { CreateDealProps } from '../CreateDeal/CreateDeal-interface';

const ViewAllDeals = ({ open, onClose }: CreateDealProps) => {
  const { search, setSearch, ColumnsWrapper } = useViewAllDeals();

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      footer
      isOk
      okText="Apply"
      title="All Views"
    >
      <Search
        label="Search Here"
        searchBy={search}
        setSearchBy={setSearch}
        fullWidth
        autoComplete="off"
      />
      {columnsData?.map((column) => (
        <ColumnsWrapper
          key={uuidv4()}
          title={column?.title}
          checkboxProps={{
            onChange: () => {},
          }}
        />
      ))}
    </CommonDrawer>
  );
};

export default ViewAllDeals;
