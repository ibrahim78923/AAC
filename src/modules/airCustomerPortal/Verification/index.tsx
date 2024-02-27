import { Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { SignUpImage } from '@/assets/images';
import { VerifiedIcon } from '@/assets/icons';
import useVerification from './useVerification';
import { AIR_CUSTOMER_PORTAL } from '@/constants';

export default function AirCustomerVerification() {
  const { router, resendLink } = useVerification();

  return (
    <Grid container height={'100vh'} alignItems={'center'}>
      <Grid
        item
        xs={12}
        md={6}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'column'}
        px={2}
      >
        <VerifiedIcon />
        <Typography variant={'h3'} my={2}>
          Let&rsquo;s get You Verified
        </Typography>
        <Typography variant={'h6'} color={'grey.900'} textAlign={'center'}>
          A verification Link has been sent to your email account. Please click
          on that link for further verification to proceed.
        </Typography>
        <Typography
          variant={'h6'}
          color={'grey.900'}
          textAlign={'center'}
          my={2}
        >
          If you didn&rsquo;t get the verification email click on{' '}
          <Typography
            variant={'h6'}
            component={'span'}
            color={'primary.main'}
            fontWeight={600}
            sx={{ cursor: 'pointer' }}
            onClick={resendLink}
          >
            Resend link
          </Typography>
        </Typography>

        <Button
          variant={'contained'}
          onClick={() => {
            router?.push(AIR_CUSTOMER_PORTAL?.AIR_CUSTOMER_PORTAL_LOGIN);
          }}
        >
          Back to Log In
        </Button>
      </Grid>

      <Grid item xs={12} md={6} display={'flex'} justifyContent={'flex-end'}>
        <Image
          src={SignUpImage}
          alt={'dashboard'}
          width={668}
          height={513}
          style={{ width: '100%', height: 'auto' }}
        />
      </Grid>
    </Grid>
  );
}
