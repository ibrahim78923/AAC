import { Grid, Box, Typography, InputAdornment } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider, RHFMultiCheckbox } from '@/components/ReactHookForm';
import { dataArray } from './AddCompanyDetails.data';
import UploadLogo from './UploadLogo';
import { styles } from './AddCompanyDetails.style';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { EraserIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
import useToggle from '@/hooks/useToggle';
import useAddCompanyDetails from './useAddCompanyDetails';

export default function AddCompanyDetails({
  isOpenDrawer,
  onClose,
  organizationId,
  setISOpenCompanyDrawer,
}: any) {
  const {
    theme,
    productsList,
    methods,
    handleSubmit,
    onSubmit,
    companyImg,
    setCompanyImg,
  } = useAddCompanyDetails(organizationId, setISOpenCompanyDrawer);

  const [isToggled, setIsToggled] = useToggle(false);

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
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <Typography variant="body2" fontWeight={500}>
                  {item?.title}
                </Typography>
                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
                {item?.componentProps?.name === 'compositeAddress' && (
                  <Box position="relative">
                    <InputAdornment
                      sx={{
                        position: 'absolute',
                        top: -28,
                        right: 20,
                        zIndex: 9999,
                      }}
                      position="end"
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          gap: '10px',
                          alignItems: 'center',
                        }}
                      >
                        <Box
                          sx={{ cursor: 'pointer' }}
                          onClick={() => {
                            setIsToggled(false);
                          }}
                        >
                          <EraserIcon />
                        </Box>
                        <BorderColorIcon
                          onClick={() => {
                            setIsToggled(true);
                          }}
                          sx={{ cursor: 'pointer', fontSize: '20px' }}
                        />
                      </Box>
                    </InputAdornment>
                  </Box>
                )}
                {isToggled && (
                  <>
                    <Grid item container spacing={1} mt={1}>
                      {item?.componentProps?.name === 'compositeAddress' &&
                        item?.subData?.map((data: any) => (
                          <Grid item xs={12} md={item?.md} key={uuidv4()}>
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
