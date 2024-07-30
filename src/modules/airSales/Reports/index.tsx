import Image from 'next/image';
import { Box, Theme, Typography, useTheme } from '@mui/material';
import { styles } from './Reports.style';
import { reportsCardsData } from './Reports.data';
import { useRouter } from 'next/router';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

const Reports = () => {
  const theme = useTheme<Theme>();
  const navigae = useRouter();
  return (
    <>
      {reportsCardsData?.map((item: any) => (
        <Box key={item?.heading}>
          <PermissionsGuard permissions={[item?.permissions]}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 500,
                color: `${theme?.palette?.grey[800]}`,
              }}
            >
              {item?.heading}
            </Typography>
            <Box display="flex" gap={2}>
              {item?.cards?.map((val: any) => (
                <Box
                  my={2}
                  width={360}
                  onClick={() => {
                    navigae?.push(val?.navigateLink);
                  }}
                  sx={styles?.mainDealBox(theme)}
                  key={val?.title}
                >
                  <Image src={val?.img} alt="no image" />
                  <Box sx={{ marginLeft: '1rem' }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: `${theme?.palette?.custom?.grayish_blue}`,
                      }}
                    >
                      {val?.title}
                    </Typography>
                    <Typography
                      variant="body3"
                      sx={{
                        fontWeight: 500,
                        color: `${theme?.palette?.custom?.grayish_blue}`,
                      }}
                    >
                      {val?.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </PermissionsGuard>
        </Box>
      ))}
    </>
  );
};

export default Reports;
