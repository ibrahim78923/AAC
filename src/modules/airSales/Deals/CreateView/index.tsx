import { useForm } from 'react-hook-form';

import { Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import {
  CreateViewData,
  defaultValues,
  validationSchema,
} from './CreateView.data';

import { FormProvider } from '@/components/ReactHookForm';
import { useCreateViewDealsMutation } from '@/services/airSales/deals';

import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { AIR_SALES } from '@/routesConstants/paths';
import { DATE_FORMAT } from '@/constants';

const CreateView = ({ open, onClose }: any) => {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });
  const [createViewDeals] = useCreateViewDealsMutation();
  const { handleSubmit } = methods;

  const onSubmit = (values: any) => {
    // values.sharedWith;
    values.apiUrl = `${AIR_SALES?.DEAL_LIST_VIEW}?dateStart=${dayjs()?.format(
      DATE_FORMAT?.API,
    )}&dateEnd=${dayjs(values?.CloseDate)?.format(DATE_FORMAT?.API)}`;
    const obj = {
      name: values?.name,
      apiUrl: values?.apiUrl,
      sharedWith: values?.sharedWith,
    };
    try {
      createViewDeals({ body: obj })?.unwrap();
      enqueueSnackbar('Deal created successfully', {
        variant: 'success',
      });
      onClose();
    } catch (error) {
      enqueueSnackbar('Error while creating deal', {
        variant: 'error',
      });
    }
  };
  return (
    <>
      <CommonDrawer
        isDrawerOpen={open}
        onClose={onClose}
        isOk
        submitHandler={handleSubmit(onSubmit)}
        okText="Save"
        cancelText="Cancel"
        title="Create View"
        footer
      >
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {CreateViewData()?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item?.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </CommonDrawer>
    </>
  );
};

export default CreateView;
