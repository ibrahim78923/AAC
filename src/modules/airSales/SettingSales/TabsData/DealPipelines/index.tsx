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

import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import Search from '@/components/Search';
import { AlertModals } from '@/components/AlertModals';

import useSalesProduct from './useDealPipelines';

import { styles } from './DealPipelines.style';

import { v4 as uuidv4 } from 'uuid';
import { BlueInfoIcon } from '@/assets/icons';

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
    setAnchorEl,
    isdefaultValue,
  } = useSalesProduct();
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDraweropen}
        onClose={handleCloseDrawer}
        title={isEditMode ? 'Edit Pipeline' : 'Create Pipeline'}
        okText={'Add'}
        footer={true}
        isOk={true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box sx={{ paddingTop: '1rem !important' }}>
          <FormProvider methods={dealPipelines}>
            <Grid
              container
              spacing={4}
              sx={{
                borderBottom: `1px solid ${theme?.palette?.custom?.off_white_three}`,
              }}
            >
              {dynamicFields?.map((item: any, index: any) => (
                <>
                  <Grid
                    item
                    xs={index < 2 ? 12 : 7}
                    md={item?.md}
                    key={uuidv4()}
                    sx={{
                      paddingTop:
                        index == '0' ? '20px !important' : '10px !important',
                      borderTop:
                        index > '3'
                          ? `1px solid ${theme?.palette?.custom?.off_white_three}`
                          : 'none',
                    }}
                  >
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
                            sx={styles?.BoxStyling}
                            style={{ marginBottom: '10px' }}
                          >
                            <Grid
                              item
                              xs={5}
                              sx={{ paddingTop: '0px !important' }}
                            >
                              <Typography
                                variant="body2"
                                sx={{ color: theme?.palette?.blue?.main }}
                              >
                                Deal Stage{' '}
                                <span style={{ color: 'red' }}> *</span>{' '}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={5}
                              sx={{ paddingTop: '0px !important' }}
                            >
                              <Typography
                                variant="body2"
                                sx={{ color: theme?.palette?.blue?.main }}
                              >
                                Stage Probability{' '}
                                <span style={{ color: 'red' }}> *</span>{' '}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={2}
                              sx={{ paddingTop: '0px !important' }}
                            >
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
                      <Grid
                        item
                        md={2}
                        sx={{
                          paddingTop: '10px !important',
                          borderTop:
                            index > '3'
                              ? `1px solid ${theme?.palette?.custom?.off_white_three}`
                              : 'none',
                        }}
                      >
                        <Button
                          onClick={() => deleteField(index - 1)}
                          disabled={index === 3}
                        >
                          <CancelIcon
                            sx={{
                              color:
                                index === 3
                                  ? theme?.palette?.custom?.main
                                  : theme?.palette?.error?.main,
                            }}
                          />
                        </Button>
                      </Grid>
                    ))}
                </>
              ))}
            </Grid>
            <Button
              onClick={addField}
              sx={{ color: theme?.palette?.slateBlue?.main, marginTop: '15px' }}
            >
              <AddCircleIcon sx={{ marginRight: '8px' }} />
              Add Deal stage
            </Button>
          </FormProvider>
        </Box>
      </CommonDrawer>

      <AlertModals
        message={
          isdefaultValue
            ? 'You cannot delete default pipeline'
            : "You're about to delete Pipeline. Are you sure?"
        }
        type={isdefaultValue ? 'Alert' : 'delete'}
        open={isDeleteModalOpen}
        handleClose={handleCloseDeleteModal}
        handleSubmit={handleDelete}
        typeImage={<BlueInfoIcon />}
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
              '@media (max-width: 500px)': {
                justifyContent: 'end',
                marginTop: '10px',
              },
            }}
          >
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={styles?.actionBtn(theme)}
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
                onClick={() => (
                  setIsEditMode(true), setIsDraweropen(true), setAnchorEl(null)
                )}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setDeleteModalOpen(true), setAnchorEl(null);
                }}
              >
                Delete
              </MenuItem>
            </Menu>

            <Button
              variant="contained"
              sx={styles?.createBtn}
              onClick={() => (setIsDraweropen(true), setIsEditMode(false))}
              className="small"
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
            <Checkbox
              value="default"
              onChange={(value) => getCheckbox(value, 'default')}
            />
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
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox />
                <Typography variant="body2">
                  Marked as default pipeline{' '}
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
            <Box sx={styles?.BoxStyling}>
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

            <Box sx={styles?.BoxStyling}>
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
                margin: '8px 0',
              },
            }}
          >
            <Checkbox
              value="Notdefault"
              onChange={(value) => getCheckbox(value, 'Notdefault')}
            />
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
                flexWrap: 'wrap',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox />
                <Typography variant="body2">
                  Marked as default pipeline{' '}
                </Typography>
              </Box>
            </Box>
            <Box sx={styles?.BoxStyling}>
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
            <Box sx={styles?.BoxStyling}>
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

            <Box sx={styles?.BoxStyling}>
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
