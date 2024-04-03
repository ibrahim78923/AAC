import Image from 'next/image';

import {
  Card,
  CardContent,
  Grid,
  CardActionArea,
  Box,
  Typography,
  Button,
  Avatar,
  CircularProgress,
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
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { getActivePermissionsSession, setActiveAccountSession } from '@/utils';
// import { IMG_URL } from '@/config';
import useAuth from '@/hooks/useAuth';
import { generateImage } from '@/utils/avatarUtils';

const ProductSuite = () => {
  const theme = useTheme();
  const {
    setActiveProduct,
    setPermissions,
    isPermissions,
    authMeLoadingState,
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

  const findModulePermissionKey = async (product: any, id: string) => {
    const payload = { account: id };
    try {
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
    } catch (error) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
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
              return router?.push(modulePermission?.key);
              // Return the module permission path
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
        <Box sx={{ display: 'flex' }}>
          <Button size="small" variant="contained">
            Organization Admin Portal
          </Button>
          <Avatar
            alt="Remy Sharp"
            // src={AvatarImage?.src}
            src={''}
            sx={{ marginLeft: '20px' }}
          ></Avatar>
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
        spacing={2}
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
        {authMeLoadingState || isLoading || postAuthAccountSelectFetching ? (
          <Box
            sx={{ marginTop: '200px', width: '100%' }}
            display={'flex'}
            justifyContent={'center'}
            alignContent={'center'}
          >
            <CircularProgress />
          </Box>
        ) : (
          accountsData?.data?.map((product: any) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={uuidv4()}>
              <Card
                className="card-hover-color cursor-pointer"
                sx={{
                  boxShadow: 'none',
                  borderRadius: '6px',
                  '&:hover': {
                    transition: '0.3s',
                    outline: `1.5px solid ${theme?.palette?.primary?.main}`,
                    boxShadow: '0px 1px 1px -1px',
                  },
                  height: '270px',
                }}
              >
                <CardActionArea
                  disableRipple
                  sx={{
                    display: 'flex',
                    color: theme?.palette?.custom?.charcoal_gray,
                    pt: 4,
                    justifyContent: 'center',
                    flexDirection: 'column',
                    '&:hover': {
                      '.MuiCardActionArea-focusHighlight': {
                        opacity: '0',
                      },
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {product?.logo && (
                      <Image
                        src={generateImage(product?.logo?.url)}
                        width={25}
                        height={25}
                        alt="product"
                      />
                    )}
                    <Typography variant="h5" sx={{ marginLeft: '20px' }}>
                      {product?.name}
                    </Typography>
                  </Box>

                  <CardContent
                    sx={{
                      display: 'block',
                      padding: '0px',
                      color: theme?.palette?.custom?.main,
                    }}
                  >
                    {product?.accounts?.map((account: any) => (
                      <Box
                        sx={{
                          marginTop: '15px',
                        }}
                        key={uuidv4()}
                      >
                        <Typography
                          variant="body2"
                          color="inherit"
                          onClick={() => {
                            findModulePermissionKey(
                              product?.name,
                              account?._id,
                            );
                            setActiveProduct(product);
                            setActiveAccountSession(account);
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
          ))
        )}
        {/* 
        {products?.map((product: any) => (
          <Grid item xs={12} sm={6} md={6} lg={3} key={uuidv4()}>
            <Card
              className="card-hover-color cursor-pointer"
              sx={{
                boxShadow: 'none',
                borderRadius: '6px',
                '&:hover': {
                  transition: '0.3s',
                  outline: `1.5px solid ${theme?.palette?.primary?.main}`,
                  boxShadow: '0px 1px 1px -1px',
                },
                height: '270px',
              }}
            >
              <CardActionArea
                disableRipple
                sx={{
                  display: 'flex',
                  color: '#212121',
                  pt: 4,
                  justifyContent: 'center',
                  flexDirection: 'column',
                  '&:hover': {
                    '.MuiCardActionArea-focusHighlight': {
                      opacity: '0',
                    },
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {product?.logo && (
                    <Image
                      src={`/${product?.logo?.url}`}
                      width={25}
                      height={25}
                      alt="product"
                    />
                  )}
                 
                  <Typography variant="h5" sx={{ marginLeft: '20px' }}>
                    {product?.name}
                  </Typography>
                </Box>

                <CardContent
                  sx={{
                    display: 'block',
                    padding: '0px',
                    color: theme?.palette?.custom?.main,
                  }}
                >


                  <Box
                    sx={{
                      marginTop: '15px'
                    }}
                    key={uuidv4()}
                  >
                    <Typography variant='body2' color='inherit' onClick={() => { findModulePermissionKey(permissions, modulePermissions); setActiveProduct(product) }} >

                      Orcalo Holding
                    </Typography>
                  </Box>

                  {product?.companyList?.map((company: any) => (
                    <Box
                      sx={{
                        marginTop: '15px',
                        fontSize: '15px',
                        color: '#6B7280',
                      }}
                      key={uuidv4()}
                    >
                      <Link href={company?.path}>{company?.name}</Link>
                    </Box>
                  ))}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))} */}
      </Grid>
    </Box>
  );
};
export default ProductSuite;
