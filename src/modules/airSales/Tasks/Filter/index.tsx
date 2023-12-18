// import React, { useState } from 'react';
import { Typography, MenuItem, Box } from '@mui/material';
import DrawerComp from '../Drawer';
import { FilterIcon } from '@/assets/icons';
import { uuid } from 'uuidv4';
import {
  filterData,
  filterDefaultValues,
  filterValidationSchema,
} from '../Task.data';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { styles } from './Filter.style';
import { yupResolver } from '@hookform/resolvers/yup';
// import dayjs from 'dayjs';
// import { useGetDealsTasksManagementQuery } from '@/services/airSales/deals/view-details/tasks';

const Filter = () => {
  // const [taskFilters, setTaskFilters] = useState<any>({});
  const methods = useForm({
    resolver: yupResolver(filterValidationSchema),
    defaultValues: filterDefaultValues,
  });

  // const paramsObj = {
  //   assignTo: taskFilters.assignee,
  //   dueDate: dayjs(taskFilters.dueDate),
  //   priority: taskFilters?.priority,
  //   status: taskFilters?.taskStatus,
  // };

  // const query = "?" + new URLSearchParams(paramsObj).toString();
  // const { isError } = useGetDealsTasksManagementQuery({ query: query });

  // const { handleSubmit } = methods;

  // const onSubmit = (values: any) => {
  //   setTaskFilters(values);
  // };

  return (
    <DrawerComp
      btnTitle="Filter"
      title="Filter"
      btnIcon={<FilterIcon />}
      key="filter"
      footer
      // submitHandler={handleSubmit(onSubmit)}
    >
      <FormProvider methods={methods}>
        {filterData?.map((obj) => (
          <Box key={uuid()} mb="32px">
            <Typography
              sx={{
                color: '#4B5563',
                fontSize: '16px',
                fontWeight: 500,
                mb: '8px',
              }}
            >
              {obj?.title}
            </Typography>
            <obj.component
              size="small"
              fullWidth
              {...styles}
              {...obj?.componentProps}
            >
              {obj?.componentProps.select
                ? obj?.options?.map((option) => (
                    <MenuItem key={option?.value} value={option?.value}>
                      {option?.label}
                    </MenuItem>
                  ))
                : null}
            </obj.component>
          </Box>
        ))}
      </FormProvider>
    </DrawerComp>
  );
};

export default Filter;
