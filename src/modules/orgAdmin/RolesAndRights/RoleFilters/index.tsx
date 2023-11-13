import { Grid, Typography } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import {
  rolesDefaultValues,
  rolesFiltersArray,
  rolesValidationSchema,
} from './RoleFilters.data';

import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';

const RoleFilters = (props: any) => {
  const { isOpen, setIsOpen } = props;

  const methods: any = useForm({
    resolver: yupResolver(rolesValidationSchema),
    defaultValues: rolesDefaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
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
          {rolesFiltersArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              <Typography variant="body2" fontWeight={500}>
                {item?.title}
              </Typography>
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
