import React from 'react';
import {
  Box,
  Typography,
  Button,
  MenuItem,
  Menu,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Divider,
} from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Search from '@/components/Search';
import { AlertModals } from '@/components/AlertModals';

import useDealPipelines from './useDealPipelines';

import { styles } from './DealPipelines.style';

import { v4 as uuidv4 } from 'uuid';
import { BlueInfoIcon, DeleteIcon } from '@/assets/icons';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_SETTINGS } from '@/constants/permission-keys';
import { Info } from '@mui/icons-material';
import NoData from '@/components/NoData';
import { CustomField } from './custom';

const DealPipelines = () => {
  const {
    handleSelectDealsById,
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
    onSubmit,
    handleCloseDeleteModal,
    handleDelete,
    setAnchorEl,
    isdefaultValue,
    dealPipelinesData,
    isLoading,
    postDealLoading,
    deleteDealLoading,
    checkedDeal,
  } = useDealPipelines();

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
          <Typography variant="h3">Deal Pipelines</Typography>
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
            {checkedDeal?.length > 1 ? (
              <Button
                className="small"
                variant="outlined"
                color="inherit"
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
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
                  disabled={checkedDeal?.length !== 1}
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
                  checked={checkedDeal?.includes(dealPipeline?._id)}
                  // checked={selectedPipelines?.some(
                  //   (p: any) => p?._id === dealPipeline?._id,
                  // )}
                  onChange={({ target }) => {
                    handleSelectDealsById(target.checked, dealPipeline?._id);
                  }}
                  // onChange={() => {
                  //   togglePipeline(dealPipeline);
                  //   setCheckedDeal(dealPipeline?._id);
                  // }}
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
        <CustomField
          key="deals pipline"
          open={isDraweropen?.isToggle}
          onClose={handleCloseDrawer}
          isEditMode={isEditMode}
          loading={postDealLoading}
          onSubmit={onSubmit}
          id={checkedDeal}
          // isDraweropen={isDraweropen}
        />
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
          loading={deleteDealLoading}
        />
      )}
    </>
  );
};

export default DealPipelines;
