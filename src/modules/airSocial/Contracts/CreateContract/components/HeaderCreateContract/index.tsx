import { Box, Button, Divider, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { styles } from './HeaderCreateContract.style';
import {
  IconPlainBack,
  IconContractShare,
  IconContractMore,
} from '@/assets/icons';
import useHeaderCreateContract from './useHeaderCreateContract';
import { useRouter } from 'next/router';
import ModalShareContract from '../ModalShareContract';

interface HeaderCreateContractProps {
  onClickSave?: () => void;
  onClickSign?: () => void;
  onClickSaveAsTemplate: () => void;
  methods?: any;
}

export default function HeaderCreateContract({
  onClickSave,
  onClickSign,
  onClickSaveAsTemplate,
  methods,
}: HeaderCreateContractProps) {
  const router = useRouter();
  const {
    anchorElMoreMenu,
    openMoreMenu,
    handleClickMoreMenu,
    handleCloseMoreMenu,

    openModalShareContract,
    setOpenModalShareContract,
  } = useHeaderCreateContract();

  return (
    <>
      <Box sx={styles.toolbar}>
        <Box sx={styles.left}>
          <Box sx={styles.backButton} onClick={() => router.back()}>
            <IconPlainBack />
          </Box>

          <Box sx={styles.headerTitle}>Untitled Draft</Box>

          <Box sx={styles.statusBadge}>Draft</Box>
        </Box>

        <Box sx={styles.right}>
          <Button
            onClick={() => setOpenModalShareContract(true)}
            startIcon={<IconContractShare />}
            variant="outlined"
            color="secondary"
            className="small"
          >
            Share
          </Button>

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
            <MenuItem onClick={handleCloseMoreMenu}>
              Save as a new draft
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseMoreMenu();
                onClickSaveAsTemplate();
              }}
            >
              Save as a new template
            </MenuItem>
          </Menu>

          <Divider orientation="vertical" flexItem />

          <Button
            onClick={onClickSave}
            variant="outlined"
            color="secondary"
            className="small"
            disabled={!methods?.formState.isDirty}
          >
            Save Changes
          </Button>

          <Button
            onClick={onClickSign}
            variant="contained"
            color="primary"
            className="small"
          >
            Sign & Send
          </Button>
        </Box>
      </Box>

      <ModalShareContract
        open={openModalShareContract}
        onClose={() => setOpenModalShareContract(false)}
      />
    </>
  );
}
