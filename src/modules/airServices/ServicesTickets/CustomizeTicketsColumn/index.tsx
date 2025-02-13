import { Typography } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { useCustomizeTicketColumn } from './useCustomizeTicketsColumn';
import { CustomizeItemCard } from '@/components/Cards/CustomizeItemCard';
import { ARRAY_INDEX, SELECTED_ARRAY_LENGTH } from '@/constants/strings';

export const CustomizeTicketsColumn = () => {
  const {
    submit,
    onClose,
    checkboxHandler,
    customizeColumn,
    ticketsListsColumnPersist,
    isPortalOpen,
  } = useCustomizeTicketColumn();

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isOpen}
        onClose={onClose}
        okText={'Update'}
        title={'Customize Column'}
        submitHandler={submit}
        isOk
        footer
      >
        <Typography variant="h5" color="slateBlue.main">
          {' '}
          Selected ({customizeColumn?.length - SELECTED_ARRAY_LENGTH?.TWO})
        </Typography>
        {ticketsListsColumnPersist
          ?.slice?.(ARRAY_INDEX?.TWO)
          ?.map((column: any) => (
            <CustomizeItemCard
              name={column?.header}
              key={column?.header}
              id={column?.id}
              checked={customizeColumn?.includes?.(column?.id)}
              onChange={(e: any): any => checkboxHandler?.(e, column)}
            />
          ))}
      </CommonDrawer>
    </>
  );
};
