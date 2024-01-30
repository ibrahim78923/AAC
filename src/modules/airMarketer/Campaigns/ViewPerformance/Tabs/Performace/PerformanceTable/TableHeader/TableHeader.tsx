import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { dataArray, defaultValues, validationSchema } from './TableHeader.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';

const TableHeader = () => {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });
  // commented for future use

  // const { handleSubmit } = methods;

  // const onSubmit = async (data: any) => {
  //   console.log(data);
  // };
  return (
    <>
      <FormProvider methods={methods}>
        <Grid container spacing={1}>
          {dataArray?.map((item: any) => (
            <Grid item xs={12} md={6} lg={item?.lg} key={uuidv4()}>
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
    </>
  );
};

export default TableHeader;
