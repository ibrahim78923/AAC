import React, { useState } from 'react';

import Image from 'next/image';

import { Box, Popover, useTheme } from '@mui/material';

import { isNullOrEmpty } from '@/utils';

import { QuickLinkData } from '../../Layout.data';

import { v4 as uuidv4 } from 'uuid';

import Link from 'next/link';
import { styles } from './SocialIconsDropdown.style';

const SocialIconsDropdown = () => {
  const theme = useTheme();
  const [SocialIconsDropdown, setSocialIconsDropdown] =
    useState<null | HTMLElement>(null);
  const isSocialIconsDropDownOpen = Boolean(SocialIconsDropdown);

  const dropDownOpenHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setSocialIconsDropdown(event.currentTarget);
  };

  const dropDownClosehandler = () => {
    setSocialIconsDropdown(null);
  };

  return (
    <>
      <Box onClick={dropDownOpenHandler} sx={styles.xsQuickLinkBox(theme)}>
        Social
      </Box>
      <Popover
        id={'10'}
        anchorEl={SocialIconsDropdown}
        open={isSocialIconsDropDownOpen}
        onClose={dropDownClosehandler}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          marginTop: '20px',
        }}
      >
        {!isNullOrEmpty(QuickLinkData) &&
          QuickLinkData?.map((image) => (
            <Box
              key={uuidv4()}
              sx={{
                borderRight: `1px solid ${theme?.palette?.custom?.dark}`,

                '&:last-child': {
                  borderRight: 'none',
                },
                display: 'flex',
                flexDirection: 'row',
                padding: '10px',
              }}
            >
              <Link href={image?.path}>
                <Image src={image?.icon} alt="logo" width={18} height={18} />
              </Link>
            </Box>
          ))}
      </Popover>
    </>
  );
};

export default SocialIconsDropdown;
