import { useForm } from 'react-hook-form';

import { Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import { CreateViewData, validationSchema } from './CreateView.data';

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
    defaultValues: 'EVERYONE',
  });
  const [createViewDeals] = useCreateViewDealsMutation();
  const { handleSubmit, watch } = methods;
  const dealPipelineId = watch('dealPipelineId');

  const onSubmit = (values: any) => {
    const paramsObj: any = {};
    if (values.dateStart)
      paramsObj['dateStart'] = dayjs(values?.dateStart)?.format(
        DATE_FORMAT?.API,
      );
    if (values.dateEnd)
      paramsObj['dateEnd'] = dayjs(values?.dateEnd)?.format(DATE_FORMAT?.API);
    if (values?.dealPipelineId)
      paramsObj['dealPiplineId'] = values?.dealPipelineId;
    if (values.dealOwnerId) paramsObj['dealOwnerId'] = values?.dealOwnerId;
    if (values.dealStageId) paramsObj['dealStageId'] = values?.dealStageId;

    const query = '?' + new URLSearchParams(paramsObj)?.toString();
    values.apiUrl = `${AIR_SALES?.DEAL_LIST_VIEW}${query}`;
    const obj = {
      name: values.name,
      apiUrl: values.apiUrl,
      sharedWith: values.sharedWith,
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

  // const onSubmit = async (values: any) => {
  //   console.log(values,'values');

  //   let apiUrl = AIR_SALES?.DEAL_LIST_VIEW;

  //   if (values?.CloseDate) {
  //     apiUrl += `?dateStart=${dayjs()?.format(DATE_FORMAT?.API)}&dateEnd=${dayjs(values.CloseDate)?.format(DATE_FORMAT?.API)}`;
  //   }

  //   if (values?.dealPipelineId) {
  //     apiUrl += `&dealPiplineId=${values?.dealPipelineId}`;
  //   }

  //   if (values?.dealOwnerId) {
  //     apiUrl += `&dealOwnerId=${values?.dealOwnerId}`;
  //   }

  //   if (values?.dealStageId) {
  //     apiUrl += `&dealStageId=${values?.dealStageId}`;
  //   }

  //   const obj = {
  //     name: values?.name,
  //     apiUrl,
  //     sharedWith: values?.sharedWith,
  //   };

  //   console.log(obj);

  //   try {
  //     await createViewDeals(obj)?.unwrap();
  //     enqueueSnackbar('View created successfully', {
  //       variant: 'success',
  //     });
  //   } catch (error) {
  //     enqueueSnackbar('Error while creating View', {
  //       variant: 'error',
  //     });
  //   }

  //   onClose();
  // };

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
