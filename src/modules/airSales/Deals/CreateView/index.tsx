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
  const methods: any = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });
  const [createViewDeals] = useCreateViewDealsMutation();
  const { handleSubmit, watch } = methods;
  const dealPipelineId = watch('dealPipelineId');

  const onSubmit = (values: any) => {
    values.apiUrl = `${AIR_SALES?.DEAL_LIST_VIEW}?dateStart=${dayjs()?.format(
      DATE_FORMAT?.API,
    )}&dateEnd=${dayjs(values?.CloseDate)?.format(
      DATE_FORMAT?.API,
    )}&dealPiplineId=${values?.dealPiplineId}&dealOwnerId=${values?.dealOwnerId}&dealStageId=${values?.dealStageId}`;

    const obj = {
      name: values?.name,
      apiUrl: values?.apiUrl,
      sharedWith: values?.sharedWith,
    };

    try {
      createViewDeals({ body: obj })?.unwrap();
      enqueueSnackbar('View created successfully', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar('Error while creating View', {
        variant: 'error',
      });
    }
    onClose();
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
            {CreateViewData(dealPipelineId)?.map((item: any) => (
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
