import Link from 'next/link';
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
} from '@mui/material';

import { useTheme } from '@mui/material';

import { ProductSuiteCardData } from './ProductSuite.data';

import useAuth from '@/hooks/useAuth';

import { CompanyLogoIcon } from '@/assets/icons';
import { AvatarImage } from '@/assets/images';

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
import { getActivePermissionsSession } from '@/utils';
import { IMG_URL } from '@/config';

const ProductSuite = () => {
  const theme = useTheme();
  const { setActiveProduct, setPermissions, isPermissions } = useAuth();
  const router = useRouter();
  const { data: accountsData } = useGetAuthAccountsQuery({});
  const [PostAuthAccountSelect] = usePostAuthAccountSelectMutation();
  const [selectProduct, setSelectProduct] = useState('');

  const findModulePermissionKey = async (product: any, id: string) => {
    const payload = { account: id };
    try {
      const response = await PostAuthAccountSelect(payload)?.unwrap();
      if (response?.data) {
        setPermissions();
        setSelectProduct(product);
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
        const routes = getRoutes(selectProduct);
        if (routes) {
          for (const modulePermission of routes) {
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
        } else {
          enqueueSnackbar('No Permissions and Product Available', {
            variant: NOTISTACK_VARIANTS?.ERROR,
          });
        }
      };
      permissionsHandler();
    }
  }, [isPermissions, permissions]);

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
            src={AvatarImage?.src}
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
        {accountsData?.data?.map((product: any) => (
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
                      src={`${IMG_URL}${product?.logo?.url}`}
                      width={25}
                      height={25}
                      alt="product"
                    />
                  )}
                  {/* {`/${product.logo.url}`} */}
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
                          findModulePermissionKey(product?.name, account?._id);
                          setActiveProduct(product);
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

        {ProductSuiteCardData?.map((card: any) => (
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
                  {card?.icon && <card.icon />}
                  <Typography variant="h5" sx={{ marginLeft: '20px' }}>
                    {card?.title}
                  </Typography>
                </Box>

                <CardContent
                  sx={{
                    display: 'block',
                    padding: '0px',
                    color: theme?.palette?.custom?.main,
                  }}
                >
                  {card?.companyList?.map((company: any) => (
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
        ))}
      </Grid>
    </Box>
  );
};
export default ProductSuite;
