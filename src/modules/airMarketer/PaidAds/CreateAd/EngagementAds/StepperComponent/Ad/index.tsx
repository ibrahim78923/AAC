import Image from 'next/image';
import { Box, Card, Grid, Typography } from '@mui/material';
import { Info } from '@mui/icons-material';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { AdFormData } from './Ad.data';
import useAd from './useAd';
import { styles } from '../../../CreateAd.style';
import { MockEngagementTabsImage } from '@/assets/images';

const Ad = () => {
  const { theme, methods, isNewAdValue } = useAd();

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} key={uuidv4()} className="tabWrapper">
          <FormProvider methods={methods}>
            <Grid container spacing={1}>
              {AdFormData?.map((item: any) => {
                return (
                  item?.isNewAdFields?.includes(isNewAdValue) && (
                    <Grid item xs={12} md={item?.md} key={uuidv4()}>
                      {item?.componentProps?.heading && (
                        <Box display="flex" gap={1} alignItems="center">
                          <Box display="flex">
                            <Typography
                              variant="body1"
                              fontWeight={500}
                              color={theme?.palette?.blue?.dull_blue}
                            >
                              {item?.componentProps?.heading}
                            </Typography>
                            {item?.componentProps?.heading !==
                              'Facebook Campaign' && (
                              <Typography
                                component="span"
                                color={theme?.palette?.error?.main}
                              >
                                *
                              </Typography>
                            )}
                          </Box>
                          {item?.componentProps?.heading ===
                            'Website page URL' && (
                            <Info
                              sx={{
                                color: theme?.palette?.custom?.grayish_blue,
                              }}
                            />
                          )}
                        </Box>
                      )}
                      <item.component {...item.componentProps} size={'small'}>
                        {item?.componentProps?.select &&
                          item?.options?.map((option: any) => (
                            <option key={option?.value} value={option?.value}>
                              {option?.label}
                            </option>
                          ))}
                      </item.component>
                    </Grid>
                  )
                );
              })}
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

export default Ad;
