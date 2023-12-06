import { Alert, Box, Card, Grid, Typography, useTheme } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  budgetDataArray,
  budgetDefaultValues,
  budgetValidationSchema,
} from './BudgetAndSchedule.data';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import Image from 'next/image';
import { BudgetScheduleMockImage } from '@/assets/images';
import { styles } from '../../../EngagementAd.style';
import { styles as style } from '../../../../CreateAd.style';
import { v4 as uuidv4 } from 'uuid';

const BudgetAndSchedule = () => {
  const theme = useTheme();
  const methods: any = useForm({
    resolver: yupResolver(budgetValidationSchema),
    defaultValues: budgetDefaultValues,
  });

  // const { handleSubmit } = methods;

  // const onSubmit = async () => {
  // commented for future use need form values in this function
  // };

  return (
    <Box sx={styles?.engagementStyle}>
      <FormProvider methods={methods}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} key={uuidv4()}>
            <Grid container spacing={1}>
              {budgetDataArray?.map((item: any) => (
                <Grid item md={item?.md} key={uuidv4()}>
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
              <Grid item xs={12}>
                <Alert
                  severity="info"
                  icon={
                    <LiveHelpIcon
                      sx={{ color: theme?.palette?.secondary?.main }}
                    />
                  }
                  sx={{ background: theme?.palette?.grey[700] }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: theme?.palette?.slateBlue?.main }}
                  >
                    Your ad will run continuosly and will cost you no more than
                    <Typography
                      component={'span'}
                      variant="body2"
                      fontWeight={500}
                    >
                      $0.00 per week
                    </Typography>
                  </Typography>
                </Alert>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} sx={style?.cardStyle}>
            <Card
              sx={{
                height: '60vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image src={BudgetScheduleMockImage} alt="eng-img" />
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </Box>
  );
};

export default BudgetAndSchedule;
