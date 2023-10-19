import NoData from '@/components/NoData';
import NoAssociationFound from '@/assets/images/modules/LogitechMouse/association.png';
import { Button, useTheme } from '@mui/material';
import { PlusSharedIconColor } from '@/assets/icons';
import { styles } from './Associations.style';

export const Associations = () => {
  const theme: any = useTheme();
  return (
    <>
      <NoData
        image={NoAssociationFound}
        message={
          'Make approved purchases by sending the order to your stakeholders for approval'
        }
      >
        <Button
          sx={styles.addButtonStyle(theme)}
          variant="outlined"
          startIcon={<PlusSharedIconColor />}
        >
          Associate
        </Button>
      </NoData>
    </>
  );
};
