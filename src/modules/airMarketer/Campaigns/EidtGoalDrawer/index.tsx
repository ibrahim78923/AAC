import { Grid, Box, Typography, InputAdornment, Tooltip } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import {
  dataArray,
  defaultValues,
  validationSchema,
} from './EditGoalDrawer.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { Info } from '@mui/icons-material';
import useEditGoalDrawer from './useEditGoalDrawer';

export default function EditGoalDrawer({
  isOpenDrawer,
  onClose,
  initialValueProps = defaultValues,
}: any) {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValueProps,
  });

  const { handleSubmit } = methods;

  const { toolTipTitle, onSubmit } = useEditGoalDrawer();

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => onClose(false)}
      title={'Edit Campaign Goal'}
      okText={'Update'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {dataArray?.map((item: any) => (
              <Grid
                item
                xs={12}
                md={item?.md}
                key={uuidv4()}
                position={'relative'}
              >
                <Typography variant={item?.componentProps?.varient}>
                  {item?.componentProps?.heading}
                </Typography>
                <item.component {...item?.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
                {!item?.componentProps?.heading && (
                  <InputAdornment
                    sx={{
                      position: 'absolute',
                      top: 69,
                      right: 15,
                      zIndex: 9999,
                    }}
                    position="end"
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                      }}
                    >
                      <Tooltip
                        placeholder="top"
                        title={
                          <Typography
                            sx={{
                              width: '220px',
                              textAlign: 'center',
                              fontSize: '12px',
                            }}
                          >
                            {toolTipTitle(item?.componentProps?.name)}
                          </Typography>
                        }
                      >
                        <Info />
                      </Tooltip>
                    </Box>
                  </InputAdornment>
                )}
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
}
