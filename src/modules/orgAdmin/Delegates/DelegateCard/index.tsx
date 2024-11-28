import Image from 'next/image';
import { Box, Grid, Theme, Typography, useTheme } from '@mui/material';
import { delegateCardArr } from './DelegateCard.data';
import { CardbgImage } from '@/assets/images';

const DelegateCard = ({ cardData }: any) => {
  const theme = useTheme<Theme>();
  return (
    <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
      {delegateCardArr(cardData)?.map((item: any) => {
        return (
          <Grid item lg={3} md={6} sm={6} xs={12} key={item?.title}>
            <Box
              sx={{
                backgroundImage: `url(${CardbgImage.src})`,
                backgroundPosition: 'bottom',
                height: '160px',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                px: '2rem',
                borderRadius: '30px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <Image
                  src={item?.icon}
                  alt="icon missing"
                  height={40}
                  width={40}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 400,
                    color: `${theme?.palette?.common?.white}`,
                  }}
                >
                  {item?.title}
                </Typography>
              </Box>

              <Typography
                variant="h2"
                sx={{
                  fontWeight: 500,
                  color: `${theme?.palette?.common?.white}`,
                }}
              >
                {item?.totalMember}
              </Typography>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default DelegateCard;
