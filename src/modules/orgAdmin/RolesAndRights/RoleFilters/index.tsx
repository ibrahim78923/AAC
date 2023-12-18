import { Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { rolesFiltersArray } from './RoleFilters.data';

import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';

import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

const RoleFilters = (props: any) => {
  const { isOpen, setIsOpen, filterVal, setFilterVal } = props;

  const methods: any = useForm();

  const { handleSubmit } = methods;
  const startedDate = 0;
  const endedDate = 1;
  const onSubmit = async (values: any) => {
    const { date } = values;
    const dateStart = date?.[startedDate]
      ? dayjs(date[startedDate])?.format(DATE_FORMAT?.API)
      : null;
    const dateEnd = date?.[endedDate]
      ? dayjs(date[endedDate])?.format(DATE_FORMAT?.API)
      : null;

    setFilterVal({
      ...filterVal,
      status: values?.status,
      productId: values?.product,
      dateStart: dateStart,
      dateEnd: dateEnd,
    });
    setIsOpen(false);
  };

  return (
    <CommonDrawer
      isDrawerOpen={isOpen}
      title="Filters"
      okText="Apply"
      submitHandler={handleSubmit(onSubmit)}
      onClose={() => {
        setIsOpen(false);
      }}
      isOk={true}
      footer
    >
      <FormProvider methods={methods}>
        <Grid container spacing={2}>
          {rolesFiltersArray()?.map((item: any) => (
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

export default RoleFilters;
