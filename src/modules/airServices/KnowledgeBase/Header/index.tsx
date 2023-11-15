import { PlusSharedColorIcon } from '@/assets/icons';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { useHeader } from './useHeader';
import { AIR_SERVICES } from '@/constants';

export const Header = (props: any) => {
  const { anchorEl, open, theme, handleClick, handleClose, router } =
    useHeader();
  const { setIsFolderFormOpen } = props;
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
      flexWrap={'wrap'}
    >
      <Typography variant="h4" color={theme?.palette?.slateBlue?.main}>
        Knowledge Base
      </Typography>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size="medium"
        variant="contained"
        startIcon={<PlusSharedColorIcon />}
      >
        Create New
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          key={1}
          onClick={() => {
            router?.push(AIR_SERVICES?.UPSERT_ARTICLE);
            handleClose?.();
          }}
        >
          <Typography
            variant="body2"
            fontWeight={500}
            color={theme?.palette?.grey?.[600]}
          >
            Article
          </Typography>
        </MenuItem>
        <MenuItem
          key={2}
          onClick={() => {
            setIsFolderFormOpen(true);
            handleClose?.();
          }}
          sx={{
            '&.MuiMenuItem-root': {
              paddingRight: 7.5,
            },
          }}
        >
          <Typography
            variant="body2"
            fontWeight={500}
            color={theme?.palette?.grey?.[600]}
          >
            Folder
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};
