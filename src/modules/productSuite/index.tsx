import Image from 'next/image';

import {
  Card,
  CardContent,
  Grid,
  CardActionArea,
  Box,
  Typography,
  CircularProgress,
  Button,
} from '@mui/material';

import { useTheme } from '@mui/material';

import { CompanyLogoIcon } from '@/assets/icons';
// import { AvatarImage } from '@/assets/images';

import { v4 as uuidv4 } from 'uuid';
import { getRoutes } from '@/layout/Layout.data';
import { useRouter } from 'next/router';
import {
  useGetAuthAccountsQuery,
  usePostAuthAccountSelectMutation,
} from '@/services/auth';
import { NOTISTACK_VARIANTS, ROLES } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import {
  getActivePermissionsSession,
  setAccountsData,
  setActiveAccountSession,
} from '@/utils';
// import { IMG_URL } from '@/config';
import useAuth from '@/hooks/useAuth';
import { generateImage } from '@/utils/avatarUtils';
import { AUTH, ERROR_PAGES, ORG_ADMIN } from '@/constants';
import { useGetActiveProductsQuery } from '@/services/common-APIs';
import { LogoutImage } from '@/assets/images';
// import { generateImage } from '@/utils/avatarUtils';

const ProductSuite = () => {
  const theme = useTheme();
  const {
    setActiveProduct,
    setPermissions,
    isPermissions,
    authMeLoadingState,
    user,
  } = useAuth();
  const router = useRouter();
  const {
    data: accountsData,
    refetch,
    isFetching: postAuthAccountSelectFetching,
  } = useGetAuthAccountsQuery({});
  const [PostAuthAccountSelect, { isLoading }] =
    usePostAuthAccountSelectMutation();
  const [selectedProduct, setSelectedProduct] = useState<any>([]);

  const [loading, setLoading] = useState(false);

  const findModulePermissionKey = async (product: any, id: string) => {
    const payload = { account: id };
    try {
      setLoading(true);
      const response = await PostAuthAccountSelect(payload)?.unwrap();
      const routes = getRoutes(product);

      if (response?.data && routes) {
        setPermissions();
        setSelectedProduct(routes);
      } else {
        enqueueSnackbar('No Permissions and Product Available', {
          variant: NOTISTACK_VARIANTS?.ERROR,
        });
      }
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    } finally {
      setLoading(false);
    }
    return false;
  };

  const permissions = getActivePermissionsSession();

  useEffect(() => {
    if (isPermissions && permissions?.length > 0) {
      const permissionsHandler = () => {
        for (const modulePermission of selectedProduct) {
          const componentPermissionsDictionary: any = {};
          modulePermission?.permissions?.forEach((value: any) => {
            componentPermissionsDictionary[value] = true;
          });
          for (const permission of permissions) {
            if (componentPermissionsDictionary[permission]) {
              setLoading(false);
              return router?.push(modulePermission?.key);
            }
          }
        }
      };
      permissionsHandler();
    }
  }, [isPermissions, permissions]);

  useEffect(() => {
    refetch();
  }, []);

  if (accountsData?.data) {
    setAccountsData(accountsData);
  }

  useEffect(() => {
    if (user?.role === ROLES?.ORG_ADMIN) {
      if (accountsData?.data?.length === 0) {
        router.push(ORG_ADMIN?.DASHBOARD);
      }
    }
    if (user?.role !== ROLES?.ORG_ADMIN) {
      if (accountsData?.data?.length === 0) {
        router.push(ERROR_PAGES?.NOT_ACCESS);
      }
    }
  }, [accountsData?.data]);

  // show all products
  const { data: productList } = useGetActiveProductsQuery({});
  const accountsDataMap = new Map(
    accountsData?.data?.map((account: any) => [account?._id, account]),
  );
  let updatedProductList = productList?.data?.map((product: any) =>
    accountsDataMap?.has(product?._id)
      ? accountsDataMap?.get(product?._id)
      : product,
  );
  updatedProductList = updatedProductList?.sort((a: any, b: any) => {
    if (a?.accounts && !b?.accounts) return -1;
    if (!a?.accounts && b?.accounts) return 1;
    return 0;
  });

  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push(AUTH?.LOGIN);
  };

  return (
    <Box
      sx={{
        py: '30px',
        backgroundColor: 'white',
        height: '100vh',
        '@media screen and (max-width: 1200px)': {
          height: 'fit-content',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 20px',
          flexWrap: 'wrap',
        }}
      >
        <Box>
          <CompanyLogoIcon />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '18px',
          }}
        >
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleLogout}
            startIcon={
              <Image
                src={LogoutImage}
                alt={'LogoutImage'}
                style={{
                  opacity: '0.4',
                }}
              />
            }
          >
            Logout
          </Button>

          {user?.role === ROLES?.ORG_ADMIN && (
            <>
              {accountsData?.data?.length > 0 && (
                <Button
                  variant="contained"
                  onClick={() => {
                    router.push(ORG_ADMIN?.DASHBOARD);
                  }}
                >
                  Organization Admin portal
                </Button>
              )}
            </>
          )}
        </Box>
      </Box>

      <Box sx={{ padding: '40px 0' }}>
        <Typography variant="h1" sx={{ textAlign: 'center' }}>
          Select Company Accounts
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          Let’s Proceed!
        </Typography>
      </Box>
      <Grid
        container
        spacing={3}
        sx={{
          paddingX: '150px',
          paddingTop: '50px',
          '@media screen and (max-width:900px)': {
            paddingX: '20px',
            paddingTop: '30px',
          },
          '@media screen and (max-width: 600px)': {
            paddingX: '20px',
            paddingTop: '30px',
          },
        }}
      >
        {loading ||
        authMeLoadingState ||
        isLoading ||
        postAuthAccountSelectFetching ? (
          <Box
            sx={{ marginTop: '200px', width: '100%' }}
            display={'flex'}
            justifyContent={'center'}
            alignContent={'center'}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {updatedProductList?.map((product: any) => (
              <Grid item xs={12} sm={6} md={6} lg={3} key={uuidv4()}>
                <Card
                  sx={{
                    boxShadow: 'rgb(147 147 147 / 20%) 0px 6px 19px',
                    borderRadius: '12px',
                    backgroundColor: !product?.accounts
                      ? theme?.palette?.grey[200]
                      : 'inherit',
                    color: !product?.accounts
                      ? theme?.palette?.grey[500]
                      : 'inherit',
                    pointerEvents: !product?.accounts ? 'none' : 'auto',
                    '&:hover': {
                      transition: '0.3s',
                      outline: `1.5px solid ${theme?.palette?.primary?.main}`,
                      boxShadow: 'none',
                    },
                    height: '270px',
                  }}
                >
                  <CardActionArea
                    disableRipple
                    sx={{
                      display: 'flex',
                      color: theme?.palette?.custom?.charcoal_gray,
                      p: 3,
                      pt: 4,
                      justifyContent: 'center',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      width: '100%',
                      cursor: 'unset',
                      '&:hover': {
                        '.MuiCardActionArea-focusHighlight': {
                          opacity: '0',
                        },
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {product?.logo && (
                        <Image
                          src={generateImage(product?.logo?.url)}
                          width={48}
                          height={48}
                          alt="product"
                        />
                      )}
                      <Typography variant="h5" sx={{ marginLeft: '20px' }}>
                        {product?.name}
                      </Typography>
                    </Box>

                    <CardContent
                      sx={{
                        color: theme?.palette?.custom?.main,
                        p: 0,
                        width: '100%',
                        display: 'block',
                        cursor: 'pointer',
                        maxHeight: '200px',
                        overflowY: 'scroll',
                        scrollbarWidth: 'none',
                      }}
                    >
                      {product?.accounts?.map((account: any) => (
                        <Box
                          key={uuidv4()}
                          sx={{
                            width: '100%',
                            padding: '10px 0px 10px 5px',
                            '&:hover': {
                              color: theme?.palette?.common?.black,
                              backgroundColor: theme?.palette?.primary?.light,
                              borderRadius: '10px',
                            },
                          }}
                          onClick={() => {
                            findModulePermissionKey(
                              product?.name,
                              account?._id,
                            );
                            setActiveProduct(product);
                            setActiveAccountSession(account);
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="inherit"
                            fontWeight={600}
                            sx={{
                              marginLeft: '20px',
                              position: 'relative',
                              textTransform: 'capitalize',
                              '&::before': {
                                content: '""',
                                position: 'absolute',
                                background: theme?.palette?.grey[500],
                                width: '8px',
                                height: '8px',
                                left: '-15px',
                                top: '8px',
                                borderRadius: '50%',
                                '&:hover': {
                                  backgroundColor:
                                    theme?.palette?.common?.black,
                                },
                              },
                            }}
                          >
                            {account?.company?.accountName}
                          </Typography>
                        </Box>
                      ))}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </Box>
  );
};
export default ProductSuite;
