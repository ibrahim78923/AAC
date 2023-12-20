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
  IconButton,
  InputAdornment,
} from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import {
  FormProvider,
  RHFCheckbox,
  RHFTextField,
} from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import Search from '@/components/Search';
import { AlertModals } from '@/components/AlertModals';

import useSalesProduct from './useDealPipelines';

import { styles } from './DealPipelines.style';

import { v4 as uuidv4 } from 'uuid';
import { BlueInfoIcon, PercentageCircleIcon } from '@/assets/icons';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';

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
    addField,
    deleteField,
    setAnchorEl,
    isdefaultValue,
    dealPipelinesData,
    isLoading,
    inputFields,
    handleChangeInput,
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
              spacing={1}
              sx={{
                borderBottom: `1px solid ${theme?.palette?.custom?.off_white_three}`,
              }}
            >
              <Grid item xs={12}>
                <RHFTextField
                  name="pipelineName"
                  label="Pipeline Name"
                  size="small"
                  required={true}
                  placeholder="Inbound Sales"
                />
              </Grid>
              <Grid item xs={12}>
                <RHFCheckbox
                  label="Mark as Default Pipeline"
                  name="defaultPipeline"
                />
              </Grid>
              <Grid item xs={12}>
                {inputFields?.map((inputField, index) => (
                  <Grid container spacing={1} key={uuidv4()}>
                    <Grid item xs={12} md={5}>
                      <RHFTextField
                        name="name"
                        label={index === 0 ? 'Name' : ''}
                        size="small"
                        required={true}
                        placeholder="Inbound Sales"
                        value={inputField?.name}
                        onChange={(event) => handleChangeInput(index, event)}
                      />
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <RHFTextField
                        name="probability"
                        label={index === 0 ? 'Probability' : ''}
                        size="small"
                        required={true}
                        type="number"
                        value={inputField?.probability}
                        onChange={(event) => handleChangeInput(index, event)}
                        placeholder="Inbound Sales"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton>
                                <PercentageCircleIcon />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      {index === 0 && (
                        <Typography
                          sx={{
                            color: 'inherit',
                            marginBottom: 0.6,
                          }}
                        >
                          Action
                        </Typography>
                      )}
                      <Button
                        onClick={() => deleteField(index)}
                        disabled={
                          index === 0 ||
                          index === inputFields?.length - 1 ||
                          index === inputFields?.length - 2
                        }
                      >
                        <CancelIcon
                          sx={{
                            color:
                              index === 0 ||
                              index === inputFields?.length - 1 ||
                              index === inputFields?.length - 2
                                ? theme?.palette?.custom?.main
                                : theme?.palette?.error?.main,
                          }}
                        />
                      </Button>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
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
              />
              Create Pipeline
            </Button>
          </Box>
        </Box>

        <Box sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <Search
            label={'Search here'}
            searchBy={productSearch}
            setSearchBy={setproductSearch}
            size="small"
          />
        </Box>
        {isLoading ? (
          <SkeletonForm />
        ) : (
          dealPipelinesData?.dealpipelines?.map((dealPipeline: any) => (
            <Accordion
              key={uuidv4()}
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
                  sx={{
                    color: theme?.palette?.slateBlue?.main,
                    fontWeight: '600',
                  }}
                >
                  {dealPipeline?.name}
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
                    <Checkbox checked={dealPipeline?.isDefault} />
                    <Typography variant="body2">
                      Marked as default pipeline
                    </Typography>
                  </Box>
                </Box>
                {dealPipeline?.stages?.map((stage: any) => (
                  <Box sx={styles?.BoxStyling} key={uuidv4()}>
                    <Typography variant="body2" sx={{ fontWeight: '600' }}>
                      {stage?.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme?.palette?.grey[900] }}
                    >
                      Probability {stage?.probability}%
                    </Typography>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Box>
    </>
  );
};

export default DealPipelines;
