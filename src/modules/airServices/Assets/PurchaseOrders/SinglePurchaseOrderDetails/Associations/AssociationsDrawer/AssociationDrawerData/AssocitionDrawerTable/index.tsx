import { Box, Button, Checkbox, Typography, useTheme } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { styles } from './AssociationDrawerTable.style';
import { DrawerTableData } from './AssociationDrawerTable.utiles';

export const DrawerTable = ({ setAssociateRequest }: any) => {
  const theme: any = useTheme();
  return (
    <>
      {DrawerTableData.map((item: any) => (
        <Box key={item.id} sx={styles.mainBoxStyle(theme)}>
          <Box sx={styles.subBoxStyle}>
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
          <Button sx={styles.buttonStyle(theme)} onClick={() => {}}>
            {item.buttonText}
          </Button>
        </Box>
      ))}
    </>
  );
};
