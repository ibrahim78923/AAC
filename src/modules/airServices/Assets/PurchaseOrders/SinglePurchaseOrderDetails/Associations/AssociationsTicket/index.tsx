import { Box, Button, Typography, useTheme } from '@mui/material';
import { styles } from './AssociationTicket.style';
import { AddCircleIcon } from '@/assets/icons';

function AssociationTicket() {
  const theme: any = useTheme();
  return (
    <>
      <Box sx={styles.buttonContainer}>
        <Button
          sx={styles.addButtonStyle(theme)}
          variant="outlined"
          startIcon={<AddCircleIcon />}
          onClick={() => ''}
        >
          Associate
        </Button>
      </Box>
      <Box sx={styles.ticketBoxStyle(theme)}>
        <Typography>#INC-5-test</Typography>
        <Button sx={styles.buttonStyle(theme)}>Open</Button>
      </Box>
    </>
  );
}

export default AssociationTicket;
