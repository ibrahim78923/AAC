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
  Divider,
  // TextField,
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
import { BlueInfoIcon, DeleteIcon, PercentageCircleIcon } from '@/assets/icons';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_SETTINGS } from '@/constants/permission-keys';
import { Info } from '@mui/icons-material';
import NoData from '@/components/NoData';

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
    addField,
    deleteField,
    setAnchorEl,
    isdefaultValue,
    dealPipelinesData,
    isLoading,
    inputFields,
    setCheckedDeal,
    handleChangeInput,
    selectedPipelines,
    togglePipeline,
    Loading,
    pipelineById,
  } = useSalesProduct();
  const pipleLineStages =
    isDraweropen?.type === 'add' ? inputFields : pipelineById?.data[0]?.stages;

  return (
    <>
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
            {selectedPipelines?.length > 1 ? (
              <Button
                className="small"
                variant="outlined"
                color="inherit"
                startIcon={<DeleteIcon />}
                onClick={() => {}}
              >
                Delete
              </Button>
            ) : (
              <>
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={styles?.actionBtn(theme)}
                  disabled={selectedPipelines?.length !== 1}
                  endIcon={<ArrowDropDownIcon />}
                >
                  Actions
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                  sx={{
                    '.MuiPopover-paper': {
                      minWidth: '110px',
                    },
                  }}
                >
                  <PermissionsGuard
                    permissions={[AIR_SALES_SETTINGS?.EDIT_PIPELINE]}
                  >
                    <MenuItem
                      onClick={() => (
                        setIsEditMode(true),
                        setIsDraweropen({ isToggle: true, type: 'edit' }),
                        setAnchorEl(null)
                      )}
                    >
                      Edit
                    </MenuItem>
                  </PermissionsGuard>
                  <PermissionsGuard
                    permissions={[AIR_SALES_SETTINGS?.DELETE_PIPELINE]}
                  >
                    <MenuItem
                      onClick={() => {
                        setDeleteModalOpen(true), setAnchorEl(null);
                      }}
                    >
                      Delete
                    </MenuItem>
                  </PermissionsGuard>
                </Menu>
              </>
            )}

            <PermissionsGuard
              permissions={[AIR_SALES_SETTINGS?.CREATE_PIPELINE]}
            >
              <Button
                variant="contained"
                sx={styles?.createBtn}
                onClick={() => (
                  setIsDraweropen({ isToggle: true, type: 'add' }),
                  setIsEditMode(false)
                )}
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
            </PermissionsGuard>
          </Box>
        </Box>

        <Box sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <PermissionsGuard permissions={[AIR_SALES_SETTINGS?.SEARCH_PIPELINE]}>
            <Search
              label={'Search here'}
              searchBy={productSearch}
              setSearchBy={setproductSearch}
              size="small"
            />
          </PermissionsGuard>
        </Box>
        {isLoading ? (
          <SkeletonForm />
        ) : dealPipelinesData?.length === 0 ? (
          <NoData />
        ) : (
          dealPipelinesData?.map((dealPipeline: any) => (
            <Accordion
              key={uuidv4()}
              sx={{
                boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
                borderRadius: '10px',
                mt: 2,
                px: 1,
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ArrowDropDownIcon
                    sx={{
                      fontSize: '30px',
                      color: theme?.palette?.custom?.steel_blue_alpha,
                    }}
                  />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                  padding: '0px',
                  '& .MuiAccordionSummary-content': {
                    alignItems: 'center',
                    margin: '8px 0',
                  },
                  alignItems: 'center',
                }}
              >
                <Checkbox
                  checked={selectedPipelines?.some(
                    (p: any) => p?._id === dealPipeline?._id,
                  )}
                  onChange={() => {
                    togglePipeline(dealPipeline);
                    setCheckedDeal(dealPipeline?._id);
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{ color: theme?.palette?.slateBlue?.main }}
                >
                  {dealPipeline?.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Divider sx={{ mb: 1 }} />
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
                    <Typography variant="body1">
                      Marked as default pipeline
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Info sx={{ color: theme?.palette?.custom?.custom_red }} />
                    <Typography
                      variant="body1"
                      fontWeight={500}
                      color={theme?.palette?.custom?.custom_red}
                    >
                      Deals rots after 30 days
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

      {isDraweropen?.isToggle && (
        <CommonDrawer
          isDrawerOpen={isDraweropen?.isToggle}
          onClose={handleCloseDrawer}
          title={isEditMode ? 'Edit Pipeline' : 'Create Pipeline'}
          okText={isEditMode ? 'Edit' : 'Add'}
          footer={true}
          isOk={true}
          submitHandler={handleSubmit(onSubmit)}
          isLoading={Loading}
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
                  {pipleLineStages?.map((inputField: any, index: any) => (
                    <Grid container spacing={1} key={inputField?.name}>
                      <Grid item xs={12} md={5}>
                        <RHFTextField
                          name="name"
                          label={index === 0 ? 'Deal Stage' : ''}
                          size="small"
                          required={true}
                          placeholder="Stage"
                          value={inputField?.name}
                          onChange={(event: any) =>
                            handleChangeInput(index, event)
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <RHFTextField
                          name="probability"
                          label={index === 0 ? 'Stage Probability' : ''}
                          size="small"
                          required={true}
                          type="number"
                          value={inputField?.probability}
                          onChange={(event: any) =>
                            handleChangeInput(index, event)
                          }
                          placeholder="Probability"
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
                sx={{
                  color: theme?.palette?.slateBlue?.main,
                  marginTop: '15px',
                }}
              >
                <AddCircleIcon sx={{ marginRight: '8px' }} />
                Add Deal stage
              </Button>
            </FormProvider>
          </Box>
        </CommonDrawer>
      )}

      {isDeleteModalOpen && (
        <AlertModals
          message={
            isdefaultValue
              ? 'You cannot delete default pipeline'
              : "You're about to delete Pipeline. Are you sure?"
          }
          type={isdefaultValue ? 'Alert' : 'delete'}
          open={isDeleteModalOpen}
          handleClose={handleCloseDeleteModal}
          handleSubmitBtn={handleDelete}
          typeImage={<BlueInfoIcon />}
          loading={Loading}
        />
      )}
    </>
  );
};

export default DealPipelines;
