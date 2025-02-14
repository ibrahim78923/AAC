import CommonDrawer from '@/components/CommonDrawer';
import { useConsumerCustomizeColumns } from './useConsumerCustomizeColumns';
import { CustomizeItemCard } from '@/components/Cards/CustomizeItemCard';
import { ARRAY_INDEX } from '@/constants/strings';

export const ConsumerCustomizeColumns = (props: any) => {
  const { isDrawerOpen, consumersListColumn } = props;

  const {
    checkboxHandler,
    columnDataCustomize,
    applyAllCheckboxHandler,
    closeDrawer,
  } = useConsumerCustomizeColumns(props);

  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={closeDrawer}
      okText={'Apply'}
      title={'Customize Columns'}
      isOk
      submitHandler={applyAllCheckboxHandler}
      cancelText={'Cancel'}
      footer
    >
      {consumersListColumn
        ?.slice(ARRAY_INDEX?.TWO)
        ?.map((column: any) => (
          <CustomizeItemCard
            name={column?.header}
            key={column?.header}
            id={column?.id}
            checked={columnDataCustomize
              ?.map((column: any) => column?.id)
              ?.includes(column?.id)}
            onChange={(e: any): any => checkboxHandler?.(e, column)}
          />
        ))}
    </CommonDrawer>
  );
};
