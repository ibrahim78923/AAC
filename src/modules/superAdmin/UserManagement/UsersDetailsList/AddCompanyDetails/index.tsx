import { Grid, Box, Typography, InputAdornment, Checkbox } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { dataArray } from './AddCompanyDetails.data';
import { styles } from './AddCompanyDetails.style';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import useToggle from '@/hooks/useToggle';
import useAddCompanyDetails from './useAddCompanyDetails';
import { AddCompanyDetailsProps } from '@/modules/superAdmin/UserManagement/UsersDetailsList/UsesDetailList-interface';
import Image from 'next/image';
import { AddPenIcon } from '@/assets/icons';
import { ProductListPropsI } from '@/modules/orgAdmin/Organization/OrganizationSubFolder/OrganizationTable/organizationTable.interface';
import { useGetDropdownProductsListQuery } from '@/services/common-APIs';
import { getProductIcon } from '@/modules/orgAdmin/SubscriptionAndInvoices/Subscriptions';

export default function AddCompanyDetails({
  isOpenDrawer,
  onClose,
  organizationId,
  setISOpenCompanyDrawer,
}: AddCompanyDetailsProps) {
  const [isToggled, setIsToggled] = useToggle(false);
  const { data: productsList } = useGetDropdownProductsListQuery({});

  const {
    theme,
    methods,
    handleSubmit,
    onSubmit,
    imagePreview,
    handleImageChangeCompany,
    loadingAddCompanyAccount,
    selectedProducts,
    setSelectedProducts,
  } = useAddCompanyDetails(organizationId, setISOpenCompanyDrawer, isToggled);

  const handleCheckboxChange = (event: any, productId: any) => {
    const isChecked = event?.target?.checked;
    if (isChecked) {
      setSelectedProducts((prev: any[]) => [...prev, productId]);
    } else {
      setSelectedProducts(
        (prev: any[]) => prev?.filter((id) => id !== productId),
      );
    }
  };

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => onClose(false)}
      title={'Add Company'}
      okText={'Apply'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit(onSubmit)}
      isLoading={loadingAddCompanyAccount}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={1}>
            <Grid item sm={12}>
              <Typography variant="h4">Company Logo</Typography>
              <center>
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
                    {imagePreview && (
                      <Image
                        src={imagePreview}
                        alt="selected"
                        width={120}
                        height={120}
                        style={{ borderRadius: '50%' }}
                      />
                    )}
                  </Box>
                  <input
                    hidden={true}
                    id="upload-group-image-one"
                    type="file"
                    accept="image/*"
                    onChange={(e: any) => handleImageChangeCompany(e)}
                  />
                  <label htmlFor="upload-group-image-one">
                    <Box
                      sx={{
                        position: 'absolute',
                        right: '165px',
                        bottom: 0,
                        cursor: 'pointer',
                      }}
                    >
                      <AddPenIcon />
                    </Box>
                  </label>
                </Box>
              </center>
            </Grid>
            <Grid item sm={12}>
              <Typography variant="h4">Products</Typography>
              <Box
                sx={{
                  display: 'flex',
                  columnGap: '1rem',
                  alignItems: 'center',
                  overflowX: 'auto',
                  marginBottom: '1rem',
                  mt: 1,
                }}
              >
                {productsList?.data?.map((product: ProductListPropsI) => (
                  <Box sx={styles?.productCard} key={product?._id}>
                    <Checkbox
                      name={product?._id}
                      checked={selectedProducts.includes(product?._id)}
                      onChange={(event) =>
                        handleCheckboxChange(event, product?._id)
                      }
                      sx={{
                        marginLeft: '7rem',
                      }}
                    />
                    <Box sx={styles?.productItem}>
                      <Box
                        sx={{
                          height: '55px',
                          background: theme?.palette?.primary?.light,
                          width: '55px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {getProductIcon(product?.name)}
                      </Box>

                      <Typography sx={{ whiteSpace: 'nowrap', mt: 1 }}>
                        {product?.name}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>
            {dataArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.name}>
                <Typography variant="body2" fontWeight={500}>
                  {item?.title}
                </Typography>
                <item.component
                  {...item.componentProps}
                  size={'small'}
                  disabled={
                    isToggled &&
                    item?.componentProps?.name === 'compositeAddress'
                      ? true
                      : false
                  }
                >
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
                {item?.componentProps?.name === 'compositeAddress' && (
                  <Box position="relative">
                    <InputAdornment
                      sx={{
                        position: 'absolute',
                        top: -95,
                        right: 20,
                        zIndex: 9999,
                      }}
                      position="end"
                    >
                      <BorderColorIcon
                        onClick={() => {
                          setIsToggled(true);
                        }}
                        sx={{ cursor: 'pointer', fontSize: '20px' }}
                      />
                    </InputAdornment>
                  </Box>
                )}
                {isToggled && (
                  <>
                    <Grid item container spacing={1} mt={1}>
                      {item?.componentProps?.name === 'compositeAddress' &&
                        item?.subData?.map((data: any) => (
                          <Grid item xs={12} md={item?.md} key={data?.name}>
                            <data.component
                              {...data.componentProps}
                              size={'small'}
                            >
                              {data?.componentProps?.select
                                ? data?.options?.map((option: any) => (
                                    <option
                                      key={option?.value}
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
                    {item?.componentProps?.name === 'compositeAddress' && (
                      <Typography
                        variant="body3"
                        sx={{ cursor: 'pointer' }}
                        color={theme?.palette?.primary?.main}
                        onClick={() => setIsToggled(false)}
                      >
                        Back to Summary view
                      </Typography>
                    )}
                  </>
                )}
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
}
