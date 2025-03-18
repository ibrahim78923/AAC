import { Grid } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import {
  addRolesSchema,
  rolesFilterDefaultValues,
  rolesFiltersArray,
} from './RoleFilters.data';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { filteredEmptyValues } from '@/utils/api';
import { RoleFiltersProps } from '../Roles-inerface';
import { useLazyGetCompanyAccountsListsQuery } from '@/services/common-APIs';
import { yupResolver } from '@hookform/resolvers/yup';

const RoleFilters = (props: RoleFiltersProps) => {
  const { isOpen, setIsOpen, filterVal, setFilterValues } = props;
  const companyAccounts = useLazyGetCompanyAccountsListsQuery();

  const methods = useForm({
    resolver: yupResolver(addRolesSchema),
    defaultValues: rolesFilterDefaultValues(filterVal),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: any) => {
    const filteredValues = filteredEmptyValues?.(values);
    setFilterValues(filteredValues);
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
          {rolesFiltersArray(companyAccounts)?.map((item: any) => (
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
