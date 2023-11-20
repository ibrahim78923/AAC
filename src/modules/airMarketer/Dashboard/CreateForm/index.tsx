import { Box, Grid, Typography } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider, RHFRadioGroup } from '@/components/ReactHookForm';

import CheckboxList from './ChexkBoxes';
import useCreateForm from './useCreateForm';
import {
  dataArrayCreateForm,
  defaultValues,
  optionViews,
  validationSchema,
} from './CreateForm.data';

import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';

const CreateForm = ({ isOpenDrawer, onClose }: any) => {
  const { isShowDashboardTemplate, setIsShowDashboardTemplate } =
    useCreateForm();
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });
  const { handleSubmit, watch, reset } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('Dashboard Created Successfully', {
      variant: 'success',
    });
    reset();
  };

  const watchFields = watch(['accessDashboard']);

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => onClose(false)}
      title={'Create Dashboard'}
      okText={'Next'}
      isOk
      footer
      isCancel={false}
      submitHandler={() => {
        setIsShowDashboardTemplate(true);
      }}
    >
      {!isShowDashboardTemplate ? (
        <Box mt={1}>
          <Typography>Marketing dashboard template</Typography>
          <Typography>
            Start with a dashboard of 9 reports that focus on your website
            performance. Also performance and contact activity.
          </Typography>
          <Typography>Who would find this dashboard helpful?</Typography>
          <Typography>Marketers</Typography>
          <Typography>Content Creators</Typography>
          <Typography>Blog Authors and Publishers</Typography>

          <Typography>Reports included in this dashboard:</Typography>
          <Typography>
            Use the checkbox to remove any reports you want.
          </Typography>
          <CheckboxList />
        </Box>
      ) : (
        <Box mt={1}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
              <Grid sm={12} lg={12}>
                {dataArrayCreateForm?.map((item: any) => (
                  <Grid
                    item
                    xs={12}
                    md={item?.md}
                    key={uuidv4()}
                    style={{ paddingTop: '10px' }}
                  >
                    {item?.componentProps?.name === 'accessDashboard' ? (
                      <Box>
                        <item.component {...item?.componentProps} size="small">
                          {item?.componentProps?.select &&
                            item?.options?.map((option: any) => (
                              <option value={option?.value} key={uuidv4()}>
                                {option?.label}
                              </option>
                            ))}
                        </item.component>

                        {watchFields[0] === 'Everyone' && (
                          <RHFRadioGroup
                            options={optionViews}
                            name="viewAndEdit"
                            label=""
                            row={false}
                          />
                        )}
                      </Box>
                    ) : (
                      <item.component {...item?.componentProps} size="small" />
                    )}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </FormProvider>
        </Box>
      )}
    </CommonDrawer>
  );
};
export default CreateForm;
