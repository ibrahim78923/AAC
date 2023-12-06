import { Box, Card, Grid, Tooltip, Typography, useTheme } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import {
  searchAdDefaultValues,
  searchAdFormData,
  searchAdValidation,
} from '../CreateAd.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Info } from '@mui/icons-material';
import Image from 'next/image';
import { MockUpImage } from '@/assets/images';
import { styles } from '../CreateAd.style';

const SearchAd = () => {
  const theme = useTheme();
  const methods: any = useForm({
    resolver: yupResolver(searchAdValidation),
    defaultValues: searchAdDefaultValues,
  });

  return (
    <>
      <FormProvider methods={methods}>
        <Grid container spacing={1}>
          {searchAdFormData?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              {item?.componentProps?.heading && (
                <Box display="flex" gap={1} alignItems="center">
                  <Typography
                    variant="body1"
                    fontWeight={500}
                    color={theme?.palette?.blue?.dull_blue}
                  >
                    {item?.componentProps?.heading}
                  </Typography>
                  <Tooltip
                    title="You'll need to choose an ad account before you can choose an existing campaign."
                    arrow
                  >
                    <Info
                      sx={{
                        color: theme?.palette?.custom?.grayish_blue,
                      }}
                    />
                  </Tooltip>
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
          ))}
        </Grid>
      </FormProvider>
      <Box sx={styles?.cardStyle}>
        <Card
          sx={{
            height: '50vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Image src={MockUpImage} alt="eng-img" />
        </Card>
      </Box>
    </>
  );
};

export default SearchAd;
