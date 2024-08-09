import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { FilterData, defaultValues } from './DealFilterDrawer.data';
import useDealTab from '../useDealTab';
import { filteredEmptyValues } from '@/utils/api';
import { DealFilterDrawerProps } from '../DealTab-interface';

const DealFilterDrawer = ({
  open,
  onClose,
  setFilters,
  filters,
}: DealFilterDrawerProps) => {
  const { isLoading } = useDealTab();
  const methods: any = useForm({
    defaultValues: defaultValues(filters),
  });
  const { handleSubmit, watch } = methods;
  const dealPipelineId = watch('dealPipelineId');

  const onSubmit = (values: any) => {
    const filterValues = filteredEmptyValues?.(values);
    setFilters(filterValues);
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
      isLoading={isLoading}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={2}>
          {FilterData(dealPipelineId)?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.componentProps?.name}>
              <item.component {...item?.componentProps} size={'small'}>
                {item?.componentProps?.select &&
                  item?.options?.map((option: any) => (
                    <option key={item?.value} value={option?.value}>
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
