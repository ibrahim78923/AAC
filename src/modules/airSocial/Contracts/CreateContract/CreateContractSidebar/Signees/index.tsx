import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Typography,
} from '@mui/material';
import { IconPlusAddContractsFields } from '@/assets/icons';
import { styles } from './Signees.style';
import NoData from '@/components/NoData';
import UserProfileIcon from '@/assets/icons/modules/SocialComponents/Contacts/user-profile-icon';
import AddSignee from './AddSignee';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Search from '@/components/Search';
import { ENUM_CONTRACT_TYPE } from '@/utils/contracts';
import { useRouter } from 'next/router';

export default function Signees({
  signeeFields,
  handleDeleteSigneeCard,
  appendSignee,
  removeSignee,
}: any) {
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  // Add Signee Button Dropdown
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Signees List Dropdown
  const [selectedSignee, setSelectedSignee] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [anchorElOption, setAnchorElOption] = useState<null | HTMLElement>(
    null,
  );
  const openOption = Boolean(anchorElOption);

  const handleClickOption = (
    event: React.MouseEvent<HTMLElement>,
    index: any,
  ) => {
    setAnchorElOption(event.currentTarget);
    setSelectedIndex(index);
    setSelectedSignee(signeeFields[index]);
  };
  const handleCloseOption = () => {
    setAnchorElOption(null);
  };

  // Add Signee Modal
  const [openModalAddSignee, setOpenModalAddSignee] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const handleOpenModalAddSignee = (editMode: boolean) => {
    setIsEditMode(editMode);
    handleCloseOption();
    setOpenModalAddSignee(true);
  };

  const handleCloseModalAddSignee = () => {
    setIsEditMode(false);
    setOpenModalAddSignee(false);
  };

  const handleMoveDown = (index: any) => {
    if (index < signeeFields.length - 1) {
      const newSigneeFields = [...signeeFields];
      [newSigneeFields[index], newSigneeFields[index + 1]] = [
        newSigneeFields[index + 1],
        newSigneeFields[index],
      ];
      newSigneeFields[index].signingOrder = index + 1;
      newSigneeFields[index + 1].signingOrder = index + 2;
      removeSignee(index);
      removeSignee(index);
      appendSignee(newSigneeFields[index]);
      appendSignee(newSigneeFields[index + 1]);
    }
  };
  const handleMoveUp = (index: any) => {
    if (index > 0) {
      const newSigneeFields = [...signeeFields];
      [newSigneeFields[index], newSigneeFields[index - 1]] = [
        newSigneeFields[index - 1],
        newSigneeFields[index],
      ];
      newSigneeFields[index].signingOrder = index + 1;
      newSigneeFields[index - 1].signingOrder = index;
      removeSignee(index);
      removeSignee(index - 1);
      appendSignee(newSigneeFields[index - 1]);
      appendSignee(newSigneeFields[index]);
    }
  };

  return (
    <Box sx={styles?.signeePanel}>
      <Box>
        {router?.query?.contractType === ENUM_CONTRACT_TYPE?.PDF && (
          <Button
            onClick={handleClick}
            variant="outlined"
            className="small"
            color="inherit"
            startIcon={<IconPlusAddContractsFields />}
            fullWidth
          >
            Add Signee
          </Button>
        )}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: { sx: { width: anchorEl?.offsetWidth || 'auto' } },
          }}
          sx={styles?.menu}
        >
          {(!signeeFields || signeeFields?.length === 0) && (
            <MenuItem disableRipple sx={styles?.plainItem}>
              <NoData height="auto" image={false} />
            </MenuItem>
          )}
          {signeeFields?.length > 0 && (
            <>
              <MenuItem disableRipple sx={styles?.search}>
                <Search placeholder="Search fields" size="small" fullWidth />
              </MenuItem>
              {signeeFields?.map((field: any, index: any) => (
                <MenuItem
                  sx={styles?.fieldItem}
                  key={field?._id || `signee-${index}`}
                >
                  <Box display={'flex'} alignContent={'center'} gap={1}>
                    <UserProfileIcon />
                    <Box>
                      <Typography variant="body2" fontWeight={'500'}>
                        {field?.name}
                      </Typography>
                      <Typography variant="body3">{field?.email}</Typography>
                    </Box>
                  </Box>
                </MenuItem>
              ))}
            </>
          )}

          <MenuItem
            sx={styles.createNewField}
            disableGutters
            onClick={() => handleOpenModalAddSignee(false)}
          >
            <Box sx={styles?.icon}>
              <IconPlusAddContractsFields />
            </Box>
            Create new signee
          </MenuItem>
        </Menu>
      </Box>
      {router?.query?.contractType === ENUM_CONTRACT_TYPE?.PDF && (
        <Box sx={styles?.signingOrder}>
          <Box sx={styles?.signingOrderTitle}>Signing order</Box>
          <Switch checked={checked} onChange={handleChange} />
        </Box>
      )}
      {(!signeeFields || signeeFields?.length === 0) && (
        <MenuItem disableRipple sx={styles?.plainItem}>
          <NoData height="auto" image={false} />
        </MenuItem>
      )}
      <Box sx={styles?.signeesList}>
        {signeeFields?.map((signee: any, index: number) => (
          <Box
            sx={styles?.signeeDetails}
            key={signee?._id || `signee-${index}`}
          >
            <Box sx={{ height: '40px', width: '40px' }}>
              <UserProfileIcon />
            </Box>
            <Box sx={styles?.signeeInfoWrap}>
              <Box sx={styles?.signeeInfo}>
                <Box sx={styles?.signeeName}>{signee?.name}</Box>
                <Box sx={styles?.signeeMeta}>{signee?.email}</Box>
              </Box>
              {router?.query?.contractType === ENUM_CONTRACT_TYPE?.PDF && (
                <IconButton
                  onClick={(event) => handleClickOption(event, index)}
                >
                  <MoreHorizIcon />
                </IconButton>
              )}
              <Menu
                anchorEl={anchorElOption}
                open={openOption}
                onClose={handleCloseOption}
                slotProps={{
                  paper: {
                    sx: {
                      padding: '10px',
                      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    },
                  },
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
                <MenuItem onClick={() => handleOpenModalAddSignee(true)}>
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleMoveUp(selectedIndex);
                    setAnchorElOption(null);
                  }}
                >
                  Move up
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleMoveDown(selectedIndex);
                    setAnchorElOption(null);
                  }}
                >
                  {' '}
                  Move Down
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleDeleteSigneeCard(selectedIndex);
                    setAnchorElOption(null);
                  }}
                >
                  {' '}
                  Delete
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        ))}
      </Box>

      <AddSignee
        open={openModalAddSignee}
        onClose={handleCloseModalAddSignee}
        isEditMode={isEditMode}
        signeeFields={signeeFields}
        selectedSignee={selectedSignee}
        contractId={router?.query?.contractId}
      />
    </Box>
  );
}
