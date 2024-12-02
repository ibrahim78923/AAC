import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import {
  Box,
  Typography,
  InputBase,
  useTheme,
  IconButton,
  Dialog,
  Avatar,
  CircularProgress,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

import LinkDropdown from './LinkDropDown';
import AccountMenu from './AccountMenu';
import Search from '@/components/Search';
import NotificationDropdown from './NotificationDropDown';
import SocialIconsDropdown from './SocialIconsDropdown';
import ProfilMenu from './ProfileMenu';

import {
  debouncedSearch,
  getActiveProductSession,
  getSession,
  isNullOrEmpty,
} from '@/utils';

import { QuickLinkData } from '../Layout.data';

import { SearchSharedIcon } from '@/assets/icons';

import { styles } from './Header.style';

import { v4 as uuidv4 } from 'uuid';
import { generateImage } from '@/utils/avatarUtils';
import { ROLES } from '@/constants/strings';
import useAuth from '@/hooks/useAuth';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import {
  airOperationsTabsData,
  airSalesTabsData,
  airServicesTabsData,
  orgAdminTabsData,
  superAdminTabsData,
  subModulesSetting,
  subModulesAirOperationData,
} from './header.data';
import { useGetSuperAdminSearchQuery } from '@/services/commonFeatures/search';
import {
  AIR_SALES_DASHBOARD,
  GlobalSearchAirOperationModules,
  GlobalSearchAirSalesModules,
  GlobalSearchAirServicesModules,
  GlobalSearchOrgAdminModules,
  GlobalSearchSuperAdminModules,
  PRODUCT_LABELS,
  SUPER_ADMIN,
} from '@/constants';
import {
  AIR_SALES,
  ORG_ADMIN,
  SUPER_ADMIN_PLAN_MANAGEMENT,
} from '@/routesConstants/paths';
import {
  AIR_OPERATIONS,
  AIR_SERVICES,
  AIR_CUSTOMER_PORTAL,
} from '@/constants/routes';
import { Quick_Links_Routes } from '@/constants/index';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Header = (props: any) => {
  const { currentPermissions } = useAuth();

  const { handleDrawerToggle } = props;
  const theme = useTheme();
  const { user } = getSession();

  const [isExpanded, setIsExpanded] = useState(false);

  const [searchValue, SetSearchValue] = useState<string>('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [innerBoxesRendered, setInnerBoxesRendered] = useState(false);
  const [showTabs, setShowTabs] = useState(false);
  const [GlobalSearchValue, setGlobalSearchValue] = useState();
  const [Modules, setModules] = useState();
  // const [viewDetailId, setViewDetailId] = useState();
  const ActiveProduct = getActiveProductSession();

  const role = user?.role;

  const tabData: any =
    ActiveProduct?.name?.replace(/\s+/g, '_')?.toUpperCase() ===
    ROLES?.SUPER_ADMIN
      ? superAdminTabsData
      : ActiveProduct?.name?.replace(/\s+/g, '_')?.toUpperCase() ===
            ROLES?.ORG_ADMIN || isNullOrEmpty(ActiveProduct?.name)
        ? orgAdminTabsData
        : ActiveProduct?.name?.replace(/\s+/g, '_')?.toUpperCase() ===
            ROLES?.AIR_SALES
          ? airSalesTabsData
          : ActiveProduct?.name?.replace(/\s+/g, '_')?.toUpperCase() ===
              ROLES?.AIR_SERVICES
            ? airServicesTabsData
            : ActiveProduct?.name?.replace(/\s+/g, '_')?.toUpperCase() ===
                ROLES?.AIR_OPERATIONS
              ? airOperationsTabsData
              : [];

  const handleClickOpen = () => {
    setIsOpenModal(true);
  };

  const handleClose = () => {
    setIsOpenModal(false);
  };

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
    setShowTabs((prev) => !prev);
  };
  const params = {
    search: GlobalSearchValue ?? searchValue,
    productName: isNullOrEmpty(ActiveProduct?.name)
      ? ROLES?.ORG_ADMIN
      : ActiveProduct?.name?.replace(/\s+/g, '_')?.toUpperCase(),
    module:
      tabData[Modules] === 'All'
        ? ''
        : tabData[Modules]?.replace(/\s+/g, '_')?.toUpperCase(),
  };

  const {
    data: SuperAdminSearchList,
    isLoading: getSuperAdminSearchLoading,
    isFetching: getSuperAdminSearchFetching,
    isError: getSuperAdminSearchError,
  } = useGetSuperAdminSearchQuery(
    { params },
    {
      skip:
        (isNullOrEmpty(GlobalSearchValue) && isNullOrEmpty(searchValue)) ||
        ActiveProduct?.name === PRODUCT_LABELS?.AIR_MARKETER ||
        ActiveProduct?.name === PRODUCT_LABELS?.LOYALTY_PROGRAM,
    },
  );
  const handleChange = (e: any) => {
    debouncedSearch(e?.target?.value, setGlobalSearchValue);
  };

  const superAdminPath = {
    //super admin
    [GlobalSearchSuperAdminModules?.USER_MANAGEMENT]:
      SUPER_ADMIN?.USERMANAGMENT,
    [GlobalSearchSuperAdminModules?.PLAN_MANAGEMENT]:
      SUPER_ADMIN_PLAN_MANAGEMENT?.PLAN_MANAGEMENT_GRID,
    [GlobalSearchSuperAdminModules?.BILLING_INVOICES]:
      SUPER_ADMIN?.BILLING_INVOICES,
    [GlobalSearchSuperAdminModules?.REPORTS]: SUPER_ADMIN?.REPORTS,
    [GlobalSearchSuperAdminModules?.FAQs]: SUPER_ADMIN?.FAQS,
    [GlobalSearchSuperAdminModules?.ENQUIRIES]: SUPER_ADMIN?.ENQUIRIES,
    [GlobalSearchSuperAdminModules?.TAX_CALCULATION]:
      SUPER_ADMIN?.TAX_CALCULATION,
    [GlobalSearchSuperAdminModules?.QUICK_LINKS]: SUPER_ADMIN?.QUICK_LINK,
    [GlobalSearchSuperAdminModules?.NEWS_EVENTS]: SUPER_ADMIN?.NEWS_EVENTS,
    [GlobalSearchSuperAdminModules?.MODULE_CREATION]: SUPER_ADMIN?.PRODUCT_LIST,
    [GlobalSearchSuperAdminModules?.PRODUCT_FEATURES]:
      SUPER_ADMIN?.PRODUCT_FEATURES,
  };
  const orgAdminPath = {
    //org admin
    [GlobalSearchOrgAdminModules?.USERS]: ORG_ADMIN?.USERS,
    [GlobalSearchOrgAdminModules?.Organization]: ORG_ADMIN?.ORGANIZATION,
    [GlobalSearchOrgAdminModules?.Subscription_Invoice]:
      ORG_ADMIN?.Subscription_Invoices,
    [GlobalSearchOrgAdminModules?.Properties]: ORG_ADMIN?.Properties,
    [GlobalSearchOrgAdminModules?.Roles_Rights]: ORG_ADMIN?.ROLES_AND_RIGHTS,
    [GlobalSearchOrgAdminModules?.sales_product_categories]:
      ORG_ADMIN?.SALES_PRODUCT_CATEGORIES,
    [GlobalSearchOrgAdminModules?.Life_Cycle_stages]:
      ORG_ADMIN?.LIFE_CYCLE_STAGE,
    [GlobalSearchOrgAdminModules?.Contact_Status]: ORG_ADMIN?.CONTACT_STATUS,
    [GlobalSearchOrgAdminModules?.Receiver_Bank_Account]:
      ORG_ADMIN?.BANK_ACCOUNT,
    [GlobalSearchAirSalesModules?.CHATS]: Quick_Links_Routes?.CHAT,
    [GlobalSearchAirSalesModules?.CALLS]: Quick_Links_Routes?.CALLING,
    [GlobalSearchAirSalesModules?.DOCUMENTS]: Quick_Links_Routes?.DOCUMENT,
    [GlobalSearchAirSalesModules?.EMAILS]: Quick_Links_Routes?.EMAIL,
    [GlobalSearchAirSalesModules?.COMPANIES]: Quick_Links_Routes?.COMPANIES,
    [GlobalSearchAirSalesModules?.MEETINGS]: Quick_Links_Routes?.MEETINGS,
    [GlobalSearchAirSalesModules?.CONTACTS]: Quick_Links_Routes?.CONTACTS,
  };
  const airSalesPath = {
    //Air sales
    [GlobalSearchAirSalesModules?.Deals]: AIR_SALES?.DEAL,
    // [GlobalSearchAirSalesModules?.Deals]: `${AIR_SALES?.VIEW_DETAILS}?id=${viewDetailId}`,
    [GlobalSearchAirSalesModules?.Forecast]: AIR_SALES?.FORECAST,
    [GlobalSearchAirSalesModules?.Quotes]: AIR_SALES?.QUOTES,
    [GlobalSearchAirSalesModules?.Tasks]: AIR_SALES?.TASKS,
    [GlobalSearchAirSalesModules?.Invoices]: AIR_SALES?.SALES_INVOICES,
    [GlobalSearchAirSalesModules?.Reports]: AIR_SALES?.REPORTS,
    [GlobalSearchAirSalesModules?.Sales_Product]: AIR_SALES?.SETTINGS,
    [GlobalSearchAirSalesModules?.Deal_Pipelines]: AIR_SALES?.SETTINGS,
    [GlobalSearchAirSalesModules?.Roles_Rights]: AIR_SALES?.SETTINGS,
    [GlobalSearchAirSalesModules?.User_Management]: AIR_SALES?.SETTINGS,
    [GlobalSearchAirSalesModules?.Notifications]: AIR_SALES?.SETTINGS,
    [GlobalSearchAirSalesModules?.Setting_Forecast]: AIR_SALES?.SETTINGS,
    [GlobalSearchAirSalesModules?.CHATS]: Quick_Links_Routes?.CHAT,
    [GlobalSearchAirSalesModules?.CALLS]: Quick_Links_Routes?.CALLING,
    [GlobalSearchAirSalesModules?.DOCUMENTS]: Quick_Links_Routes?.DOCUMENT,
    [GlobalSearchAirSalesModules?.EMAILS]: Quick_Links_Routes?.EMAIL,
    [GlobalSearchAirSalesModules?.COMPANIES]: Quick_Links_Routes?.COMPANIES,
    [GlobalSearchAirSalesModules?.MEETINGS]: Quick_Links_Routes?.MEETINGS,
    [GlobalSearchAirSalesModules?.CONTACTS]: Quick_Links_Routes?.CONTACTS,
  };
  const airServicesPath = {
    // Air Services
    [GlobalSearchAirServicesModules?.Tickets]: AIR_SERVICES?.TICKETS,
    [GlobalSearchAirServicesModules?.Inventory]: AIR_SERVICES?.ASSETS_INVENTORY,
    [GlobalSearchAirServicesModules?.Software]: AIR_SERVICES?.ASSETS_SOFTWARE,
    [GlobalSearchAirServicesModules?.Contracts]: AIR_SERVICES?.ASSETS_CONTRACTS,
    [GlobalSearchAirServicesModules?.Purchase_Orders]:
      AIR_SERVICES?.PURCHASE_ORDER,
    [GlobalSearchAirServicesModules?.knowledge_base]:
      AIR_SERVICES?.KNOWLEDGE_BASE,
    [GlobalSearchAirServicesModules?.WorkLoad]: AIR_SERVICES?.WORKLOAD,
    [GlobalSearchAirServicesModules?.Feedback_Survey]:
      AIR_SERVICES?.FEEDBACK_SURVEY,
    [GlobalSearchAirServicesModules?.Reports]: AIR_SERVICES?.REPORTS,
    [GlobalSearchAirServicesModules?.Enquiries]: AIR_SERVICES?.ENQUIRIES,
    [GlobalSearchAirServicesModules?.Signup_Leads]: AIR_SERVICES?.SIGN_UP_LEADS,
    [GlobalSearchAirServicesModules?.Account_Settings]:
      AIR_SERVICES?.ACCOUNT_SETTINGS,
    [GlobalSearchAirServicesModules?.User_Management]:
      AIR_SERVICES?.USER_MANAGEMENT,
    [GlobalSearchAirServicesModules?.departments]:
      AIR_SERVICES?.DEPARTMENT_SETTINGS,
    [GlobalSearchAirServicesModules?.agents]: AIR_SERVICES?.AGENTS_SETTINGS,
    [GlobalSearchAirServicesModules?.AGENT_REQUESTERS]:
      AIR_SERVICES?.AGENTS_SETTINGS,
    [GlobalSearchAirServicesModules?.Requesters]:
      AIR_SERVICES?.REQUESTERS_SETTINGS,
    [GlobalSearchAirServicesModules?.Roles]: AIR_SERVICES?.USER_ROLES_SETTINGS,
    [GlobalSearchAirServicesModules?.Asset_Management]:
      AIR_SERVICES?.ASSET_MANAGEMENT_SETTINGS,
    [GlobalSearchAirServicesModules?.ASSET_TYPES]:
      AIR_SERVICES?.ASSET_TYPE_SETTINGS,
    [GlobalSearchAirServicesModules?.PRODUCT_CATALOGS]:
      AIR_SERVICES?.PRODUCT_CATALOG_SETTINGS,
    [GlobalSearchAirServicesModules?.VENDORS]: AIR_SERVICES?.VENDOR_SETTINGS,
    [GlobalSearchAirServicesModules?.Agent_Productivity]:
      AIR_SERVICES?.AGENT_PERFORMANCE_MANAGEMENT_SETTINGS,
    [GlobalSearchAirServicesModules?.CANNED_RESPONSES]:
      AIR_SERVICES?.CANNED_RESPONSE_SETTINGS,
    [GlobalSearchAirServicesModules?.WORKLOADS]:
      AIR_SERVICES?.WORKLOAD_MANAGEMENT_SETTINGS,
    [GlobalSearchAirServicesModules?.Service_Management]:
      AIR_SERVICES?.SERVICE_MANAGEMENT,
    [GlobalSearchAirServicesModules?.BUSINESS_HOURS]:
      AIR_SERVICES?.BUSINESS_HOURS_SETTINGS,
    [GlobalSearchAirServicesModules?.CATALOGS]:
      AIR_CUSTOMER_PORTAL?.CATALOG_SERVICES,
    [GlobalSearchAirServicesModules?.KNOWLEDGE_BASE]:
      AIR_CUSTOMER_PORTAL?.KNOWLEDGE_BASE,
    [GlobalSearchAirSalesModules?.CHATS]: Quick_Links_Routes?.CHAT,
    [GlobalSearchAirSalesModules?.CALLS]: Quick_Links_Routes?.CALLING,
    [GlobalSearchAirSalesModules?.DOCUMENTS]: Quick_Links_Routes?.DOCUMENT,
    [GlobalSearchAirSalesModules?.EMAILS]: Quick_Links_Routes?.EMAIL,
    [GlobalSearchAirSalesModules?.COMPANIES]: Quick_Links_Routes?.COMPANIES,
    [GlobalSearchAirSalesModules?.MEETINGS]: Quick_Links_Routes?.MEETINGS,
    [GlobalSearchAirSalesModules?.CONTACTS]: Quick_Links_Routes?.CONTACTS,
  };
  const airOperatonPath = {
    //Air Operations
    [GlobalSearchAirOperationModules?.Data_Management]:
      AIR_OPERATIONS?.DASHBOARD,
    [GlobalSearchAirOperationModules?.Workflow_Automation]:
      AIR_OPERATIONS?.WORKFLOW_AUTOMATION,
    [GlobalSearchAirOperationModules?.DEALS]: AIR_OPERATIONS?.SALES_WORKFLOW,
    [GlobalSearchAirOperationModules?.QUOTES]: AIR_OPERATIONS?.SALES_WORKFLOW,
    [GlobalSearchAirOperationModules?.TASKS]: AIR_OPERATIONS?.SALES_WORKFLOW,
    [GlobalSearchAirOperationModules?.Reports]: AIR_OPERATIONS?.REPORTS,
    [GlobalSearchAirOperationModules?.Roles_Right]:
      AIR_OPERATIONS?.ROLES_AND_RIGHTS,
    [GlobalSearchAirOperationModules?.User_Management]:
      AIR_OPERATIONS?.USER_MANAGEMENT,
    [GlobalSearchAirSalesModules?.CHATS]: Quick_Links_Routes?.CHAT,
    [GlobalSearchAirSalesModules?.CALLS]: Quick_Links_Routes?.CALLING,
    [GlobalSearchAirSalesModules?.DOCUMENTS]: Quick_Links_Routes?.DOCUMENT,
    [GlobalSearchAirSalesModules?.EMAILS]: Quick_Links_Routes?.EMAIL,
    [GlobalSearchAirSalesModules?.COMPANIES]: Quick_Links_Routes?.COMPANIES,
    [GlobalSearchAirSalesModules?.MEETINGS]: Quick_Links_Routes?.MEETINGS,
    [GlobalSearchAirSalesModules?.CONTACTS]: Quick_Links_Routes?.CONTACTS,
  };

  const findMainModules = (module: any, submodule: any) => {
    return ActiveProduct?.name?.replace(/\s+/g, '_')?.toUpperCase() ===
      ROLES?.SUPER_ADMIN
      ? superAdminPath[module] || SUPER_ADMIN?.DASHBOARD
      : ActiveProduct?.name?.replace(/\s+/g, '_')?.toUpperCase() ===
            ROLES?.ORG_ADMIN || isNullOrEmpty(ActiveProduct?.name)
        ? orgAdminPath[module] || ORG_ADMIN?.DASHBOARD
        : ActiveProduct?.name?.replace(/\s+/g, '_')?.toUpperCase() ===
            ROLES?.AIR_SALES
          ? airSalesPath[module] || AIR_SALES_DASHBOARD?.SINGLE_DASHBOARD
          : ActiveProduct?.name?.replace(/\s+/g, '_')?.toUpperCase() ===
              ROLES?.AIR_SERVICES
            ? (subModulesSetting?.includes(submodule)
                ? airServicesPath[submodule]
                : airServicesPath[module]) || AIR_SERVICES?.DASHBOARD
            : ActiveProduct?.name?.replace(/\s+/g, '_')?.toUpperCase() ===
                ROLES?.AIR_OPERATIONS
              ? (subModulesAirOperationData?.includes(submodule)
                  ? airOperatonPath[submodule]
                  : airOperatonPath[module]) || AIR_OPERATIONS?.DASHBOARD
              : [];
  };

  const searchRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef?.current?.contains(event?.target as Node)
    ) {
      setIsExpanded(false);
      setShowTabs(false);
    }
  };

  useEffect(() => {
    if (isExpanded || showTabs) {
      document?.addEventListener('mousedown', handleOutsideClick);
    } else {
      document?.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document?.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isExpanded, showTabs]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', mr: '8px' }}>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: { sm: 2, xs: 1.2 }, display: { md: 'none' }, padding: 0 }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            ref={searchRef}
            sx={{ display: { xs: 'none', lg: 'block' }, position: 'relative' }}
          >
            <Box
              component="form"
              sx={styles?.searchAnimation(isExpanded, theme)}
            >
              <InputBase
                fullWidth
                sx={{ ml: 1, display: !isExpanded && 'none' }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleChange}
              />
              <IconButton onClick={handleExpandClick}>
                {/* <Image src={SearchImage} alt="search" /> */}
                <SearchSharedIcon />
              </IconButton>
            </Box>
            {ActiveProduct?.name === PRODUCT_LABELS?.AIR_MARKETER ||
              ActiveProduct?.name === PRODUCT_LABELS?.LOYALTY_PROGRAM ||
              (showTabs && (
                <Box
                  sx={{
                    p: 1,
                    boxShadow: 3,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    position: 'absolute',
                    top: '53px',
                    width: '600px',
                  }}
                >
                  <HorizontalTabs
                    tabsDataArray={tabData}
                    setActiveTab={(selectedTab: string) =>
                      setModules(selectedTab)
                    }
                  >
                    {getSuperAdminSearchLoading ||
                    getSuperAdminSearchFetching ? (
                      <Box
                        sx={{ maxHeight: '70vh', height: '50vh' }}
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                      >
                        {' '}
                        <CircularProgress size="30px" />{' '}
                      </Box>
                    ) : (
                      tabData?.map((tab) => (
                        <Box
                          key={uuidv4()}
                          sx={{
                            maxHeight: '70vh',
                            height: '50vh',
                            overflow: 'scroll',
                          }}
                        >
                          <Typography
                            bgcolor={theme?.palette?.primary?.main}
                            fontWeight={'600'}
                            color={'white'}
                            p={1}
                            width={'fit-content'}
                            borderRadius={2}
                            mb={1}
                          >
                            {' '}
                            {tab}{' '}
                          </Typography>
                          {getSuperAdminSearchError ? (
                            <Typography
                              textAlign={'center'}
                              color={theme?.palette?.error?.main}
                            >
                              {' '}
                              Something went wrong{' '}
                            </Typography>
                          ) : (
                            SuperAdminSearchList?.data?.map((item: any) => {
                              const mainModulesLink: any = findMainModules(
                                item?.main_module,
                                item?.module,
                              );
                              return (
                                <Box key={uuidv4()}>
                                  <Typography
                                    variant="body2"
                                    p={1}
                                    mt={2}
                                    mb={0.5}
                                    borderRadius={1}
                                    fontWeight={600}
                                    display={'flex'}
                                    align="center"
                                    sx={{
                                      backgroundColor:
                                        theme?.palette?.grey[600],
                                      color: 'white',
                                    }}
                                  >
                                    {item?.main_module}{' '}
                                    <KeyboardArrowRightIcon /> {item?.module}
                                  </Typography>
                                  {item?.data?.map((data: any) => (
                                    <Box
                                      onClick={handleExpandClick}
                                      key={uuidv4()}
                                      sx={{
                                        width: 'fit-content',
                                        '&:hover': {
                                          backgroundColor:
                                            theme?.palette?.grey[700],
                                        },
                                      }}
                                    >
                                      {/* onClick={()=>{!isNullOrEmpty(mainModulesLink) && setViewDetailId(data?._id)}} */}
                                      <Link
                                        href={mainModulesLink}
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                        }}
                                      >
                                        {item?.main_module}{' '}
                                        <KeyboardArrowRightIcon />
                                        {data?.name ??
                                          data?.goalName ??
                                          data?.invoiceNo}
                                      </Link>
                                    </Box>
                                  ))}
                                  {isNullOrEmpty(item?.data) && (
                                    <Typography textAlign={'center'}>
                                      {' '}
                                      No Data Found{' '}
                                    </Typography>
                                  )}
                                </Box>
                              );
                            })
                          )}
                          {isNullOrEmpty(SuperAdminSearchList?.data) && (
                            <Typography textAlign={'center'}>
                              {' '}
                              No Data Found{' '}
                            </Typography>
                          )}
                        </Box>
                      ))
                    )}
                  </HorizontalTabs>
                </Box>
              ))}
          </Box>

          <Box sx={{ display: { md: 'block', lg: 'none' } }}>
            <Box
              component="form"
              sx={styles?.searchIcon(theme)}
              onClick={handleClickOpen}
            >
              <IconButton>
                <SearchSharedIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            gap: { sm: 2, xs: 1 },
            alignItems: 'center',
          }}
        >
          {role !== ROLES?.SUPER_ADMIN && currentPermissions && (
            <Box sx={styles?.quickLinkBox(theme, innerBoxesRendered)}>
              {!isNullOrEmpty(QuickLinkData) &&
                QuickLinkData?.map((image) => (
                  <PermissionsGuard
                    key={uuidv4()}
                    permissions={image?.permissions}
                  >
                    <Box
                      key={uuidv4()}
                      sx={styles?.innerQuickLinkBox(theme)}
                      onLoad={() => {
                        if (!innerBoxesRendered) {
                          setInnerBoxesRendered(true);
                        }
                      }}
                    >
                      <Link href={image?.path}>
                        <Image
                          src={image?.icon}
                          alt="logo"
                          width={18}
                          height={18}
                        />
                      </Link>
                    </Box>
                  </PermissionsGuard>
                ))}
            </Box>
          )}
          {role && <SocialIconsDropdown />}
          {role !== ROLES?.SUPER_ADMIN && role !== ROLES?.ORG_REQUESTER && (
            <AccountMenu />
          )}
          {role !== ROLES?.ORG_REQUESTER && <LinkDropdown />}

          <NotificationDropdown />

          {role === 'sales' && (
            <Typography
              variant="subtitle1"
              sx={{ color: theme?.palette?.primary?.main }}
            >
              Orcalo Limited
            </Typography>
          )}
          <Avatar
            src={generateImage(user?.avatar?.url)}
            sx={{
              width: 30,
              height: 30,
              bgcolor: 'primary.main',
              fontSize: 13,
            }}
          >
            {`${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`}
          </Avatar>
          <ProfilMenu />
        </Box>
      </Box>

      <Dialog
        open={isOpenModal}
        onClose={handleClose}
        maxWidth="md"
        sx={{
          '& .MuiDialog-paper': {
            // width: '300px',
            height: '300px',
            padding: '20px 20px',
            alignItems: 'center',
            overflow: 'scroll',
          },
        }}
      >
        <Box>
          <Search
            searchBy={searchValue}
            setSearchBy={SetSearchValue}
            label="Search By Name"
            width="260px"
          />
          <Box>
            {SuperAdminSearchList?.data?.map((item: any) => {
              const mainModulesLink: any = findMainModules(
                item?.main_module,
                item?.module,
              );
              return (
                <Box key={uuidv4()}>
                  <Typography
                    variant="body2"
                    p={1}
                    mt={2}
                    mb={0.5}
                    borderRadius={1}
                    fontWeight={600}
                    display={'flex'}
                    align="center"
                    sx={{
                      backgroundColor: theme?.palette?.grey[600],
                      color: 'white',
                    }}
                  >
                    {item?.main_module}
                  </Typography>
                  {item?.data?.map((data: any) => (
                    <Box
                      onClick={handleClose}
                      key={uuidv4()}
                      sx={{
                        width: 'fit-content',
                        '&:hover': {
                          backgroundColor: theme?.palette?.grey[700],
                        },
                      }}
                    >
                      <Link
                        href={mainModulesLink}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {data?.name ?? data?.goalName ?? data?.invoiceNo}
                      </Link>
                    </Box>
                  ))}
                  {isNullOrEmpty(item?.data) && (
                    <Typography textAlign={'center'}>
                      {' '}
                      No Data Found{' '}
                    </Typography>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default Header;
