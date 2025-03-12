import React from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Divider, Menu, MenuItem } from '@mui/material';
import { styles } from './HeaderCreateContract.style';
import {
  IconPlainBack,
  IconContractShare,
  IconContractMore,
} from '@/assets/icons';
import useHeaderCreateContract from './useHeaderCreateContract';
import ModalShareContract from '../ModalShareContract';

interface HeaderCreateContractProps {
  documentTitle: string;
  documentStatus: string;
  onClickSave?: () => void;
  onClickSign?: () => void;
  onClickSaveAsDraft: () => void;
  onClickSaveAsTemplate: () => void;
  disabledSaveAsDraft?: boolean;
  disabledSaveAsTemplate?: boolean;
  disabledSaveChanges?: boolean;
  disabledSignAndSend?: boolean;
}

export default function HeaderCreateContract({
  documentTitle,
  documentStatus,
  onClickSave,
  onClickSign,
  onClickSaveAsDraft,
  onClickSaveAsTemplate,
  disabledSaveAsDraft,
  disabledSaveAsTemplate,
  disabledSaveChanges = true,
  disabledSignAndSend = true,
}: HeaderCreateContractProps) {
  const router = useRouter();
  // const { templateId } = router?.query;

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

          <Box sx={styles.headerTitle}>{documentTitle}</Box>

          {!!!templateId && <Box sx={styles.statusBadge}>{documentStatus}</Box>}
        </Box>

        <Box sx={styles.right}>
          {!!!templateId && (
            <Button
              onClick={() => setOpenModalShareContract(true)}
              startIcon={<IconContractShare />}
              variant="outlined"
              color="secondary"
              className="small"
            >
              Share
            </Button>
          )}
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
            <MenuItem
              onClick={() => {
                handleCloseMoreMenu();
                onClickSaveAsDraft();
              }}
              disabled={disabledSaveAsDraft}
            >
              Save as a new draft
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseMoreMenu();
                onClickSaveAsTemplate();
              }}
              disabled={disabledSaveAsTemplate}
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
            disabled={disabledSaveChanges}
          >
            Save Changes
          </Button>

          <Button
            onClick={onClickSign}
            variant="contained"
            color="primary"
            className="small"
            disabled={disabledSignAndSend}
          >
            Sign & Send
          </Button>
        </Box>
      </Box>

      <ModalShareContract
        open={openModalShareContract}
        setOpenModalShareContract={setOpenModalShareContract}
      />
    </>
  );
}
