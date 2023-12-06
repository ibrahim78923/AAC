import { Box, Button, Card, Grid, Typography, useTheme } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  automationDataArray,
  automationDefaultValues,
  automationValidationSchema,
} from './Automation.data';
import Image from 'next/image';
import { AudienceMockImage, BudgetScheduleMockImage } from '@/assets/images';
import { styles } from '../.../../../EngagementAd.style';
import { styles as style } from '../../../CreateAd.style';
import { v4 as uuidv4 } from 'uuid';

const Automation = () => {
  const theme = useTheme();
  const methods: any = useForm({
    resolver: yupResolver(automationValidationSchema),
    defaultValues: automationDefaultValues,
  });

  // const { handleSubmit } = methods;

  // const onSubmit = async () => {
  // commented for future use need form values in this function
  // };

  return (
    <Box sx={styles?.engagementStyle}>
      <FormProvider methods={methods}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {automationDataArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
                <small>{item?.componentProps?.small}</small>
              </Grid>
            ))}
            <Card>
              <Box p={'24px'}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight={500}>
                    Create your own automated follow-ups
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ maxWidth: '477px', margin: 'auto' }}
                  >
                    Use simple workflows to take care of your follow-ups after
                    contacts engage with your ad. For example, adding those
                    contacts to an audience, or sending them an email.
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    color={theme?.palette?.primary?.main}
                  >
                    {`What's a simple workflow?`}
                  </Typography>
                </Box>
                <Grid container spacing={1} sx={{ alignItems: 'center' }}>
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        background: theme?.palette?.grey[100],
                        p: 1,
                        justifyContent: 'center',
                        display: 'flex',
                      }}
                    >
                      <Image src={AudienceMockImage} alt="mock" />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Typography variant="h6">Ad to ads audience</Typography>
                    <Typography variant="body3">
                      When a contact interacts with this ad, they willbe added
                      to this audience
                    </Typography>
                    <Button variant="contained">Select this workflow</Button>
                  </Grid>
                </Grid>
              </Box>
            </Card>
            <Box
              sx={{
                background: theme?.palette?.grey[100],
                borderRadius: '6px',
                padding: '12px 16px',
              }}
            >
              <Typography variant="body2">
                Need more powerful workflows? Get extra actions, triggers, and
                if/then <br /> branching in the
                <Typography
                  component="span"
                  ml="2px"
                  variant="body2"
                  fontWeight={500}
                  color={theme?.palette?.primary?.main}
                >
                  workflows tool
                </Typography>
              </Typography>
            </Box>
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

export default Automation;
