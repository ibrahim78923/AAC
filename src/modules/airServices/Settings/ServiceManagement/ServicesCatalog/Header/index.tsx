import { Box, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { CirclePlusIcon } from '@/assets/icons';

export default function Header(props: any) {
  const { categories } = props;

  const router: any = useRouter();

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      flexWrap={'wrap'}
      gap={2}
      mb={2}
    >
      <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1}>
        <ArrowBackIcon
          sx={{ cursor: 'pointer' }}
          color={'secondary'}
          onClick={() => {
            const isMatch = categories?.some(
              (service: any) =>
                service?.categoryName === router?.query?.categoryName,
            );

            if (isMatch) {
              router?.push(AIR_SERVICES?.SERVICE_CATALOG);
            } else {
              router?.push(AIR_SERVICES?.SERVICE_MANAGEMENT);
            }
          }}
        />

        <Typography variant={'pageTitle'} color={'slateBlue.main'}>
          Service Catalog
        </Typography>
        {router?.query?.categoryName && (
          <>
            <ArrowForwardIosIcon fontSize={'small'} color={'secondary'} />
            <Typography
              variant={'pageTitle'}
              color={'slateBlue.main'}
              textTransform={'capitalize'}
            >
              {router?.query?.categoryName?.toLowerCase()}
            </Typography>
          </>
        )}
      </Box>

      <PermissionsGuard
        permissions={[
          AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.ADD_NEW_SERVICE,
        ]}
      >
        <Button
          variant={'contained'}
          className={'small'}
          startIcon={<CirclePlusIcon />}
          onClick={() => router?.push(AIR_SERVICES?.UPSERT_SERVICE)}
        >
          Add Service
        </Button>
      </PermissionsGuard>
    </Box>
  );
}
