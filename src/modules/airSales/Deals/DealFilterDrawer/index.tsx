import { useForm } from 'react-hook-form';

import { Grid } from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { DATE_FORMAT } from '@/constants';

import { FilterData, defaultValues } from './DealFilterDrawer.data';

import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

const DealFilterDrawer = ({
  open,
  onClose,
  setIsFilter,
  setFilterValues,
  filterValues,
}: any) => {
  const methods: any = useForm({
    defaultValues: defaultValues,
  });
  const startedDate = 0;
  const endedDate = 1;

  const { handleSubmit } = methods;

  const onSubmit = (values: any) => {
    const { date } = values;

    const dateStart = date?.[startedDate]
      ? dayjs(date[startedDate])?.format(DATE_FORMAT?.API)
      : null;
    const dateEnd = date?.[endedDate]
      ? dayjs(date[endedDate])?.format(DATE_FORMAT?.API)
      : null;
    setFilterValues({
      ...filterValues,
      dealPiplineId: values?.dealPiplineId,
      name: values?.name,
      dealOwnerId: values?.dealOwnerId,
      dealStageId: values?.dealStageId,
      dateStart: dateStart,
      dateEnd: dateEnd,
    });
    setIsFilter(false);
  };

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      footer
      isOk
      okText="Apply"
      title="Filter"
      submitHandler={handleSubmit(onSubmit)}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={2}>
          {FilterData()?.map((item: any) => (
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
  );
};

export default DealFilterDrawer;
