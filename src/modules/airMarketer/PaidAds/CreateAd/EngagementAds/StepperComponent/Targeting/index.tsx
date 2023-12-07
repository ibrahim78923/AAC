import Image from 'next/image';
import { Box, Card, Grid, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { targetingFormData } from './Targeting.data';
import useTargeting from '../Ad/useAd';
import { styles } from '../../../CreateAd.style';
import { MockEngagementTabsImage } from '@/assets/images';

const Targeting = () => {
  const { theme, methods } = useTargeting();

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} key={uuidv4()} className="tabWrapper">
          <FormProvider methods={methods}>
            <Grid container spacing={1}>
              {targetingFormData?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  {item?.componentProps?.heading && (
                    <Box display="flex">
                      <Typography
                        variant={item?.componentProps?.varient}
                        fontWeight={500}
                        color={theme?.palette?.blue?.dull_blue}
                      >
                        {item?.componentProps?.heading}
                      </Typography>
                      {item?.componentProps?.heading === 'Age Range' && (
                        <Typography
                          component="span"
                          color={theme?.palette?.error?.main}
                        >
                          *
                        </Typography>
                      )}
                    </Box>
                  )}
                  <item.component {...item.componentProps} size="small">
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                  {item.componentProps?.label === 'Special Ad Category' && (
                    <Typography
                      variant="body3"
                      color={theme?.palette?.grey[600]}
                    >
                      Is your ad related to housing, employment, or credit?
                    </Typography>
                  )}
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={styles?.cardStyle}>
            <Card
              sx={{
                height: '55vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 2,
              }}
            >
              <Image src={MockEngagementTabsImage} alt="eng-img" />
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Targeting;
