import Image from 'next/image';
import {
  Grid,
  Box,
  Typography,
  Skeleton,
  Button,
  InputAdornment,
  Avatar,
  Stack,
} from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { dataArray } from './OrganizationCard.data';
import {
  MessageGreyImage,
  PhoneImage,
  UserImage,
  EditImage,
} from '@/assets/images';
import { AddPenIcon, EditPenBorderedIcon } from '@/assets/icons';
import { styles } from './OrganizationCard.style';
import { v4 as uuidv4 } from 'uuid';
import useOrganizationCard from './useOrganizationCard';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ORG_ADMIN_ORGANIZATION_PERMISSIONS } from '@/constants/permission-keys';
import { getSession } from '@/utils';
import {
  useGetAllProductsQuery,
  useGetOrganizationProductsQuery,
} from '@/services/orgAdmin/organization';
import { getProductIcon } from '@/modules/orgAdmin/SubscriptionAndInvoices/Subscriptions';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { generateImage } from '@/utils/avatarUtils';

const OrganizationCard = () => {
  const {
    loadingUpdateOrganization,
    currentOrganizationLoading,
    currOrg,
    handleCloseDrawer,
    setIsOpenDrawer,
    handleChangeImg,
    loadingDetails,
    isOpenDrawer,
    handleSubmit,
    setIsToggled,
    addressVal,
    isToggled,
    onSubmit,
    methods,
    theme,
  } = useOrganizationCard();
  const { user }: { accessToken: string; refreshToken: string; user: any } =
    getSession();

  const { data: productsData, isLoading } = useGetAllProductsQuery({});
  const { data: orgProductsData } = useGetOrganizationProductsQuery({});

  const activeProducts = orgProductsData?.data?.length;
  const totalProducts = productsData?.data?.length || 0;
  const inActiveProducts = Math?.max(totalProducts - activeProducts, 0);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xl={6} xs={12}>
          {currentOrganizationLoading ? (
            <Skeleton variant="rectangular" height={195} />
          ) : (
            <Box
              sx={{
                border: `1px solid ${theme?.palette?.grey[700]}`,
                borderRadius: '8px',
                padding: '1.5rem',
                '@media (max-width:900px)': {
                  height: 'auto',
                },
              }}
            >
              <Stack
                direction={{ sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'center', sm: 'flex-start' }}
              >
                <Stack
                  direction={{ sm: 'row' }}
                  justifyContent="space-between"
                  alignItems={'center'}
                  gap={3}
                >
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      sx={{
                        border: `1px solid ${theme?.palette?.grey[700]}`,
                        borderRadius: '100px',
                        width: '120px',
                        height: '120px',
                        boxShadow: `0px 2px 4px -2px ${theme?.palette?.custom?.dark_shade_green}, 
                         5px 5px 9px -2px ${theme?.palette?.custom?.shade_grey}`,
                      }}
                    >
                      <Avatar
                        src={`${
                          currOrg?.avatar
                            ? generateImage(currOrg?.avatar?.url)
                            : ''
                        }`}
                        sx={{ height: 120, width: 120 }}
                      />
                      <input
                        hidden={true}
                        id="upload-group-image"
                        type="file"
                        accept="image/*"
                        onChange={(e: any) => handleChangeImg(e)}
                      />
                      <label htmlFor="upload-group-image">
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 2,
                            cursor: 'pointer',
                          }}
                        >
                          <AddPenIcon />
                        </Box>
                      </label>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'grid',
                      justifyItems: 'start',
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: '21vw',
                        '@media (max-width: 600px)': {
                          maxWidth: '60vw',
                        },
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 500,
                          color: `${theme?.palette?.custom?.main}`,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: '100%',
                        }}
                      >
                        {currOrg?.name}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        columnGap: '3px',
                        alignItems: 'center',
                        paddingTop: '1rem',
                      }}
                    >
                      <Image src={UserImage} alt="user" />
                      <Typography
                        variant="body3"
                        sx={{
                          fontWeight: 500,
                          lineHeight: '18px',
                          color: `${theme?.palette?.custom?.main}`,
                        }}
                      >
                        {currOrg?.owner?.firstName ?? '-'}&nbsp;
                        {currOrg?.owner?.lastName ?? '-'}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        columnGap: '3px',
                        alignItems: 'center',
                        paddingTop: '8px',
                      }}
                    >
                      <Image src={MessageGreyImage} alt="sms" />
                      <Typography
                        variant="body3"
                        sx={{
                          fontWeight: 500,
                          lineHeight: '18px',
                          color: `${theme?.palette?.custom?.main}`,
                        }}
                      >
                        {currOrg?.owner?.email ?? '-'}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        columnGap: '3px',
                        alignItems: 'center',
                        paddingTop: '8px',
                      }}
                    >
                      <Image src={PhoneImage} alt="phone" />
                      <Typography
                        variant="body3"
                        sx={{
                          fontWeight: 500,
                          lineHeight: '18px',
                          color: `${theme?.palette?.custom?.main}`,
                        }}
                      >
                        {currOrg?.owner?.phoneNumber ?? '-'}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
                <PermissionsGuard
                  permissions={[ORG_ADMIN_ORGANIZATION_PERMISSIONS?.EDIT_INFO]}
                >
                  <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Box
                      onClick={() => {
                        setIsOpenDrawer({
                          isToggled: true,
                          id: user?.organization?._id,
                        });
                      }}
                      sx={styles?.editSection}
                    >
                      <Button className="small" sx={{ gap: 1 }}>
                        <Image src={EditImage} alt="edit" />
                        Edit Info
                      </Button>
                    </Box>
                  </Box>
                </PermissionsGuard>
              </Stack>
            </Box>
          )}
        </Grid>
        <Grid item xl={6} xs={12}>
          <Box
            sx={{
              border: `1px solid ${theme?.palette?.grey[700]}`,
              borderRadius: '8px',
              padding: '1.5rem',
              '@media (max-width:900px)': {
                height: 'auto',
              },
            }}
          >
            <Grid container>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography sx={styles?.productTitle(theme)}>
                  Products&nbsp;
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: `${theme?.palette?.custom?.main}`,
                    }}
                  ></span>
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Box sx={styles?.statusSection}>
                  <Box sx={styles?.Active(theme)}>
                    Active&nbsp; (
                    <Typography
                      variant="body3"
                      sx={{
                        fontWeight: 700,
                        lineHeight: '18px',
                      }}
                    >
                      {activeProducts ?? '-'}
                    </Typography>
                    )
                  </Box>
                  <Box sx={styles?.inActive(theme)}>
                    Inactive&nbsp; (
                    <Typography
                      variant="body3"
                      sx={{
                        fontWeight: 700,
                        lineHeight: '18px',
                      }}
                    >
                      {inActiveProducts ?? '-'}
                    </Typography>
                    )
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid container sx={{ paddingTop: '5px' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '90%',
                  margin: '0 auto',
                  flexWrap: 'wrap',
                  gap: '20px',
                  '@media (max-width: 600px)': {
                    justifyContent: 'center',
                  },
                }}
              >
                {isLoading ? (
                  <>
                    {[1, 2, 3, 4, 5]?.map(() => (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '10px',
                        }}
                        key={uuidv4()}
                      >
                        <Skeleton variant="circular" width={60} height={60} />
                        <Skeleton
                          variant="rectangular"
                          width={110}
                          height={20}
                        />
                      </Box>
                    ))}
                  </>
                ) : (
                  <>
                    {productsData?.data?.map((item: any) => {
                      return (
                        <>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyItems: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Box
                              sx={{
                                backgroundColor: theme?.palette?.primary?.light,
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                filter: orgProductsData?.data?.some(
                                  (userProduct: any) =>
                                    userProduct?._id === item?._id,
                                )
                                  ? 'none'
                                  : 'grayscale(1) brightness(1.0) opacity(0.8)',
                              }}
                            >
                              {getProductIcon(item?.name)}
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{
                                color: `${item?.color}`,
                                fontWeight: 600,
                                lineHeight: '20PX',
                                paddingTop: '10px',
                              }}
                            >
                              {item?.name}
                            </Typography>
                          </Box>
                        </>
                      );
                    })}
                  </>
                )}
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {isOpenDrawer.isToggled && (
        <CommonDrawer
          isDrawerOpen={isOpenDrawer.isToggled}
          onClose={handleCloseDrawer}
          title="Edit Info"
          okText="Update"
          isOk={true}
          footer={true}
          submitHandler={handleSubmit(onSubmit)}
          isLoading={loadingUpdateOrganization}
        >
          <Box sx={{ paddingTop: '1rem' }}>
            <FormProvider methods={methods}>
              {loadingDetails ? (
                <SkeletonTable />
              ) : (
                <>
                  <Grid container spacing={1.5}>
                    {dataArray?.map((item: any) => (
                      <Grid item xs={12} md={item?.md} key={item?.name}>
                        {item?.componentProps?.name === 'compositeAddress' && (
                          <Box position="relative">
                            <InputAdornment
                              sx={{
                                position: 'absolute',
                                top: 53,
                                right: 20,
                                zIndex: 9999,
                              }}
                              position="end"
                            >
                              {addressVal?.length > 0 ? (
                                <Box
                                  sx={{
                                    cursor: 'not-allowed',
                                    fontSize: '20px',
                                    color: 'lightgrey',
                                  }}
                                >
                                  <EditPenBorderedIcon />
                                </Box>
                              ) : (
                                <Box
                                  onClick={() => {
                                    setIsToggled(true);
                                  }}
                                  sx={{ cursor: 'pointer', fontSize: '20px' }}
                                >
                                  <EditPenBorderedIcon />
                                </Box>
                              )}
                            </InputAdornment>
                          </Box>
                        )}
                        <item.component
                          {...item?.componentProps}
                          size={'small'}
                          disabled={
                            item?.componentProps?.name ===
                              'registrationNumber' ||
                            item?.componentProps?.name === 'email' ||
                            item?.componentProps?.name === 'name' ||
                            (isToggled &&
                              item?.componentProps?.name === 'compositeAddress')
                              ? true
                              : false
                          }
                        >
                          {item?.componentProps?.select &&
                            item?.options?.map((option: any) => (
                              <option key={uuidv4()} value={uuidv4()}>
                                {option?.label}
                              </option>
                            ))}
                        </item.component>
                        {isToggled && (
                          <Grid item container spacing={1.5}>
                            {item?.componentProps?.name ===
                              'compositeAddress' &&
                              item?.subData?.map((data: any) => (
                                <Grid
                                  item
                                  xs={12}
                                  md={item?.md}
                                  key={item?.name}
                                >
                                  <Typography variant="body2" fontWeight={500}>
                                    {data?.title}
                                  </Typography>
                                  <data.component
                                    {...data.componentProps}
                                    size={'small'}
                                  >
                                    {data?.componentProps?.select
                                      ? data?.options?.map((option: any) => (
                                          <option
                                            key={uuidv4()}
                                            value={option?.value}
                                          >
                                            {option?.label}
                                          </option>
                                        ))
                                      : null}
                                  </data.component>
                                </Grid>
                              ))}
                          </Grid>
                        )}
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </FormProvider>
          </Box>
        </CommonDrawer>
      )}
    </>
  );
};

export default OrganizationCard;
