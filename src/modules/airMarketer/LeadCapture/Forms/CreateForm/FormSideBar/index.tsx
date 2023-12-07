import {
  DividerIcon,
  ImageIcon,
  InputIcon,
  SpaceIcon,
  TextIcon,
} from '@/assets/icons';
import { Box, Divider, Typography } from '@mui/material';
import { styles } from '../CreateForm.style';

const FormSideBar = () => {
  return (
    <Box sx={styles.formSideBar}>
      <Typography variant="h4">Form Block</Typography>
      <Typography variant="body2">
        Add blocks to your form by dragging them into place.
      </Typography>
      <Divider sx={{ marginY: '20px' }} />
      <Typography variant="body2" sx={{ fontWeight: '600' }}>
        Static Blocks
      </Typography>
      <Typography variant="body2">
        Add text or an image to your form page.
      </Typography>

      <Box
        display={'flex'}
        alignItems={'center'}
        gap={'10px'}
        padding={'12px'}
        sx={styles.customField}
      >
        <TextIcon />
        <Typography variant="h6" sx={{ color: '#35456D' }}>
          Text
        </Typography>
      </Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={'10px'}
        padding={'12px'}
        sx={styles.customField}
      >
        <ImageIcon />
        <Typography variant="h6" sx={{ color: '#35456D' }}>
          Image
        </Typography>
      </Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={'10px'}
        padding={'12px'}
        sx={styles.customField}
      >
        <SpaceIcon />
        <Typography variant="h6" sx={{ color: '#35456D' }}>
          Spacing
        </Typography>
      </Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={'10px'}
        padding={'12px'}
        sx={styles.customField}
      >
        <DividerIcon />
        <Typography variant="h6" sx={{ color: '#35456D' }}>
          Divider
        </Typography>
      </Box>

      <Divider sx={{ marginY: '20px' }} />

      <Typography variant="body2" sx={{ fontWeight: '600' }}>
        Customers Attributes
      </Typography>
      <Typography variant="body2">
        Request information from your customers
      </Typography>

      <Box
        display={'flex'}
        alignItems={'center'}
        gap={'10px'}
        padding={'12px'}
        sx={styles.customField}
      >
        <InputIcon />
        <Typography variant="h6" sx={{ color: '#35456D' }}>
          First Name
        </Typography>
      </Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={'10px'}
        padding={'12px'}
        sx={styles.customField}
      >
        <InputIcon />
        <Typography variant="h6" sx={{ color: '#35456D' }}>
          Avatar
        </Typography>
      </Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={'10px'}
        padding={'12px'}
        sx={styles.customField}
      >
        <InputIcon />
        <Typography variant="h6" sx={{ color: '#35456D' }}>
          Last Name
        </Typography>
      </Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={'10px'}
        padding={'12px'}
        sx={styles.customField}
      >
        <InputIcon />
        <Typography variant="h6" sx={{ color: '#35456D' }}>
          Email
        </Typography>
      </Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={'10px'}
        padding={'12px'}
        sx={styles.customField}
      >
        <InputIcon />
        <Typography variant="h6" sx={{ color: '#35456D' }}>
          Brith Date
        </Typography>
      </Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={'10px'}
        padding={'12px'}
        sx={styles.customField}
      >
        <InputIcon />
        <Typography variant="h6" sx={{ color: '#35456D' }}>
          Phone Number
        </Typography>
      </Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={'10px'}
        padding={'12px'}
        sx={styles.customField}
      >
        <InputIcon />
        <Typography variant="h6" sx={{ color: '#35456D' }}>
          Address
        </Typography>
      </Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={'10px'}
        padding={'12px'}
        sx={styles.customField}
      >
        <InputIcon />
        <Typography variant="h6" sx={{ color: '#35456D' }}>
          Preferred Language
        </Typography>
      </Box>
    </Box>
  );
};

export default FormSideBar;
