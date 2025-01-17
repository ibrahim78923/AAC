import {
  Box,
  Checkbox,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styles } from './NumberSelect.style';
import Image from 'next/image';
import { ArrowDownIcon } from '@/assets/icons';
import { useGetTwilioNumbersConfigurationsQuery } from '@/services/airMarketer/SmsMarketing/AddNewAccount';
import { getActiveAccountSession } from '@/utils';
import { IMG_URL } from '@/config';
import { v4 as uuidv4 } from 'uuid';

const NumberSelect = () => {
  const activeAccount = getActiveAccountSession();
  const [activeAccountConfigId, setActiveAccountConfigId] = useState('');

  useEffect(() => {
    if (activeAccount?.whatsappConfigurationId)
      setActiveAccountConfigId(activeAccount?.whatsappConfigurationId);
  }, [activeAccount?.whatsappConfigurationId]);

  const { data: dataTwilioNumbersConfig, isLoading } =
    useGetTwilioNumbersConfigurationsQuery(
      {
        params: {
          configurationId: activeAccountConfigId,
          configuredNumbersOnly: true,
          type: 'whatsapp',
        },
      },
      { skip: activeAccountConfigId?.length < 1 },
    );

  const activeNumber = dataTwilioNumbersConfig?.data?.find(
    (item: any) => item?.phoneNumber === activeAccount?.twilioWhatsappNumber,
  );

  const smallScreen = useMediaQuery('(min-width: 380px)');
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <Button
        id="basic-button"
        variant="outlined"
        color="inherit"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={styles?.dropdownBtn}
      >
        {isLoading ? (
          <Box display="flex" alignItems="center" gap="10px">
            <Skeleton variant="circular" width={36} height={36} />
            <Box>
              <Skeleton
                variant="rounded"
                width={100}
                height={15}
                sx={{ marginBottom: '5px' }}
              />
              <Skeleton variant="rounded" width={80} height={15} />
            </Box>
          </Box>
        ) : (
          <UserInfo
            avatarSrc={`${IMG_URL}${activeNumber?.userDetails?.avatar?.url}`}
            name={`${activeNumber?.userDetails?.firstName ?? '-'} ${
              activeNumber?.userDetails?.lastName ?? '-'
            }`}
            phone={activeNumber?.phoneNumber ?? '--'}
            open={open}
            isDropdown
          />
        )}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Box
          sx={{
            padding: '0px 15px',
            width: !smallScreen ? '180px' : '150px',
            my: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontSize: '12px', color: theme?.palette?.grey[900] }}
          >
            Registered Numbers{' '}
          </Typography>
        </Box>
        {dataTwilioNumbersConfig?.data?.map((item: any) => (
          <MenuItem
            key={uuidv4()}
            onClick={handleClose}
            sx={styles?.menuItem(theme)}
          >
            <UserInfo
              avatarSrc={`${IMG_URL}${item?.userDetails?.avatar?.url}`}
              name={`${item?.userDetails?.firstName} ${item?.userDetails?.lastName}`}
              phone={item?.phoneNumber}
              isSelected={
                activeAccount?.twilioWhatsappNumber === item?.phoneNumber
              }
            />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

const UserInfo: React.FC<any> = ({
  avatarSrc,
  name,
  phone,
  open,
  isDropdown,
  isSelected,
}: any) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <Image
        style={{ borderRadius: '50%' }}
        width={36}
        height={36}
        src={avatarSrc}
        alt="User"
      />
      <Box sx={{ textAlign: 'left' }}>
        <Typography
          variant="body2"
          sx={{ fontSize: '12px', color: theme?.palette?.grey[900] }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: '14px', color: theme?.palette?.custom?.main }}
        >
          {phone}
        </Typography>
      </Box>
      {isDropdown && (
        <Box
          sx={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            height: '20px',
          }}
        >
          <ArrowDownIcon size={20} />
        </Box>
      )}
      {isSelected && (
        <Box>
          <Checkbox checked />
        </Box>
      )}
    </Box>
  );
};

export default NumberSelect;
