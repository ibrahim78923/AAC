import CommonDrawer from '@/components/CommonDrawer';
import { ArrowDropDown } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Skeleton,
} from '@mui/material';
import React, { useState } from 'react';
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
import {
  useGetCommonContractsPersonalFoldersActionListQuery,
  usePostDealAssociationMutation,
  useUpdateListCommonContractsMutation,
} from '@/services/commonFeatures/contracts/contracts-dashboard';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RecursiveFolderAccordion } from '..';
import { successSnackbar } from '@/lib/snackbar';
import { API_STATUS, ASSOCIATIONS_API_PARAMS_FOR } from '@/constants';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const Actions = ({ selectedRecords, setSelectedRecords }: any) => {
  const theme: any = useTheme();

  const currentFolder = selectedRecords[0];

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

  const methods = useForm<any>({
    resolver: yupResolver(associationsValidationSchema),
    defaultValues: associationsDefaultValues,
  });
  const { handleSubmit, reset } = methods;

  const [postDealAssociation, { isLoading: postAssociationLoading }] =
    usePostDealAssociationMutation();

  const onSubmit = async (values: any) => {
    try {
      const payload = {
        recordId: values?.linkToDeal?._id,
        contractsIds: selectedRecords?.map((record: any) => record?._id),
        recordType: ASSOCIATIONS_API_PARAMS_FOR?.DEALS,
        operation: ASSOCIATIONS_API_PARAMS_FOR?.ADD,
      };
      await postDealAssociation({
        body: payload,
      })?.unwrap();
      enqueueSnackbar('Record Deleted Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const apiQueryUsers = useLazyGetAllDealsAsyncQuery?.();

  // const [selectedMenu, setSelectedMenu] = useState<any>({});

  const [folderToMove, setFolderToMove] = useState<any>({});

  const { data: personalConData, status: personalConIsLoading } =
    useGetCommonContractsPersonalFoldersActionListQuery({
      page: 1,
      limit: 10,
      ...(searchValue.length && { search: searchValue }),
      meta: true,
      nested: true,
    });

  const [
    updateCreateContractFolder,
    { isLoading: updateCreateContractFolderLoading },
  ] = useUpdateListCommonContractsMutation();

  const handelMoveToFolder = async () => {
    const payload = new FormData();
    payload.append('folderId', folderToMove?._id);
    try {
      await updateCreateContractFolder({
        payload,
        id: currentFolder?._id,
      })?.unwrap();
      successSnackbar('Moved to Folder Successfully');
      setSelectedRecords([]);
      setIsMoveToFolderDrawerOpen(false);
    } catch (error: any) {
      // errorSnackbar(error?.data?.message);
    }
  };

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
        disabled={selectedRecords?.length < 1}
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
          disabled={selectedRecords?.length > 1}
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
        submitHandler={handelMoveToFolder}
        isLoading={updateCreateContractFolderLoading}
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

          {personalConIsLoading === API_STATUS?.PENDING ? (
            <>
              <Box>
                <Skeleton
                  variant="rounded"
                  width="100%"
                  height={35}
                  sx={{ mt: 1 }}
                />
                <Skeleton
                  variant="rounded"
                  width="80%"
                  height={35}
                  sx={{ mt: 1, ml: 2 }}
                />
                <Skeleton
                  variant="rounded"
                  width="80%"
                  height={35}
                  sx={{ mt: 1, ml: 2 }}
                />
              </Box>
            </>
          ) : (
            <>
              <Accordion sx={{ margin: '0px !important' }} defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={{
                    flexDirection: 'row-reverse',
                    height: '40px !important',
                    minHeight: '40px !important',
                    margin: '0px !important',
                    marginLeft: '-22px !important',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      background: 'unset',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box sx={{ ml: 1 }}>My Contracts</Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: '0px 0px 0px !important' }}>
                  <Box
                    sx={{
                      position: 'relative',
                      padding: '0px 20px 0px !important',
                      width: '100%',
                      overflowY: 'auto',
                      maxHeight: 'auto',
                      '&::before': {
                        position: 'absolute',
                        content: '""',
                        background: theme?.palette?.custom?.light_lavender_gray,
                        width: '1px',
                        height: '100%',
                        zIndex: 1,
                        left: '8px',
                      },
                    }}
                  >
                    {personalConData?.data?.commoncontractfolder && (
                      <RecursiveFolderAccordion
                        folders={personalConData?.data?.commoncontractfolder}
                        setFolderToMove={setFolderToMove}
                        folderToMove={folderToMove}
                        selectedMenu={currentFolder?.folders}
                      />
                    )}
                  </Box>
                </AccordionDetails>
              </Accordion>
            </>
          )}
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
        isLoading={postAssociationLoading}
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
