import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { styles } from './Topbar.style';
import { IconContractMore, IconPlainBack } from '@/assets/icons';
import { useRouter } from 'next/router';

interface TopbarProps {
  title: string;
  status: string;
}

export default function Topbar({ title, status }: TopbarProps) {
  const router = useRouter();

  const [anchorElMoreMenu, setAnchorElMoreMenu] = useState<null | HTMLElement>(
    null,
  );
  const openMoreMenu = Boolean(anchorElMoreMenu);
  const handleClickMoreMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElMoreMenu(event.currentTarget);
  };
  const handleCloseMoreMenu = () => {
    setAnchorElMoreMenu(null);
  };

  return (
    <Box sx={styles.toolbar}>
      <Box sx={styles.left}>
        <Box sx={styles.backButton} onClick={() => router.back()}>
          <IconPlainBack />
        </Box>
        <Box sx={styles.headerTitle}>{title}</Box>

        <Box sx={styles.statusBadge(status)}>{status}</Box>
      </Box>

      <Box sx={styles.right}>
        <Button
          id="more-menu-button"
          aria-controls={openMoreMenu ? 'contracts-more-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openMoreMenu ? 'true' : undefined}
          onClick={handleClickMoreMenu}
          variant="outlined"
          color="secondary"
          className="small"
        >
          <IconContractMore />
        </Button>
        <Menu
          id="contracts-more-menu"
          anchorEl={anchorElMoreMenu}
          open={openMoreMenu}
          onClose={handleCloseMoreMenu}
          MenuListProps={{
            'aria-labelledby': 'more-menu-button',
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleCloseMoreMenu}>Download pdf</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
