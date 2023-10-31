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

import { FormProvider } from '@/components/ReactHookForm';

import CheckboxLabel from './CheckboxLabel';
import { usePlanFeatures } from './usePlanFeatures';
import { AirSalesCategories } from './PlanFeatures.data';
import { dataArrayFeatures } from './FeaturesModal/FeaturesModal.data';
import FeaturesModal from './FeaturesModal';

import { CheckboxItem } from './PlanFeatures.interface';

import { isNullOrEmpty } from '@/utils';

import { AddPlusPrimaryIcon } from '@/assets/icons';

import { useAppSelector } from '@/redux/store';
import { v4 as uuidv4 } from 'uuid';

const PlanFeatures = ({ methods, handleSubmit }: any) => {
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
      <FormProvider methods={methods} onSubmit={handleSubmit}>
        <Grid container spacing={5}>
          {dataArrayFeatures?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              <item.component {...item.componentProps} size={'small'}>
                {!isNullOrEmpty(item?.componentProps?.select) &&
                  item?.options?.map((option: any) => (
                    <option key={uuidv4()} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
              </item.component>
            </Grid>
          ))}
        </Grid>
      </FormProvider>

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
