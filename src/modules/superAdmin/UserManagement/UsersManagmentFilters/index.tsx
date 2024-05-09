import { Grid, Typography } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import {
  usersFilterDefaultValues,
  usersFilterArray,
} from '../Users/Users.data';
import {
  rolesDefaultValues,
  rolesFiltersArray,
} from '../RolesAndRights/RoleAndRights.data';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { filteredEmptyValues } from '@/utils/api';

const UsersManagementFilters = (props: any) => {
  const { isOpen, setIsOpen, tabVal, setFilterValues, filterValues } = props;

  const tabsFilter: any = {
    0: {
      array: usersFilterArray(),
      defaultVal: usersFilterDefaultValues(filterValues),
    },
    1: {
      array: usersFilterArray(),
      defaultVal: usersFilterDefaultValues(filterValues),
    },
    2: {
      array: rolesFiltersArray,
      defaultVal: rolesDefaultValues,
    },
  };

  const methods: any = useForm({
    defaultValues: tabsFilter[tabVal]?.defaultVal,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    const filterValues = filteredEmptyValues?.(data);
    setFilterValues(filterValues);
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
          {tabsFilter[tabVal]?.array?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.comonentProps?.name}>
              <Typography variant="body2" fontWeight={500}>
                {item?.title}
              </Typography>
              <item.component {...item.componentProps} size={'small'}>
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

export default UsersManagementFilters;
