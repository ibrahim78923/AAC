import CommonDrawer from '@/components/CommonDrawer';
import { ArrowDropDown } from '@mui/icons-material';
import { Box, Button, Grid, Menu, MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import { FolderBlackIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { useTheme } from '@emotion/react';
import CommonModal from '@/components/CommonModal';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  associationsDefaultValues,
  associationsValidationSchema,
} from './actions.data';
import { useLazyGetAllDealsAsyncQuery } from '@/services/commonFeatures/email/outlook';

const Actions = () => {
  const theme: any = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isMoveToFolderDrawerOpen, setIsMoveToFolderDrawerOpen] =
    useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [isDealAssociations, setIsDealAssociations] = useState(false);

  const methods: any = useForm({
    resolver: yupResolver(associationsValidationSchema),
    defaultValues: associationsDefaultValues,
  });
  const { handleSubmit, reset } = methods;
  const onSubmit = () => {};

  const apiQueryUsers = useLazyGetAllDealsAsyncQuery?.();

  return (
    <>
      <Button
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="outlined"
        color="inherit"
        className="small"
        id="basic-button"
        sx={{
          width: { xs: '100%', sm: 'auto', md: 'auto', lg: '112px' },
        }}
      >
        Actions
        <ArrowDropDown />
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
        <MenuItem
          onClick={() => {
            handleClose();
            setIsMoveToFolderDrawerOpen(true);
          }}
        >
          Move to a folder
        </MenuItem>
        <MenuItem
          onClick={() => {
            setIsDealAssociations(true);
            handleClose();
          }}
        >
          Deal Associations
        </MenuItem>
        <MenuItem onClick={handleClose}>Add to shared folder</MenuItem>
      </Menu>

      <CommonDrawer
        footer
        isDrawerOpen={isMoveToFolderDrawerOpen}
        onClose={() => setIsMoveToFolderDrawerOpen(false)}
        title="Move to folder"
        okText="Apply"
        cancelText="cancel"
        isOk
      >
        <>
          <Search
            searchBy={searchValue}
            setSearchBy={setSearchValue}
            label="Search By Name"
            fullWidth
            size="small"
            sx={{
              marginBottom: '15px',
              '& input': {
                padding: '10px',
                '&::placeholder': {
                  fontSize: '14px',
                },
              },
            }}
          />
          <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>
            Main Folder
          </Typography>
          <Box>
            <MenuItem sx={{ gap: '10px' }}>
              <FolderBlackIcon
                color={theme?.palette?.primary?.main}
                size={22}
              />
              <Typography variant="body1">SubFolder 1</Typography>
            </MenuItem>
            <MenuItem sx={{ gap: '10px' }}>
              <FolderBlackIcon
                color={theme?.palette?.primary?.main}
                size={22}
              />
              <Typography variant="body1">SubFolder 2</Typography>
            </MenuItem>
          </Box>
        </>
      </CommonDrawer>

      <CommonModal
        open={isDealAssociations}
        handleClose={() => {
          reset();
          setIsDealAssociations(false);
        }}
        handleCancel={() => {
          reset();
          setIsDealAssociations(false);
        }}
        handleSubmit={handleSubmit(onSubmit)}
        title="Deal Association"
        okText="Add"
        cancelText="Cancel"
        footer
      >
        <FormProvider methods={methods}>
          <Grid container>
            <Grid item xs={12}>
              <Grid item md={12}>
                <RHFAutocompleteAsync
                  label="Deal"
                  name="linkToDeal"
                  fullWidth
                  apiQuery={apiQueryUsers}
                  size="small"
                  placeholder="Select deal"
                  getOptionLabel={(option: any) => option?.name}
                />
              </Grid>
            </Grid>
          </Grid>
        </FormProvider>
      </CommonModal>
    </>
  );
};

export default Actions;
