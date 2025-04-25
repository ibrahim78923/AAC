import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  BackArrIcon,
  FilterrIcon,
  FolderBlackIcon,
  PlusRoundedIcon,
  RefreshTasksIcon,
  ThreeDotsIcon,
} from '@/assets/icons';
import ArrowDownBold from '@/assets/icons/shared/arrow-down-bold';
import DraftIcon from '@/assets/icons/shared/draft';
import SignIcon from '@/assets/icons/shared/sign';
import ContractsGrid from './GridView';
import Search from '@/components/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  addNewFolderDefaultValues,
  addNewFolderValidationSchema,
  contractsFilterData,
  contractsFiltersDefaultValues,
  contractsFiltersValidationSchema,
  renameFolderValidationSchema,
  tabData,
} from './contracts.data';
import CommonModal from '@/components/CommonModal';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CONTRACTS_STATUS, DATE_FORMAT } from '@/constants';
import { styles } from './contracts.style';
import Actions from './Actions';
import CommonDrawer from '@/components/CommonDrawer';
import { AlertModals } from '@/components/AlertModals';
import useContracts from './useContracts';
// import ModalSignPdf from './ModalSignPdf';
import {
  useDeleteContractFolderMutation,
  useGetCommonContractsPersonalFoldersListQuery,
  useGetCommonContractsSharedFoldersListQuery,
  usePostCreateContractFolderMutation,
  useUpdateCreateContractFolderMutation,
} from '@/services/commonFeatures/contracts/contracts-dashboard';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
const Contracts = () => {
  const theme = useTheme();
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [activeMenu, setActiveMenu] = useState<any>({});
  const [activeFolder, setActiveFolder] = useState<any>({});
  const [filterParams, setFilterParams] = useState<any>({});
  const { handleClickCreateDraft, handleClickSignPdf } =
    useContracts(activeFolder);

  const { data, isLoading } = useGetCommonContractsSharedFoldersListQuery({
    page: 1,
    limit: 10,
    ...(searchValue?.length && { search: searchValue }),
    meta: true,
    nested: true,
  });

  const {
    data: personalConData,
    isLoading: personalConIsLoading,
    status: personalConStatus,
  } = useGetCommonContractsPersonalFoldersListQuery({
    page: 1,
    limit: 10,
    ...(searchValue.length && { search: searchValue }),
    meta: true,
    nested: true,
  });

  const isSmallScreen = useMediaQuery('(max-width: 1000px)');

  const [isAddFolderDrawerOpen, setIsAddFolderDrawerOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Create Folder or sub folder
  const methods: any = useForm({
    resolver: yupResolver(addNewFolderValidationSchema),
    defaultValues: addNewFolderDefaultValues,
  });
  const { handleSubmit, reset } = methods;
  const [
    postCreateContractFolder,
    { isLoading: postCreateContractFolderLoading },
  ] = usePostCreateContractFolderMutation();
  const onSubmit = async (values: any) => {
    const payload = {
      name: values?.name,
      ...(activeMenu?._id?.length && { parentFolderId: activeMenu?._id }),
    };
    try {
      await postCreateContractFolder({ payload })?.unwrap();
      successSnackbar('Folder Created Successfully');
      setActiveMenu({});
      reset();
      setIsAddFolderDrawerOpen(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  // Tabs
  const [tabValue, setTabValue] = useState(CONTRACTS_STATUS?.ALL);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedRecords([]);
    setTabValue(newValue);
  };

  //Filters
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const methodsFilter: any = useForm<any>({
    resolver: yupResolver(contractsFiltersValidationSchema),
    defaultValues: contractsFiltersDefaultValues,
  });
  const { handleSubmit: handleSubmitFilter } = methodsFilter;
  const onSubmitFilter = (values: any) => {
    const hasValue = (val: any) =>
      val !== undefined && val !== null && val !== '';
    setFilterParams({
      ...(hasValue(values?.type) && { type: values.type }),
      ...(hasValue(values?.sortBy) && { sortBy: values.sortBy }),
      ...(hasValue(values?.date?.startDate) && {
        dateStart: dayjs(values.date.startDate).format(DATE_FORMAT.API),
      }),
      ...(hasValue(values?.date?.endDate) && {
        dateEnd: dayjs(values.date.endDate).format(DATE_FORMAT.API),
      }),
    });
    setIsFilterDrawerOpen(false);
  };

  useEffect(() => {
    if (personalConData?.data?.commoncontractfolder) {
      setActiveFolder(personalConData?.data?.commoncontractfolder[0]);
    }
  }, [personalConData?.data?.commoncontractfolder]);

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <IconButton>
          <BackArrIcon />
        </IconButton>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: '600' }}>
            Contracts
          </Typography>
          <Typography variant="body2">
            Contracts allows you to create, sign, and share your
            Drafts and contracts in a single streamlined flow.
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12} md={5} lg={3}>
          <Box
            sx={{
              background: theme?.palette?.common?.white,
              width: '100%',
              height: isSmallScreen ? 'auto' : '80vh',
              border: `1px solid ${theme?.palette?.custom?.light_lavender_gray}`,
              borderRadius: '8px',
              p: 2,
            }}
          >
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

            <Accordion
              defaultExpanded
              sx={{
                margin: '0px !important',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{
                  height: '30px !important',
                  minHeight: '30px !important',
                  margin: '0px !important',
                }}
              >
                <Typography variant="h5">Contracts</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: '18px 0px 20px 20px' }}>
                <Box>
                  {/* My Contracts  */}
                  {personalConIsLoading ? (
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
                      <Accordion
                        sx={{ margin: '0px !important' }}
                        defaultExpanded
                      >
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
                              background:
                                activeFolder?.key === 'personal'
                                  ? theme?.palette?.custom?.light_lavender_gray
                                  : 'unset',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Box sx={{ ml: 1 }}>My Contracts</Box>
                            <Box onClick={(e) => e.stopPropagation()}>
                              <IconButton
                                onClick={() => setIsAddFolderDrawerOpen(true)}
                              >
                                <PlusRoundedIcon />
                              </IconButton>
                            </Box>
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails
                          sx={{ padding: '0px 0px 0px !important' }}
                        >
                          {personalConData?.data?.commoncontractfolder ? (
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
                                  background:
                                    theme?.palette?.custom?.light_lavender_gray,
                                  width: '1px',
                                  height: '100%',
                                  zIndex: 1,
                                  left: '8px',
                                },
                              }}
                            >
                              {personalConData?.data?.commoncontractfolder && (
                                <RecursiveAccordion
                                  activeFolder={activeFolder}
                                  setActiveFolder={setActiveFolder}
                                  setActiveMenu={setActiveMenu}
                                  folders={
                                    personalConData?.data?.commoncontractfolder
                                  }
                                  setIsAddFolderDrawerOpen={
                                    setIsAddFolderDrawerOpen
                                  }
                                  personalConStatus={personalConStatus}
                                  activeMenu={activeMenu}
                                  setSelectedRecords={setSelectedRecords}
                                />
                              )}
                            </Box>
                          ) : (
                            <></>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    </>
                  )}

                  {/* Shared Folder  */}
                  {isLoading ? (
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
                      <Accordion sx={{ margin: '0px !important' }}>
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
                              background:
                                activeFolder?.key === 'shared'
                                  ? theme?.palette?.custom?.light_lavender_gray
                                  : 'unset',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Box sx={{ ml: 1 }}>Shared Folder</Box>
                            <Box>
                              <IconButton
                                onClick={() => setIsAddFolderDrawerOpen(true)}
                              >
                                <PlusRoundedIcon />
                              </IconButton>
                            </Box>
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails
                          sx={{ padding: '0px 0px 0px !important' }}
                        >
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
                                background:
                                  theme?.palette?.custom?.light_lavender_gray,
                                width: '1px',
                                height: '100%',
                                zIndex: 1,
                                left: '8px',
                              },
                            }}
                          >
                            {data?.data?.commoncontractfolder && (
                              <RecursiveAccordion
                                activeFolder={activeFolder}
                                setActiveFolder={setActiveFolder}
                                setActiveMenu={setActiveMenu}
                                folders={data.data.commoncontractfolder}
                                setIsAddFolderDrawerOpen={
                                  setIsAddFolderDrawerOpen
                                }
                                setSelectedRecords={setSelectedRecords}
                              />
                            )}
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    </>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={9}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px',
              width: '100%',
            }}
          >
            <Box>
              <Typography variant="h4">My Contracts</Typography>
              <Typography variant="body2">
                Simplifying document management with smart organisation,
                collaboration, and secure storage.
              </Typography>
            </Box>
            <Box>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant="contained"
                endIcon={<ArrowDownBold />}
                disabled={!activeFolder?._id}
              >
                New Contract
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
                    handleClickCreateDraft();
                  }}
                >
                  <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Box>
                      <DraftIcon />
                    </Box>
                    <Box>
                      <Typography>Create a draft</Typography>
                      <Typography variant="body2">
                        Create a blank contract draft or use one of the template
                      </Typography>
                    </Box>
                  </Box>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    handleClickSignPdf();
                  }}
                >
                  <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Box>
                      <SignIcon />
                    </Box>
                    <Box>
                      <Typography>Sign a PDF</Typography>
                      <Typography variant="body2">
                        Upload a PDF document to sign on your own or with
                        others.
                      </Typography>
                    </Box>
                  </Box>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '20px',
              mt: 3,
              mb: 3,
              flexWrap: 'wrap',
              width: '100%',
            }}
          >
            <Box
              sx={{ width: { xs: '100%', sm: '100%', md: '100%', lg: 'auto' } }}
            >
              <Tabs
                sx={styles?.tabRoot(theme)}
                value={tabValue}
                onChange={handleChange}
                allowScrollButtonsMobile
                orientation="horizontal"
                variant="scrollable"
              >
                {tabData?.map((tab) => (
                  <Tab
                    key={uuidv4()}
                    sx={styles?.tabsStyle?.(theme)}
                    label={tab?.label}
                    value={tab.value}
                  />
                ))}
              </Tabs>
            </Box>

            <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Actions
                selectedRecords={selectedRecords}
                setSelectedRecords={setSelectedRecords}
              />

              <Tooltip title={'Refresh Filter'}>
                <Button
                  className="small"
                  variant="outlined"
                  color="inherit"
                  sx={{
                    width: { xs: '100%', sm: 'auto', md: 'auto', lg: 'auto' },
                  }}
                  onClick={() => setFilterParams({})}
                >
                  <RefreshTasksIcon />
                </Button>
              </Tooltip>

              <Button
                className="small"
                startIcon={<FilterrIcon />}
                variant="outlined"
                color="inherit"
                onClick={() => setIsFilterDrawerOpen(true)}
                sx={{
                  width: { xs: '100%', sm: 'auto', md: 'auto', lg: 'auto' },
                }}
              >
                Filters
              </Button>
            </Box>
          </Box>

          <ContractsGrid
            activeFolder={activeFolder}
            selectedRecords={selectedRecords}
            setSelectedRecords={setSelectedRecords}
            tabValue={tabValue}
            filterParams={filterParams}
          />
        </Grid>
      </Grid>

      {/* Add New Folder */}
      <CommonModal
        open={isAddFolderDrawerOpen}
        handleClose={() => {
          reset();
          setActiveMenu({});
          setIsAddFolderDrawerOpen(false);
        }}
        handleCancel={() => {
          reset();
          setActiveMenu({});
          setIsAddFolderDrawerOpen(false);
        }}
        handleSubmit={handleSubmit(onSubmit)}
        title="Add New Folder"
        okText="Add"
        cancelText="Cancel"
        footer
        isLoading={postCreateContractFolderLoading}
      >
        <FormProvider methods={methods}>
          <Grid item xs={12}>
            <RHFTextField name="name" label="Folder Name" required={true} />
          </Grid>
        </FormProvider>
      </CommonModal>

      {/* Filters */}
      <CommonDrawer
        footer
        isDrawerOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        title="Filter"
        okText="Apply"
        cancelText="cancel"
        cancelBtnHandler={() => {
          setIsFilterDrawerOpen(false);
          setFilterParams({});
          methodsFilter.reset();
        }}
        submitHandler={handleSubmitFilter(onSubmitFilter)}
        isOk
      >
        <>
          <Box mt={1}>
            <FormProvider methods={methodsFilter}>
              <Grid container spacing={2}>
                {contractsFilterData()?.map((item: any) => (
                  <Grid item xs={12} md={item?.md} key={uuidv4()}>
                    <item.component {...item?.componentProps} size={'small'}>
                      {item?.componentProps?.select &&
                        item?.options?.map((option: any) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))}
                    </item.component>
                  </Grid>
                ))}
              </Grid>
            </FormProvider>
          </Box>
        </>
      </CommonDrawer>
    </Box>
  );
};

