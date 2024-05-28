import { Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import {
  rolesFilterDefaultValues,
  rolesFiltersArray,
} from './RoleFilters.data';

import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';

import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { filteredEmptyValues } from '@/utils/api';

const RoleFilters = (props: any) => {
  const { isOpen, setIsOpen, filterVal, setFilterValues } = props;

  const methods: any = useForm({
    defaultValues: rolesFilterDefaultValues(filterVal),
  });

  const { handleSubmit } = methods;

  const startedDate = 0;
  const endedDate = 1;

  const onSubmit = async (values: any) => {
    // Extract and format the date values separately
    const { date } = values;
    const dateStart = date?.[startedDate]
      ? dayjs(date[startedDate])?.format(DATE_FORMAT?.API)
      : null;
    const dateEnd = date?.[endedDate]
      ? dayjs(date[endedDate])?.format(DATE_FORMAT?.API)
      : null;

    const filteredValues = filteredEmptyValues?.(values);

    const finalValues = {
      ...filteredValues,
      dateStart,
      dateEnd,
    };

    setFilterValues(finalValues);
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
            <Grid item xs={12} md={item?.md} key={item?.componentProps?.name}>
              <item.component {...item?.componentProps} size={'small'}>
                {item?.componentProps?.select &&
                  item?.options?.map((option: any) => (
                    <option key={option?.value} value={option?.value}>
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
