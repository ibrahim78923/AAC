import CommonDrawer from '@/components/CommonDrawer';
import { Box, Checkbox, Typography } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useConsumerCustomizeColumns } from './useConsumerCustomizeColumns';

export const ConsumerCustomizeColumns = (props: any) => {
  const { isDrawerOpen, closeDrawer, consumersListColumn } = props;
  const { checkboxHandler, columnDataCustomize, applyAllCheckboxHandler } =
    useConsumerCustomizeColumns(props);

  return (
    <div>
      <Box>
        <CommonDrawer
          isDrawerOpen={isDrawerOpen}
          onClose={() => closeDrawer?.(false)}
          okText={'Apply'}
          title={'Customize Columns'}
          isOk
          submitHandler={applyAllCheckboxHandler}
          cancelText={'Cancel'}
          footer
        >
          <Box>
            {consumersListColumn?.slice(2)?.map((item: any) => (
              <Box
                key={item?.id}
                display={'flex'}
                justifyContent={'space-between'}
                border={`1px solid`}
                borderColor={'grey.700'}
                borderRadius={1}
                alignItems={'center'}
                mt={2}
              >
                <Box display="flex" alignItems="center" gap={2} p={1}>
                  <DragIndicatorIcon />
                  <Typography>{item?.header}</Typography>
                </Box>
                <Checkbox
                  checked={columnDataCustomize
                    ?.map((column: any) => column?.id)
                    .includes(item?.id)}
                  icon={<CheckboxIcon />}
                  checkedIcon={<CheckboxCheckedIcon />}
                  onChange={(e) => checkboxHandler?.(e, item)}
                  color="primary"
                />
              </Box>
            ))}
          </Box>
        </CommonDrawer>
      </Box>
    </div>
  );
};
