import ListViewIcon from '@/assets/icons/modules/SocialComponents/ListView/list-view-icon';
import Search from '@/components/Search';
import { Box, IconButton } from '@mui/material';

export const Header = () => {
  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1}
      >
        <Search label="Search Here" />
        <IconButton
          sx={{
            height: '50px',
            width: '50px',
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <ListViewIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
