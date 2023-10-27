import CommonDrawer from '@/components/CommonDrawer';
import { AssociationsDrawerPropsI } from './AssociationsDrawer.interface';
import Search from '@/components/Search';
import { Box, Button, Checkbox, Typography, useTheme } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { drawerTableData } from './AssociationsDrawer.data';
import { v4 as uuidv4 } from 'uuid';

export const AssociationsDrawer = ({
  open,
  setDrawerOpen,
}: AssociationsDrawerPropsI) => {
  const theme: any = useTheme();
  return (
    <div>
      <CommonDrawer
        isDrawerOpen={open}
        onClose={() => setDrawerOpen(false)}
        title="Associate Service Requests"
        isOk={true}
        footer={true}
        okText="Associate"
      >
        <>
          <Search
            label="Search"
            width="100%"
            searchBy=""
            sx={{ width: '100%' }}
          />
          {drawerTableData?.map((item: any) => (
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              border={`.1rem solid ${theme?.palette?.grey?.[0]}`}
              borderRadius={'.5rem'}
              padding={'.7rem'}
              marginBottom={'1rem'}
              mt={'16px'}
              key={uuidv4()}
            >
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={'1rem'}
              >
                <Checkbox
                  icon={<CheckboxIcon />}
                  checkedIcon={<CheckboxCheckedIcon />}
                  color="primary"
                />
                <Typography>{item?.title}</Typography>
              </Box>
              <Button
                sx={{
                  backgroundColor: theme?.palette?.primary?.light,
                  borderRadius: '1rem',
                }}
              >
                {item?.buttonText}
              </Button>
            </Box>
          ))}
        </>
      </CommonDrawer>
    </div>
  );
};
