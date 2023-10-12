import React from 'react';

import {
  Box,
  Typography,
  Button,
  MenuItem,
  Menu,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
} from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import InfoIcon from '@mui/icons-material/Info';

import { v4 as uuidv4 } from 'uuid';

import { FormProvider } from '@/components/ReactHookForm';

import CommonDrawer from '@/components/CommonDrawer';

import Search from '@/components/Search';

import { AlertModals } from '@/components/AlertModals';

import useSalesProduct from './useDealPipelines';

import { styles } from './DealPipelines.style';

const DealPipelines = () => {
  const {
    isDraweropen,
    setIsDraweropen,
    isEditMode,
    setIsEditMode,
    isDeleteModalOpen,
    setDeleteModalOpen,
    productSearch,
    setproductSearch,
    theme,
    anchorEl,
    open,
    handleClick,
    handleClose,
    handleCloseDrawer,
    dealPipelines,
    handleSubmit,
    onSubmit,
    handleCloseDeleteModal,
    handleDelete,
    getCheckbox,
    isDisableButton,
    dynamicFields,
    addField,
    deleteField,
  } = useSalesProduct();

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDraweropen}
        onClose={handleCloseDrawer}
        title={isEditMode ? 'Edit Pipelines' : 'Create Pipelines'}
        okText={'Add'}
        footer={true}
        isOk={true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={dealPipelines}>
            <Grid container spacing={4}>
              {dynamicFields?.map((item: any, index: any) => (
                <>
                  <Grid item xs={12} md={item?.md} key={uuidv4()}>
                    {index % 2 === 0 && (
                      <item.component {...item.componentProps} size={'small'} />
                    )}
                    {index % 2 === 1 && (
                      <>
                        <item.component
                          {...item.componentProps}
                          size={'small'}
                        />
                        {index < 2 && (
                          <Grid
                            container
                            spacing={2}
                            sx={styles.BoxStyling}
                            style={{ marginBottom: '15px' }}
                          >
                            <Grid item xs={5} sx={{ padding: '0px' }}>
                              <Typography
                                variant="body2"
                                sx={{ color: theme?.palette?.blue?.main }}
                              >
                                Deal Stage{' '}
                                <span style={{ color: 'red' }}> *</span>{' '}
                              </Typography>
                            </Grid>
                            <Grid item xs={5}>
                              <Typography
                                variant="body2"
                                sx={{ color: theme?.palette?.blue?.main }}
                              >
                                Stage Probability{' '}
                                <span style={{ color: 'red' }}> *</span>{' '}
                              </Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <Typography
                                variant="body2"
                                sx={{ color: theme?.palette?.blue?.main }}
                              >
                                Actions
                              </Typography>
                            </Grid>
                          </Grid>
                        )}
                      </>
                    )}
                  </Grid>

                  {index === 1 ||
                    (index % 2 === 1 && (
                      <Grid item md={2}>
                        <Button onClick={() => deleteField(index - 1)}>
                          <CancelIcon
                            sx={{ color: theme?.palette?.error?.main }}
                          />
                        </Button>
                      </Grid>
                    ))}
                </>
              ))}
            </Grid>
            <Button
              onClick={addField}
              sx={{ color: theme?.palette?.slateBlue?.main, marginTop: '20px' }}
            >
              <AddCircleIcon sx={{ marginRight: '8px' }} />
              Add Deal stage
            </Button>
          </FormProvider>
        </Box>
      </CommonDrawer>

      <AlertModals
        message="You're about to delete Pipeline. Are you sure?"
        type="delete"
        open={isDeleteModalOpen}
        handleClose={handleCloseDeleteModal}
        handleSubmit={handleDelete}
      />
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="h4">Deal Pipelines</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{
                border: `1px solid ${theme?.palette?.custom.dark}`,
                borderRadius: '4px',
                color: `${theme?.palette?.custom.main}`,
                display: 'flex',
                alignItems: 'center',
                padding: '6px 15px',
                height: '36px',
                '&:disabled': {
                  color: theme?.palette?.grey[0],
                },
              }}
              disabled={!isDisableButton}
            >
              Actions <ArrowDropDownIcon />
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
                onClick={() => (setIsEditMode(true), setIsDraweropen(true))}
              >
                Edit
              </MenuItem>
              <MenuItem onClick={() => setDeleteModalOpen(true)}>
                Delete
              </MenuItem>
            </Menu>

            <Button
              variant="contained"
              sx={{
                display: 'flex',
                columnGap: '10px',
                height: '38px',
                fontWeight: '500',
                marginLeft: '15px',
              }}
              onClick={() => (setIsDraweropen(true), setIsEditMode(false))}
            >
              <AddCircleIcon
                sx={{
                  color: `${theme?.palette?.common.white}`,
                  fontSize: '16px',
                }}
              />{' '}
              Create Pipeline
            </Button>
          </Box>
        </Box>

        <Search
          label={'Search here'}
          searchBy={productSearch}
          setSearchBy={setproductSearch}
          width="100%"
          size="small"
          sx={{ marginTop: '2rem', marginBottom: '1rem' }}
        />

        <Accordion
          sx={{
            boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
            borderRadius: '10px',
          }}
        >
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon sx={{ fontSize: '40px' }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              padding: '0px',
              borderBottom: `1px solid  ${theme?.palette?.grey[700]}`,
              '& .MuiAccordionSummary-content': {
                alignItems: 'center',
                margin: '8px 0',
              },
            }}
          >
            <Checkbox value="default" onChange={getCheckbox} />
            <Typography
              variant="h6"
              sx={{ color: theme?.palette?.slateBlue?.main, fontWeight: '600' }}
            >
              Default Pipeline
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox />
                <Typography variant="body2">
                  Marked as default pipeline{' '}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InfoIcon
                  sx={{
                    color: theme?.palette?.error?.main,
                    fontSize: '1.4rem',
                    transform: 'rotate(180deg)',
                  }}
                />{' '}
                <Typography
                  variant="body2"
                  sx={{ color: theme?.palette?.error?.main, marginLeft: '7px' }}
                >
                  Deals rots after 30 days
                </Typography>
              </Box>
            </Box>
            <Box sx={styles.BoxStyling}>
              <Typography variant="body2" sx={{ fontWeight: '600' }}>
                New{' '}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme?.palette?.grey[900] }}
              >
                Probability 100%
              </Typography>
            </Box>
            <Box sx={styles.BoxStyling}>
              <Typography variant="body2" sx={{ fontWeight: '600' }}>
                Follow-up{' '}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme?.palette?.grey[900] }}
              >
                Probability 100%
              </Typography>
            </Box>

            <Box sx={styles.BoxStyling}>
              <Typography variant="body2" sx={{ fontWeight: '600' }}>
                Under review{' '}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme?.palette?.grey[900] }}
              >
                Probability 100%
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
            borderRadius: '10px',
            marginTop: '20px',
          }}
        >
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon sx={{ fontSize: '40px' }} />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            sx={{
              padding: '0px',
              borderBottom: `1px solid  ${theme?.palette?.grey[700]}`,
              '& .MuiAccordionSummary-content': {
                alignItems: 'center',
              },
            }}
          >
            <Checkbox value="default" onChange={getCheckbox} />
            <Typography
              variant="h6"
              sx={{ color: theme?.palette?.slateBlue?.main, fontWeight: '600' }}
            >
              Inbound Sales
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox />
                <Typography variant="body2">
                  Marked as default pipeline{' '}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InfoIcon
                  sx={{
                    color: theme?.palette?.error?.main,
                    fontSize: '1.4rem',
                    transform: 'rotate(180deg)',
                  }}
                />{' '}
                <Typography
                  variant="body2"
                  sx={{ color: theme?.palette?.error?.main, marginLeft: '7px' }}
                >
                  Deals rots after 30 days
                </Typography>
              </Box>
            </Box>
            <Box sx={styles.BoxStyling}>
              <Typography variant="body2" sx={{ fontWeight: '600' }}>
                New{' '}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme?.palette?.grey[900] }}
              >
                Probability 100%
              </Typography>
            </Box>
            <Box sx={styles.BoxStyling}>
              <Typography variant="body2" sx={{ fontWeight: '600' }}>
                Follow-up{' '}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme?.palette?.grey[900] }}
              >
                Probability 100%
              </Typography>
            </Box>

            <Box sx={styles.BoxStyling}>
              <Typography variant="body2" sx={{ fontWeight: '600' }}>
                Under review{' '}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme?.palette?.grey[900] }}
              >
                Probability 100%
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default DealPipelines;