const RecursiveAccordion = ({
  activeFolder,
  setActiveFolder,
  setActiveMenu,
  activeMenu,
  folders,
  setIsAddFolderDrawerOpen,
  personalConStatus,
  setSelectedRecords,
}: any) => {
  const theme = useTheme();
  return (
    <Box>
      {folders?.map((item: any) => (
        <Accordion key={item?._id} sx={{ margin: '0px !important' }}>
          <AccordionSummary
            expandIcon={
              item?.nestedFolders?.length > 0 ? (
                <ExpandMoreIcon />
              ) : (
                <ExpandMoreIcon sx={{ color: '#fff' }} />
              )
            }
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              flexDirection: 'row-reverse',
              justifyContent: 'flex-end',
              height: '40px !important',
              minHeight: '40px !important',
              margin: '0px !important',
              marginLeft: '-20px !important',
            }}
          >
            <Box sx={{ width: '100%' }}>
              <MenuItem
                sx={styles?.exposeMenuOnHover(activeFolder, item, theme)}
                onClick={() => {
                  setActiveFolder(item);
                  setSelectedRecords([]);
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    ':hover': {
                      fontWeight: '500',
                    },
                  }}
                >
                  <FolderBlackIcon /> {item?.name}
                </Box>
                <Box
                  className="menu-toggle"
                  style={{ opacity: '0' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <MenuDropdown
                    setIsAddFolderDrawerOpen={setIsAddFolderDrawerOpen}
                    setActiveMenu={setActiveMenu}
                    item={item}
                  />
                </Box>
              </MenuItem>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: '0px 0px 0px !important' }}>
            <Box
              sx={{
                padding: '0px 20px 0px !important',
                position: 'relative',
                '&::before': {
                  position: 'absolute',
                  content: '""',
                  background: theme?.palette?.custom?.light_lavender_gray,
                  width: '1px',
                  height: '100%',
                  zIndex: 1,
                  left: '9px',
                },
              }}
            >
              {item?.nestedFolders && item?.nestedFolders?.length > 0 && (
                <Box sx={{ ml: 1.5 }}>
                  <RecursiveAccordion
                    activeFolder={activeFolder}
                    setActiveFolder={setActiveFolder}
                    folders={item?.nestedFolders}
                    activeMenu={activeMenu}
                    setIsAddFolderDrawerOpen={setIsAddFolderDrawerOpen}
                    setActiveMenu={setActiveMenu}
                    personalConStatus={personalConStatus}
                    setSelectedRecords={setSelectedRecords}
                  />
                </Box>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export const RecursiveFolderAccordion = ({
  folders,
  setFolderToMove,
  folderToMove,
  selectedMenu,
}: any) => {
  const theme = useTheme();

  const isFolderOrNestedSelected = (folder: any) => {
    if (folder._id === selectedMenu?._id) return true;
    if (selectedMenu && folder.parentFolderId === selectedMenu._id) return true;
    return false;
  };

  return (
    <Box>
      {folders?.map((item: any) => {
        const isSelected = isFolderOrNestedSelected(item);
        return (
          <Accordion key={item?._id} sx={{ margin: '0px !important' }}>
            <AccordionSummary
              expandIcon={
                item?.nestedFolders?.length > 0 ? (
                  <ExpandMoreIcon />
                ) : (
                  <ExpandMoreIcon sx={{ color: '#fff' }} />
                )
              }
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                flexDirection: 'row-reverse',
                justifyContent: 'flex-end',
                height: '40px !important',
                minHeight: '40px !important',
                margin: '0px !important',
                marginLeft: '-20px !important',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  cursor: isSelected ? 'not-allowed !important' : 'pointer',
                }}
              >
                <MenuItem
                  sx={styles?.exposeFolderMenuOnHover(
                    folderToMove,
                    item,
                    theme,
                    isSelected,
                  )}
                  disabled={isSelected}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',

                      ':hover': {
                        fontWeight: '500',
                      },
                    }}
                    onClick={() => (isSelected ? null : setFolderToMove(item))}
                  >
                    <FolderBlackIcon
                      color={theme?.palette?.primary?.main}
                      size={22}
                    />{' '}
                    {item?.name}
                  </Box>
                </MenuItem>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0px 0px 0px !important' }}>
              <Box
                sx={{
                  padding: '0px 20px 0px !important',
                  position: 'relative',
                  '&::before': {
                    position: 'absolute',
                    content: '""',
                    background: theme?.palette?.custom?.light_lavender_gray,
                    width: '1px',
                    height: '100%',
                    zIndex: 1,
                    left: '9px',
                  },
                }}
              >
                {item?.nestedFolders && item?.nestedFolders?.length > 0 && (
                  <Box sx={{ ml: 1.5 }}>
                    <RecursiveFolderAccordion
                      folders={item?.nestedFolders}
                      setFolderToMove={setFolderToMove}
                      folderToMove={folderToMove}
                      selectedMenu={selectedMenu}
                    />
                  </Box>
                )}
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

const MenuDropdown = ({
  setIsAddFolderDrawerOpen,
  setActiveMenu,
  item,
}: any) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [searchValue, setSearchValue] = useState('');
  const [selectedMenu, setSelectedMenu] = useState<any>({});

  const [folderToMove, setFolderToMove] = useState<any>({});

  const { data: personalConData, isLoading: personalConIsLoading } =
    useGetCommonContractsPersonalFoldersListQuery({
      page: 1,
      limit: 10,
      ...(searchValue.length && { search: searchValue }),
      meta: true,
      nested: true,
    });

  const [isMoveToFolderDrawerOpen, setIsMoveToFolderDrawerOpen] =
    useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);

  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const methodsRename: any = useForm({
    resolver: yupResolver(renameFolderValidationSchema),
    defaultValues: {
      name: selectedMenu?.name,
    },
  });
  const { handleSubmit: handleSubmitRename, reset: resetRename } =
    methodsRename;

  const [
    updateCreateContractFolder,
    { isLoading: updateCreateContractFolderLoading },
  ] = useUpdateCreateContractFolderMutation();
  const [deleteContractFolder, { isLoading: deleteContractFolderLoading }] =
    useDeleteContractFolderMutation();

  const onSubmitRename = async (values: any) => {
    const payload = {
      name: values?.name,
    };
    try {
      await updateCreateContractFolder({
        payload,
        id: selectedMenu?._id,
      })?.unwrap();
      successSnackbar('Folder Renamed Successfully');
      setActiveMenu({});
      resetRename();
      setIsRenameModalOpen(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  useEffect(() => {
    if (selectedMenu?.name) {
      methodsRename.setValue('name', selectedMenu?.name);
    }
  }, [selectedMenu]);

  const handelMoveToFolder = async () => {
    const payload = {
      name: selectedMenu?.name,
      parentFolderId: folderToMove?._id,
    };
    try {
      await updateCreateContractFolder({
        payload,
        id: selectedMenu?._id,
      })?.unwrap();
      successSnackbar('Folder Moved Successfully');
      setActiveMenu({});
      resetRename();
      setIsMoveToFolderDrawerOpen(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handelDelete = async () => {
    try {
      await deleteContractFolder({
        id: [selectedMenu?._id],
      })?.unwrap();
      successSnackbar('Folder Deleted Successfully');
      setActiveMenu({});
      setIsDeleteModal(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return (
    <div>
      <Box sx={{ transform: 'rotate(90deg)' }}>
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ThreeDotsIcon color="black" />
        </IconButton>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {item?.level !== 1 && (
          <MenuItem
            onClick={() => {
              handleClose();
              setIsAddFolderDrawerOpen(true);
              setActiveMenu(item);
            }}
          >
            New Subfolder
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            setIsMoveToFolderDrawerOpen(true);
            handleClose();
            setSelectedMenu(item);
          }}
        >
          Move to a folder
        </MenuItem>
        <MenuItem
          onClick={() => {
            setIsRenameModalOpen(true);
            handleClose();
            setSelectedMenu(item);
            setActiveMenu(item);
          }}
        >
          Rename
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSelectedMenu(item);
            setIsDeleteModal(true);
            handleClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>

      {/* move to folder  */}
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
          <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>
            Main Folder
          </Typography>
          {personalConIsLoading ? (
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
                        selectedMenu={selectedMenu}
                      />
                    )}
                  </Box>
                </AccordionDetails>
              </Accordion>
            </>
          )}
        </>
      </CommonDrawer>

      {/* rename folder  */}
      <CommonModal
        open={isRenameModalOpen}
        handleClose={() => {
          resetRename();
          setIsRenameModalOpen(false);
        }}
        handleCancel={() => {
          resetRename();
          setIsRenameModalOpen(false);
        }}
        handleSubmit={handleSubmitRename(onSubmitRename)}
        title="Rename Folder"
        okText="Add"
        cancelText="Cancel"
        footer
        isLoading={updateCreateContractFolderLoading}
      >
        <FormProvider methods={methodsRename}>
          <Grid item xs={12}>
            <RHFTextField name="name" label="Rename" required={true} />
          </Grid>
        </FormProvider>
      </CommonModal>

      {/* delete modal  */}
      <AlertModals
        message="You're about to delete a record. Are you sure?"
        type="delete"
        open={isDeleteModal}
        handleClose={() => setIsDeleteModal(false)}
        handleSubmitBtn={handelDelete}
        loading={deleteContractFolderLoading}
      />
    </div>
  );
};
export default Contracts;
