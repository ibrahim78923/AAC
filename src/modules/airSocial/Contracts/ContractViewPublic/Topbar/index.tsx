import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { styles } from './Topbar.style';
import { ENUM_CONTRACT_STATUS } from '@/utils/contracts';
import { IconContractMore } from '@/assets/icons';
import { htmlToPdfConvert } from '@/lib/html-to-pdf-converter';

interface TopbarProps {
  title: string;
  status: string;
  handleOpenModalSignAndSend: (_?: any, data?: any) => void;
  contractType?: string;
  signatureStatus?: string;
  downloadRef: React.RefObject<HTMLDivElement>;
}

export default function Topbar({
  title,
  status,
  handleOpenModalSignAndSend,
  contractType,
  signatureStatus,
  downloadRef,
}: TopbarProps) {
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
        <Box sx={styles.headerTitle}>{title}</Box>

        <Box sx={styles.statusBadge(status)}>{status}</Box>
      </Box>

      <Box sx={styles.right}>
        <Box>
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
            <MenuItem
              onClick={() => {
                handleCloseMoreMenu();
                htmlToPdfConvert?.(downloadRef, title, 20);
              }}
            >
              Download pdf
            </MenuItem>
          </Menu>
        </Box>
        {status === ENUM_CONTRACT_STATUS?.PENDING &&
          contractType !== 'PDF' &&
          signatureStatus !== 'SIGNED' && (
            <Button
              onClick={handleOpenModalSignAndSend}
              variant="contained"
              color="primary"
              className="small"
            >
              Sign & Send
            </Button>
          )}
      </Box>
    </Box>
  );
}
