import { Grid, Box, Alert, useTheme, Typography } from '@mui/material';
import {
  FormProvider,
  RHFRadioGroup,
  RHFSearchableSelect,
} from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { companiesOptions, dataArray } from './FormAddCompany.data';
import useFormAddContact from './useFormAddContact';
import { COMPANITES_TYPE } from '@/constants';

const FormAddCompany = ({ open, onClose }: any) => {
  const theme = useTheme();
  const {
    onSubmit,
    handleSubmit,
    methods,
    contacts,
    loadingCompnayPost,
    watchCompany,
    companyOptions,
    createAssociationLoading,
  } = useFormAddContact(onClose);

  return (
    <CommonDrawer
      submitHandler={handleSubmit(onSubmit)}
      title="Your Company Information"
      isLoading={loadingCompnayPost || createAssociationLoading}
      cancelBtnHandler={onClose}
      cancelText={'Cancel'}
      isDrawerOpen={open}
      onClose={onClose}
      okText="Add"
      footer
      isOk
    >
      <Box sx={{ pt: '27px' }}>
        <Alert
          severity="info"
          sx={{
            bgcolor: theme?.palette?.custom?.alice_blue,
            color: theme?.palette?.slateBlue['main'],
            fontSize: '14px',
            mb: '24px',
          }}
        >
          Changes you make here will only affect this quote. If you want to
          change your company info for future quotes, you can do that in your
          account&apos;s branding.
        </Alert>
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <RHFRadioGroup
                options={companiesOptions}
                name="companyType"
                label={false}
                defaultValue="new-Company"
              />
            </Grid>
            {watchCompany === COMPANITES_TYPE?.NEW_COMPANY ? (
              dataArray(contacts)?.map((item: any) => (
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={item?.componentProps?.name}
                >
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.componentProps?.select
                      ? item?.options?.map((option: any) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))
                      : null}
                  </item.component>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  fontWeight={500}
                  color={theme?.palette?.grey[600]}
                >
                  Choose Company
                  <span style={{ color: theme?.palette?.error?.main }}>*</span>
                </Typography>
                <RHFSearchableSelect
                  size="small"
                  name="chooseCompany"
                  options={companyOptions}
                />
              </Grid>
            )}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default FormAddCompany;
