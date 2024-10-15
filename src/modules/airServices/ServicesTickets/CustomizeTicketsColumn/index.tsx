import { Box, Checkbox, Typography } from '@mui/material';
import { DragIndicator } from '@mui/icons-material';
import CommonDrawer from '@/components/CommonDrawer';
import { useCustomizeTicketColumn } from './useCustomizeTicketsColumn';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';

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
        isDrawerOpen={isPortalOpen?.isOpen as boolean}
        onClose={onClose}
        okText={'Update'}
        title={'Customize Column'}
        submitHandler={submit}
        isOk
        footer
      >
        <Typography variant="h5" color="slateBlue.main">
          {' '}
          Selected ({customizeColumn?.length - 2})
        </Typography>
        {ticketsListsColumnPersist?.slice?.(2)?.map((column: any) => (
          <Box
            key={column?.header}
            display={'flex'}
            alignItems={'center'}
            flexWrap={'wrap'}
            border={`1px solid `}
            borderColor={'primary.main'}
            borderRadius={2}
            gap={1}
            marginTop={1.5}
            padding={1}
          >
            <DragIndicator
              sx={{ color: 'grey.600', flex: 0.1, textAlign: 'center' }}
            />
            <Box
              display={'flex'}
              flex={'auto'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Typography
                variant="body1"
                color="slateBlue.main"
                whiteSpace={'nowrap'}
              >
                {column?.header}
              </Typography>
              <Box>
                <Checkbox
                  icon={<CheckboxIcon />}
                  checkedIcon={<CheckboxCheckedIcon />}
                  color="primary"
                  name={column?.id}
                  checked={customizeColumn?.includes?.(column?.id)}
                  onClick={(e: any): any => checkboxHandler?.(e, column)}
                />
              </Box>
            </Box>
          </Box>
        ))}
      </CommonDrawer>
    </>
  );
};
