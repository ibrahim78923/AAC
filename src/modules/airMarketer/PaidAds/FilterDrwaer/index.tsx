import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { v4 as uuidv4 } from 'uuid';
import { Grid } from '@mui/material';
import {
  usersFilterArray,
  filterDefaultValues,
  filterValidationSchema,
} from './FilterDrawer.data';
const PaidAdsFilterDrawer = (props: any) => {
  const { isOpenDrawer, onClose } = props;

  const methods: any = useForm({
    resolver: yupResolver(filterValidationSchema),
    defaultValues: filterDefaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {};

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isOpenDrawer}
        title="Filters"
        okText="Apply"
        submitHandler={handleSubmit(onSubmit)}
        onClose={onClose}
        isOk={true}
        footer
      >
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {usersFilterArray?.map((item: any) => (
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
    </>
  );
};

export default PaidAdsFilterDrawer;
