import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { v4 as uuidv4 } from 'uuid';
import { Grid } from '@mui/material';
import {
  forecastFilterArray,
  filterDefaultValues,
  filterValidationSchema,
} from './GoalsDrawer.data';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

const GoalsFilterDrawer = (props: any) => {
  const { isOpenDrawer, onClose, setIsFilterDrawer, setFilterValues } = props;

  const methods: any = useForm({
    resolver: yupResolver(filterValidationSchema),
    defaultValues: filterDefaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: any) => {
    const filter: any = {};
    if (values?.CloseDate) {
      filter.from = dayjs(values?.CloseDate[0])?.format(DATE_FORMAT?.API);
      filter.to = dayjs(values?.CloseDate[1])?.format(DATE_FORMAT?.API);
    }

    if (values?.pipelines) {
      filter.pipelines = values?.pipelines;
    }
    setFilterValues(filter);
    setIsFilterDrawer(false);
  };

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      title="Filters"
      okText="Apply"
      submitHandler={handleSubmit(onSubmit)}
      onClose={onClose}
      isOk={true}
      isCancel={false}
      footer
    >
      <FormProvider methods={methods}>
        <Grid container spacing={1}>
          {forecastFilterArray()?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              <item.component {...item.componentProps} size={'small'}>
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

export default GoalsFilterDrawer;
