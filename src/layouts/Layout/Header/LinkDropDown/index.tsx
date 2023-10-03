import React, { useState } from 'react';

import Image from 'next/image';

import {
  Box,
  Button,
  Grid,
  Popover,
  useTheme,
  ListItemText,
  Checkbox,
  Typography,
  FormControlLabel,
} from '@mui/material';

import { isNullOrEmpty } from '@/utils';

import { QuickLinksData } from '../../Layout.data';

import { LinkCheckedItemsI } from '../../Layout.interface';

import {
  ArrowSquareLeftImage,
  DeleteImage,
  LinkImage,
  QuickLinkImage,
} from '@/assets/images';

import { styles } from './LinkDropdown.style';

import { PlusSharedIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';

const LinkDropdown = () => {
  const theme = useTheme();
  const [isEditLink, setIsEditLink] = useState<boolean>(true);
  const [linkDropdown, setLinkDropdown] = useState<null | HTMLElement>(null);
  const isLinkDropDownOpen = Boolean(linkDropdown);

  const [checkedItems, setCheckedItems] = useState<LinkCheckedItemsI>({
    'Create Quote': true,
    'View Products': true,
  });

  const dropDownOpenHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setLinkDropdown(event.currentTarget);
  };

  const dropDownClosehandler = () => {
    setLinkDropdown(null);
  };

  const checkBoxChangeHandler =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setCheckedItems((prevCheckedItems) => {
        const updatedCheckedItems = { ...prevCheckedItems };
        updatedCheckedItems[name] = event.target.checked;
        if (!event.target.checked) {
          delete updatedCheckedItems[name];
        }
        return updatedCheckedItems;
      });
    };

  return (
    <div>
      <Box
        sx={styles.quickLinkButtonStyle(isLinkDropDownOpen, theme)}
        onClick={dropDownOpenHandler}
      >
        <Image src={LinkImage} alt="link" />
      </Box>

      <Popover
        id={'10'}
        anchorEl={linkDropdown}
        open={isLinkDropDownOpen}
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4,
            p: 1,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
            <Box sx={styles.menuDropDownLink(isEditLink, theme)}>
              <Image
                src={isEditLink ? QuickLinkImage : ArrowSquareLeftImage}
                alt="GreenLink"
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              <Typography variant="subtitle1">
                {isEditLink ? 'Quick Links' : 'Edit Links'}
              </Typography>
              {isEditLink && (
                <Typography
                  variant="subtitle1"
                  sx={{ color: theme.palette.grey[900] }}
                >
                  (4/10)
                </Typography>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Image src={DeleteImage} alt="delete-icon" />

            <Button
              variant="contained"
              sx={{ minWidth: '0px', gap: 1, height: '32px' }}
              onClick={() => setIsEditLink(!isEditLink)}
            >
              <PlusSharedIcon />
              {!isEditLink && <Typography>Save</Typography>}
            </Button>
          </Box>
        </Box>

        {!isEditLink && (
          <Grid
            container
            spacing={2}
            sx={{ padding: '0px 10px 10px 22px', maxWidth: '480px' }}
          >
            {!isNullOrEmpty(QuickLinksData) &&
              QuickLinksData.map((item) => (
                <Grid item xs={6} key={uuidv4()}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkedItems[`${item.name}`] || false}
                        onChange={checkBoxChangeHandler(`${item.name}`)}
                        name={`${item.name}`}
                        inputProps={{ 'aria-label': `checkbox-${item.name}` }}
                      />
                    }
                    label={
                      <Box
                        sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                      >
                        <Image src={item.logo} alt="logo" />
                        <ListItemText
                          primary={item.name}
                          primaryTypographyProps={{ variant: 'body2' }}
                          sx={{ color: theme.palette.grey[600] }}
                        />
                      </Box>
                    }
                  />
                </Grid>
              ))}
          </Grid>
        )}
        <Grid
          container
          spacing={2}
          sx={{ padding: '0px 10px 10px 22px', maxWidth: '480px' }}
        >
          {isEditLink &&
            !isNullOrEmpty(QuickLinksData) &&
            QuickLinksData.map((item) => (
              <Grid item xs={6} key={uuidv4()}>
                {checkedItems.hasOwnProperty(item.name) && (
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Image src={item.logo} alt="link" />
                    <ListItemText
                      primary={item.name}
                      primaryTypographyProps={{ variant: 'body2' }}
                      sx={{ color: theme.palette.grey[600] }}
                    />
                  </Box>
                )}
              </Grid>
            ))}
        </Grid>
      </Popover>
    </div>
  );
};

export default LinkDropdown;
