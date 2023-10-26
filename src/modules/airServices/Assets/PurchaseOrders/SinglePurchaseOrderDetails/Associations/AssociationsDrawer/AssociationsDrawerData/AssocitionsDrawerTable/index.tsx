import { Box, Button, Checkbox, Typography, useTheme } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { drawerTableData } from './AssociationsDrawerTable.data';
import { v4 as uuidv4 } from 'uuid';

export const AssocitionsDrawerTable = ({ setAssociateRequest }: any) => {
  const theme: any = useTheme();
  return (
    <>
      {drawerTableData.map((item: any) => (
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          border={`.1rem solid ${theme.palette.grey?.[0]}`}
          borderRadius={'.5rem'}
          padding={'.7rem'}
          marginBottom={'1rem'}
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
              onChange={(e: any) => {
                setAssociateRequest(e.target.checked);
              }}
              color="primary"
            />
            <Typography sx={{}}>{item.title}</Typography>
          </Box>
          <Button
            sx={{
              backgroundColor: theme?.palette?.primary?.light,
              borderRadius: '1rem',
            }}
          >
            {item.buttonText}
          </Button>
        </Box>
      ))}
    </>
  );
};
