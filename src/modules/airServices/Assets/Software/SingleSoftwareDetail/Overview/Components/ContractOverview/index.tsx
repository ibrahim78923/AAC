import { styles } from './ContractOverview.style';
import { Box, Typography, useTheme } from '@mui/material';

function ContractOverview({ contractOverviewLable }: any) {
  const theme: any = useTheme();
  return (
    <>
      <Box sx={styles.mainBox(theme)}>
        <Typography sx={styles.heading}>
          {contractOverviewLable.heading}
        </Typography>

        <Box sx={styles.contentBox}>
          <Box sx={styles.contentBoxData(theme)}>
            <Typography>{contractOverviewLable.subHeading1}</Typography>
            <Typography>{contractOverviewLable.subHeading1Value}</Typography>
          </Box>
          <Box sx={styles.contentBoxData(theme)}>
            <Typography>{contractOverviewLable.subHeading2}</Typography>
            <Typography>{contractOverviewLable.subHeading2Value}</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ContractOverview;
