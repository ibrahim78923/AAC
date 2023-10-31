import { styles } from './ContractOverview.style';
import { Box, Typography, useTheme } from '@mui/material';

function ContractOverview({ contractOverviewLabel }: any) {
  const theme: any = useTheme();
  return (
    <>
      <Box sx={styles?.mainBox(theme)}>
        <Typography sx={styles?.heading}>
          {contractOverviewLabel?.heading}
        </Typography>

        <Box sx={styles?.contentBox}>
          <Box sx={styles?.contentBoxData(theme)}>
            <Typography>{contractOverviewLabel?.subHeading1}</Typography>
            <Typography>{contractOverviewLabel?.subHeading1Value}</Typography>
          </Box>
          <Box sx={styles?.contentBoxData(theme)}>
            <Typography>{contractOverviewLabel?.subHeading2}</Typography>
            <Typography>{contractOverviewLabel?.subHeading2Value}</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ContractOverview;
