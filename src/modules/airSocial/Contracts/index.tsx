import React, { useState } from 'react';
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
  contractsSideBarData,
  renameFolderDefaultValues,
  renameFolderValidationSchema,
  tabData,
} from './contracts.data';
import { v4 as uuidv4 } from 'uuid';
import CommonModal from '@/components/CommonModal';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CONTRACTS_STATUS } from '@/constants';
import { styles } from './contracts.style';
import Actions from './Actions';
import CommonDrawer from '@/components/CommonDrawer';
import { AlertModals } from '@/components/AlertModals';
import { useRouter } from 'next/router';
import { AIR_SOCIAL_CONTRACTS } from '@/constants/routes';

const Contracts = () => {
  const router = useRouter();
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

  const theme = useTheme();

  const [searchValue, setSearchValue] = useState('');

  const methods: any = useForm({
    resolver: yupResolver(addNewFolderValidationSchema),
    defaultValues: addNewFolderDefaultValues,
  });
  const { handleSubmit, reset } = methods;
  const onSubmit = () => {};

  const [value, setValue] = useState(CONTRACTS_STATUS?.ALL);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  //Filters
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const methodsFilter: any = useForm({
    resolver: yupResolver(contractsFiltersValidationSchema),
    defaultValues: contractsFiltersDefaultValues,
  });
  const { handleSubmit: handleSubmitFilter } = methodsFilter;
  const onSubmitFilter = () => {};

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

            {contractsSideBarData?.map((item: any) => (
              <Accordion
                defaultExpanded
                key={uuidv4()}
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
                  {item?.title}
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    {item?.subfolders?.map((subfolder: any) => (
                      <Accordion
                        key={uuidv4()}
                        sx={{
                          margin: '0px !important',
                        }}
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
                              justifyContent: 'space-between',
                            }}
                          >
                            <Box sx={{ ml: 1 }}>{subfolder?.title}</Box>
                            <Box>
                              <IconButton
                                onClick={() => setIsAddFolderDrawerOpen(true)}
                              >
                                <PlusRoundedIcon />
                              </IconButton>
                            </Box>
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box>
                            {subfolder?.subfolders?.map((subfolder: any) => (
                              <MenuItem
                                key={uuidv4()}
                                sx={styles.exposeMenuOnHover}
                              >
                                {' '}
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                  }}
                                >
                                  <FolderBlackIcon /> {subfolder?.title}
                                </Box>
                                <Box
                                  className="menu-toggle"
                                  style={{ opacity: '0' }}
                                >
                                  <MenuDropdown
                                    setIsAddFolderDrawerOpen={
                                      setIsAddFolderDrawerOpen
                                    }
                                  />
                                </Box>
                              </MenuItem>
                            ))}
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
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
                Simplifying document management with smart organization,
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
                    router?.push(AIR_SOCIAL_CONTRACTS?.CONTRACTS_TEMPLATES);
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
                <MenuItem onClick={handleClose}>
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
                value={value}
                onChange={handleChange}
                allowScrollButtonsMobile
                orientation="horizontal"
                variant="scrollable"
              >
                {tabData?.map((tab) => (
                  <Tab
                    key={tab?.value}
                    sx={styles?.tabsStyle?.(theme)}
                    label={tab?.label}
                    value={tab.value}
                  />
                ))}
              </Tabs>
            </Box>

            <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Actions />

              <Tooltip title={'Refresh Filter'}>
                <Button
                  className="small"
                  variant="outlined"
                  color="inherit"
                  sx={{
                    width: { xs: '100%', sm: 'auto', md: 'auto', lg: 'auto' },
                  }}
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

          <ContractsGrid />
        </Grid>
      </Grid>

      <CommonModal
        open={isAddFolderDrawerOpen}
        handleClose={() => {
          reset();
          setIsAddFolderDrawerOpen(false);
        }}
        handleCancel={() => {
          reset();
          setIsAddFolderDrawerOpen(false);
        }}
        handleSubmit={handleSubmit(onSubmit)}
        title="Add New Folder"
        okText="Add"
        cancelText="Cancel"
        footer
      >
        <FormProvider methods={methods}>
          <Grid item xs={12}>
            <RHFTextField name="name" label="Folder Name" required={true} />
          </Grid>
        </FormProvider>
      </CommonModal>

      <CommonDrawer
        footer
        isDrawerOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        title="Filter"
        okText="Apply"
        cancelText="cancel"
        submitHandler={handleSubmitFilter(onSubmitFilter)}
        isOk
      >
        <>
          <Box mt={1}>
            <FormProvider methods={methodsFilter}>
              <Grid container spacing={2}>
                {contractsFilterData()?.map((item: any) => (
                  <Grid item xs={12} md={item?.md} key={item?.id}>
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

const MenuDropdown = ({ setIsAddFolderDrawerOpen }: any) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [searchValue, setSearchValue] = useState('');

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
    defaultValues: renameFolderDefaultValues,
  });
  const { handleSubmit: handleSubmitRename, reset: resetRename } =
    methodsRename;
  const onSubmitRename = () => {};

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
        <MenuItem
          onClick={() => {
            setIsAddFolderDrawerOpen(true);
            handleClose;
          }}
        >
          New Subfolder
        </MenuItem>
        <MenuItem
          onClick={() => {
            setIsMoveToFolderDrawerOpen(true);
            handleClose();
          }}
        >
          Move to a folder
        </MenuItem>
        <MenuItem
          onClick={() => {
            setIsRenameModalOpen(true);
            handleClose();
          }}
        >
          Rename
        </MenuItem>
        <MenuItem
          onClick={() => {
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
        handleSubmitBtn={() => setIsDeleteModal(false)}
        // loading={loading}
      />
    </div>
  );
};

export default Contracts;
