import { Box, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useRouter } from 'next/router';

export const AssetsAssociateHeader = ({ activeCheck }: any) => {
  const router = useRouter();
  return (
    <Box display={'flex'} justifyContent={'flex-end'}>
      <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={2}>
        <Button
          color="secondary"
          variant="outlined"
          disabled={!!!activeCheck.length}
        >
          Delete
        </Button>
        <Button
          variant="outlined"
          startIcon={<AddCircleIcon />}
          onClick={() =>
            router.push({
              pathname:
                '/air-services/assets/contracts/detail/add-associate-asset',
            })
          }
        >
          Associate Asset
        </Button>
      </Box>
    </Box>
  );
};
