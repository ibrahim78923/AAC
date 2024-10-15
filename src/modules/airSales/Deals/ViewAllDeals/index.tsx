import CommonDrawer from '@/components/CommonDrawer';
import Search from '@/components/Search';
import useViewAllDeals from './useViewAllDeals';
import { v4 as uuidv4 } from 'uuid';
import { CreateDealProps } from '../CreateDeal/CreateDeal-interface';

const ViewAllDeals = ({ open, onClose, dealViewsData }: CreateDealProps) => {
  const { search, setSearch, ColumnsWrapper } = useViewAllDeals();
  const newDealViewsData = [
    { name: 'All Deals', isActive: true, isDefault: true },
    ...(Array?.isArray(dealViewsData) ? dealViewsData : []),
  ];

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
      {newDealViewsData?.map((column: any) => (
        <ColumnsWrapper
          key={uuidv4()}
          title={column?.name}
          isActive={column?.isActive}
          isDisabled={column?.isDefault ? true : false}
          checkboxProps={{
            onChange: () => {},
          }}
        />
      ))}
    </CommonDrawer>
  );
};

export default ViewAllDeals;
