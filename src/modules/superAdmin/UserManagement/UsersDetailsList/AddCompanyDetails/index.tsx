import { Grid, Box, Typography, InputAdornment, Card } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider, RHFMultiCheckbox } from '@/components/ReactHookForm';
import { dataArray } from './AddCompanyDetails.data';
import UploadLogo from './UploadLogo';
import { styles } from './AddCompanyDetails.style';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import useToggle from '@/hooks/useToggle';
import useAddCompanyDetails from './useAddCompanyDetails';
import Image from 'next/image';
import { IMG_URL } from '@/config';

export default function AddCompanyDetails({
  isOpenDrawer,
  onClose,
  organizationId,
  setISOpenCompanyDrawer,
  organizationBasesProducts,
}: any) {
  const [isToggled, setIsToggled] = useToggle(false);

  const { theme, methods, handleSubmit, onSubmit, companyImg, setCompanyImg } =
    useAddCompanyDetails(organizationId, setISOpenCompanyDrawer, isToggled);

  const productsList = organizationBasesProducts?.map((item: any) => ({
    value: item?._id,
    label: (
      <Card sx={styles?.productCard}>
        <Image
          src={`${IMG_URL}${item?.logo?.url}`}
          alt="sales-image"
          width={25}
          height={25}
        />
        <Typography>{item?.name}</Typography>
      </Card>
    ),
  }));

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
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={1}>
            <Grid item sm={12}>
              <Typography variant="h4">Company Logo</Typography>
              <Box>
                <UploadLogo
                  companyImg={companyImg}
                  setCompanyImg={setCompanyImg}
                />
              </Box>
            </Grid>
            <Grid item sm={12}>
              <Typography variant="h4">Products</Typography>
              <Box mt={2} sx={styles?.productItem}>
                <RHFMultiCheckbox name="products" options={productsList} />
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
