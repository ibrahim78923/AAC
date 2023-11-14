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

const ProductSuite = () => {
  const theme = useTheme();
  const { user } = useAuth();

  const { products }: any = user;

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
        {products.map((product) => (
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
                      src={`/${product.logo.url}`}
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
        ))}
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
