import { useState } from 'react';

import { useTheme } from '@mui/material';

export const usePlanFeatures = () => {
  const [openFeaturesModal, setOpenFeaturesModal] = useState(false);
  const [featureDetail, setFeatureDetail] = useState('');
  const [featureName, setFeatureName] = useState('');
  const theme = useTheme();

  const handleOpenFeaturesModal = () => {
    setOpenFeaturesModal(true);
  };
  const handleCloseFeaturesModal = () => {
    setOpenFeaturesModal(false);
  };
  const [expandedAccordion, setExpandAccordion] = useState<string | false>(
    'plan-features-sales-accordion',
  );

  const handleExpandAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandAccordion(isExpanded ? panel : false);
    };

  return {
    theme,
    expandedAccordion,
    handleExpandAccordionChange,
    openFeaturesModal,
    setOpenFeaturesModal,
    handleCloseFeaturesModal,
    handleOpenFeaturesModal,
    setFeatureName,
    featureName,
    featureDetail,
    setFeatureDetail,
  };
};
