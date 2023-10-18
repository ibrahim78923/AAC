import { styles } from './ContractOverview.style';
import { Box, Typography, useTheme } from '@mui/material';

function ContractOverview({ ContractOverviewLable }: any) {
  const theme: any = useTheme();
  return (
    <>
      <Box sx={styles.mainBox(theme)}>
        <Typography sx={styles.heading}>
          {ContractOverviewLable.heading}
        </Typography>

        <Box sx={styles.contentBox}>
          <Box sx={styles.contentBoxData(theme)}>
            <Typography>{ContractOverviewLable.subHeading1}</Typography>
            <Typography>{ContractOverviewLable.subHeading1Value}</Typography>
          </Box>
          <Box sx={styles.contentBoxData(theme)}>
            <Typography>{ContractOverviewLable.subHeading2}</Typography>
            <Typography>{ContractOverviewLable.subHeading2Value}</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ContractOverview;
