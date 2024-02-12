import { useForm } from 'react-hook-form';

import { Grid } from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { DATE_FORMAT } from '@/constants';

import { FilterData, defaultValues } from './DealFilterDrawer.data';

import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

const DealFilterDrawer = ({ open, onClose, handleApply }: any) => {
  const firstDate = 0;
  const lastDate = 1;
  const methods: any = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = (values: any) => {
    const obj = {
      ...values,
      dateStart: values?.date
        ? dayjs(values?.date[firstDate])?.format(DATE_FORMAT?.API)
        : null,
      dateEnd: values?.date
        ? dayjs(values?.date[lastDate])?.format(DATE_FORMAT?.API)
        : null,
    };
    delete obj?.date;
    handleApply(obj);
    onClose();
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
