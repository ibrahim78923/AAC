import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { Typography } from '@mui/material';
import { Generaltab } from '../GeneralTab';
import { BetaFeature } from '../BetaFeatureTab';

export const General = () => {
  const TabData = ['General', 'Beta Feature'];
  return (
    <>
      <Typography mb={2} variant="h4" fontWeight={500}>
        General
      </Typography>
      <HorizontalTabs tabsDataArray={TabData}>
        <Generaltab />
        <BetaFeature />
      </HorizontalTabs>
    </>
  );
};
