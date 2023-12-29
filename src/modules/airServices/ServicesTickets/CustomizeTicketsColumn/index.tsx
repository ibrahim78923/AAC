import { Box, Checkbox, Typography } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CommonDrawer from '@/components/CommonDrawer';
import { useCustomizeTicketColumn } from './useCustomizeTicketsColumn';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
export const CustomizeTicketsColumn = (props: any) => {
  const { isDrawerOpen } = props;
  const {
    submit,
    onClose,
    checkboxHandler,
    customizeColumn,
    ticketsListsColumnPersist,
    theme,
  } = useCustomizeTicketColumn(props);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => onClose?.()}
        okText={'Update'}
        title={'Customize Column'}
        submitHandler={() => submit?.()}
        isOk
        footer
      >
        <Typography variant="h5" color="slateblue.main">
          {' '}
          Selected ({customizeColumn?.length - 2})
        </Typography>
        {ticketsListsColumnPersist?.slice?.(2)?.map((column: any) => (
          <Box
            key={column?.id}
            display={'flex'}
            alignItems={'center'}
            flexWrap={'wrap'}
            border={`1px solid ${theme?.palette?.primary?.main}`}
            borderRadius={2}
            gap={1}
            marginTop={1.5}
            padding={1}
          >
            <DragIndicatorIcon
              style={{ flex: '0.1', textAlign: 'center' }}
              sx={{ color: theme?.palette?.grey?.[600] }}
            />
            <Box
              display={'flex'}
              flex={'auto'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Typography
                variant="body1"
                color="slateblue.main"
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
