import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
} from '@mui/material';

import CheckboxLabel from './CheckboxLabel';
import { usePlanFeatures } from './usePlanFeatures';
import { AirSalesCategories } from './PlanFeatures.data';
import FeaturesModal from './FeaturesModal';
import { AddPlusPrimaryIcon } from '@/assets/icons';
import { useAppSelector } from '@/redux/store';

interface CheckboxItem {
  name: string;
  desc: string;
  checked: boolean;
}

const PlanFeatures: React.FC = () => {
  const {
    theme,
    openFeaturesModal,
    setFeatureName,
    featureName,
    handleCloseFeaturesModal,
    handleOpenFeaturesModal,
  } = usePlanFeatures();
  const { planManagement }: any = useAppSelector(
    (state) => state.planManagementForms,
  );

  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(
    '',
  );

  const handleExpandAccordionChange =
    (accordionId: string) => (_: any, isExpanded: boolean) => {
      setExpandedAccordion(isExpanded ? accordionId : '');
    };

  return (
    <div>
      {planManagement?.addPlanForm?.product?.map((feature: string) => (
        <Accordion
          expanded={expandedAccordion === feature}
          onChange={handleExpandAccordionChange(feature)}
          key={feature}
          disableGutters
          sx={{
            '&.MuiAccordion': {
              '&.Mui-expanded': {
                boxShadow: 'theme.customShadows.z8',
                borderRadius: '8px',
              },
              '&.Mui-disabled': {
                backgroundColor: 'transparent',
              },
            },
            '& .MuiAccordionSummary-root': {
              backgroundColor: theme?.palette?.blue?.main,
              color: theme.palette.common.white,
              borderRadius: '8px',
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="plan-features-sales-accordion-content"
            id="plan-features-sales-accordion-header"
          >
            <Typography variant="h4">{feature}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              {AirSalesCategories?.map((item: CheckboxItem) => (
                <Grid item xs={12} sm={6} lg={4} xl={3} key={item.name}>
                  <Box sx={{ width: 'max-content', display: 'flex' }}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox />}
                        label={
                          <CheckboxLabel name={item.name} desc={item.desc} />
                        }
                      />
                    </FormGroup>
                    <Box
                      sx={{ cursor: 'pointer' }}
                      onClick={() => {
                        handleOpenFeaturesModal();
                        setFeatureName(item?.name);
                      }}
                    >
                      <AddPlusPrimaryIcon />
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
      {openFeaturesModal && (
        <FeaturesModal
          openFeaturesModal={openFeaturesModal}
          handleCloseFeaturesModal={handleCloseFeaturesModal}
          featureName={featureName}
        />
      )}
    </div>
  );
};

export default PlanFeatures;
