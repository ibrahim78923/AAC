import React, { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Box,
} from '@mui/material';

import { FormProvider, RHFMultiCheckbox } from '@/components/ReactHookForm';
import { usePlanFeatures } from './usePlanFeatures';
import FeaturesModal from './FeaturesModal';
import { isNullOrEmpty } from '@/utils';

import { AddPlusPrimaryIcon } from '@/assets/icons';

import { useAppSelector } from '@/redux/store';
import { v4 as uuidv4 } from 'uuid';
import { useGetProductsFeaturesQuery } from '@/services/superAdmin/plan-mangement';

const PlanFeatures = ({ methods, handleSubmit }: any) => {
  const {
    theme,
    openFeaturesModal,
    setFeatureName,
    featureName,
    handleCloseFeaturesModal,
    handleOpenFeaturesModal,
    setAccordianId,
    accordianId,
  } = usePlanFeatures();
  const { planManagement }: any = useAppSelector(
    (state) => state?.planManagementForms,
  );

  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(
    '',
  );

  const handleExpandAccordionChange =
    (accordionId: string) => (_: any, isExpanded: boolean) => {
      setAccordianId(accordionId);
      setExpandedAccordion(isExpanded ? accordionId : '');
    };

  const { data, isSuccess } = useGetProductsFeaturesQuery({ id: accordianId });
  let productFeatures: any;
  if (isSuccess) {
    productFeatures = data;
  }

  return (
    <div>
      {!isNullOrEmpty(planManagement?.addPlanForm?.suite)
        ? planManagement?.addPlanForm?.suite?.map((feature: string) => (
            <Accordion
              expanded={expandedAccordion === feature}
              onChange={handleExpandAccordionChange(feature)}
              key={uuidv4()}
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
                  color: theme?.palette?.common?.white,
                  borderRadius: '8px',
                  marginBottom: '11px',
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
                  {!isNullOrEmpty(productFeatures?.data?.productfeatures)
                    ? productFeatures?.data?.productfeatures?.map(
                        (item: any) => {
                          return (
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              lg={4}
                              xl={3}
                              key={uuidv4()}
                            >
                              <Box
                                sx={{ width: 'max-content', display: 'flex' }}
                              >
                                <FormProvider
                                  methods={methods}
                                  onSubmit={handleSubmit}
                                >
                                  <RHFMultiCheckbox
                                    name="features"
                                    label="Features"
                                    options={[
                                      {
                                        label: item?.name,
                                        value: item?._id,
                                      },
                                    ]}
                                  />
                                </FormProvider>
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
                          );
                        },
                      )
                    : 'No Data'}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))
        : planManagement?.addPlanForm?.productId?.map((feature: string) => (
            <Accordion
              expanded={expandedAccordion === feature}
              onChange={handleExpandAccordionChange(feature)}
              key={uuidv4()}
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
                  color: theme?.palette?.common?.white,
                  borderRadius: '8px',
                  marginBottom: '11px',
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
                  {!isNullOrEmpty(productFeatures?.data?.productfeatures)
                    ? productFeatures?.data?.productfeatures?.map(
                        (item: any) => {
                          return (
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              lg={4}
                              xl={3}
                              key={uuidv4()}
                            >
                              <Box
                                sx={{ width: 'max-content', display: 'flex' }}
                              >
                                <FormProvider
                                  methods={methods}
                                  onSubmit={handleSubmit}
                                >
                                  <RHFMultiCheckbox
                                    name="features"
                                    label="Features"
                                    options={[
                                      {
                                        label: item?.name,
                                        value: item?._id,
                                      },
                                    ]}
                                  />
                                </FormProvider>
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
                          );
                        },
                      )
                    : 'No Data'}
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
