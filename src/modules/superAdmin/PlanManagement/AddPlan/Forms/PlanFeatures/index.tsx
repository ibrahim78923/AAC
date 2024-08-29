import React, { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Box,
  Skeleton,
} from '@mui/material';

import { FormProvider, RHFMultiCheckbox } from '@/components/ReactHookForm';
import { usePlanFeatures } from './usePlanFeatures';
import FeaturesModal from './FeaturesModal';
import { isNullOrEmpty } from '@/utils';

import { AddPlusPrimaryIcon } from '@/assets/icons';

import { useAppSelector } from '@/redux/store';
import { v4 as uuidv4 } from 'uuid';
import { useGetProductsFeaturesQuery } from '@/services/superAdmin/plan-mangement';
import { useGetProductsQuery } from '@/services/common-APIs';
import { useRouter } from 'next/router';
import {
  Feature,
  PlanManagementState,
  Product,
} from './PlanFeatures.interface';
import { ARRAY_INDEX } from '@/constants/strings';

const PlanFeatures = ({ methods, handleSubmit, editPlan }: any) => {
  const {
    theme,
    openFeaturesModal,
    setFeatureName,
    featureName,
    handleCloseFeaturesModal,
    handleOpenFeaturesModal,
    setAccordianId,
    accordianId,
    featureId,
    setFeatureId,
  } = usePlanFeatures();
  const planManagement = useAppSelector(
    (state: { planManagementForms: PlanManagementState }) =>
      state?.planManagementForms,
  );

  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(
    '',
  );

  const handleExpandAccordionChange =
    (accordionId: string) => (_: any, isExpanded: boolean) => {
      setAccordianId(accordionId);
      setExpandedAccordion(isExpanded ? accordionId : '');
    };

  const { data, isSuccess, isLoading, isFetching } =
    useGetProductsFeaturesQuery(
      { id: accordianId },
      { skip: isNullOrEmpty(accordianId) },
    );
  let productFeatures: { data?: { productfeatures: Feature[] } } | undefined;
  if (isSuccess) {
    productFeatures = data;
  }

  const { data: productList } = useGetProductsQuery({});

  const productsOptions: { value: string; label: string }[] =
    productList?.data?.map((product: Product) => ({
      value: product?._id,
      label: product?.name,
    })) || [];

  const router = useRouter();
  const { type } = router.query;

  const selectedFeatureIds = new Set(
    editPlan?.planProductFeatures?.flatMap(
      (feature: any) => feature?.featureId || [],
    ),
  );

  return (
    <div>
      {!isNullOrEmpty(planManagement?.addPlanForm?.suite) ? (
        planManagement?.addPlanForm?.suite?.map((feature: string) => (
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
              <Typography variant="h4">
                {productList &&
                  productsOptions?.find((obj: any) => obj?.value === feature)
                    ?.label}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                {!isNullOrEmpty(productFeatures?.data?.productfeatures) ? (
                  productFeatures?.data?.productfeatures?.map((item: any) => {
                    const isChecked = selectedFeatureIds?.has(item._id);
                    return (
                      <Grid item xs={12} sm={6} lg={4} xl={3} key={uuidv4()}>
                        <Box sx={{ width: 'max-content', display: 'flex' }}>
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
                                  checked: isChecked,
                                },
                              ]}
                            />
                          </FormProvider>
                          <Box
                            sx={{ cursor: 'pointer' }}
                            onClick={() => {
                              handleOpenFeaturesModal();
                              setFeatureName(item?.name);
                              setFeatureId(item?._id);
                            }}
                          >
                            <AddPlusPrimaryIcon />
                          </Box>
                        </Box>
                      </Grid>
                    );
                  })
                ) : isLoading || isFetching ? (
                  <Skeleton variant="rectangular" width="100%" height={150} />
                ) : (
                  'No Data'
                )}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))
      ) : Array.isArray(planManagement?.addPlanForm?.productId) &&
        planManagement?.addPlanForm?.productId?.length > 1 ? (
        planManagement?.addPlanForm?.productId?.map((feature: string) => (
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
              <Typography variant="h4">
                {productList &&
                  productsOptions?.find((obj: any) => obj?.value === feature)
                    ?.label}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                {!isNullOrEmpty(productFeatures?.data?.productfeatures) ? (
                  productFeatures?.data?.productfeatures?.map((item: any) => {
                    const isChecked = selectedFeatureIds?.has(item._id);
                    return (
                      <Grid item xs={12} sm={6} lg={4} xl={3} key={uuidv4()}>
                        <Box sx={{ width: 'max-content', display: 'flex' }}>
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
                                  checked: isChecked,
                                },
                              ]}
                            />
                          </FormProvider>
                          <Box
                            sx={{ cursor: 'pointer' }}
                            onClick={() => {
                              handleOpenFeaturesModal();
                              setFeatureName(item?.name);
                              setFeatureId(item?._id);
                            }}
                          >
                            <AddPlusPrimaryIcon />
                          </Box>
                        </Box>
                      </Grid>
                    );
                  })
                ) : isLoading ? (
                  <Skeleton variant="rectangular" width="100%" height={150} />
                ) : (
                  'No Data'
                )}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        // : planManagement?.addPlanForm?.productId?.map((feature: string) => ())
        <Accordion
          expanded={
            expandedAccordion === planManagement?.addPlanForm?.productId
          }
          onChange={handleExpandAccordionChange(
            planManagement?.addPlanForm?.productId,
          )}
          key={uuidv4()}
          disableGutters
          sx={{
            '&.MuiAccordion': {
              '&.Mui-expanded': {
                boxShadow: 'theme?.customShadows?.z8',
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
            <Typography variant="h4">
              {productList &&
                type === 'add' &&
                productsOptions?.find(
                  (obj: any) =>
                    obj?.value === planManagement?.addPlanForm?.productId,
                )?.label}
              {productList &&
                type === 'edit' &&
                productsOptions?.find(
                  (obj: any) =>
                    obj?.value ===
                    planManagement?.addPlanForm?.productId[ARRAY_INDEX?.ZERO],
                )?.label}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              {!isNullOrEmpty(productFeatures?.data?.productfeatures) ||
              isNullOrEmpty(accordianId) ? (
                productFeatures?.data?.productfeatures?.map((item: any) => {
                  const isChecked = selectedFeatureIds?.has(item._id);
                  return (
                    <Grid item xs={12} sm={6} lg={4} xl={3} key={uuidv4()}>
                      <Box sx={{ width: 'max-content', display: 'flex' }}>
                        <FormProvider methods={methods} onSubmit={handleSubmit}>
                          <RHFMultiCheckbox
                            name="features"
                            label="Features"
                            options={[
                              {
                                label: item?.name,
                                value: item?._id,
                                checked: isChecked,
                              },
                            ]}
                          />
                        </FormProvider>
                        <Box
                          sx={{ cursor: 'pointer' }}
                          onClick={() => {
                            handleOpenFeaturesModal();
                            setFeatureName(item?.name);
                            setFeatureId(item?._id);
                          }}
                        >
                          <AddPlusPrimaryIcon />
                        </Box>
                      </Box>
                    </Grid>
                  );
                })
              ) : isLoading ? (
                <Skeleton variant="rectangular" width="100%" height={150} />
              ) : (
                'No Data'
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}

      {openFeaturesModal && (
        <FeaturesModal
          openFeaturesModal={openFeaturesModal}
          handleCloseFeaturesModal={handleCloseFeaturesModal}
          featureName={featureName}
          featureId={featureId}
        />
      )}
    </div>
  );
};

export default PlanFeatures;
