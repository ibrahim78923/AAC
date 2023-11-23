import React from 'react';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControlLabel,
  Box,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { SwitchBtn } from '@/components/SwitchButton';

import { useModules } from './useModules';
import SubModulesAccordion from './SubModulesAccordian';

import { v4 as uuidv4 } from 'uuid';
import { SUPER_ADMIN_PLAN_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { useAppSelector } from '@/redux/store';
import { useGetProductsFeaturesAllQuery } from '@/services/superAdmin/plan-mangement';
import { isNullOrEmpty } from '@/utils';

const Modules = ({ methods, handleSubmit }: any) => {
  const { theme, isAccordionExpanded, handleExpandAccordionChange } =
    useModules();
  const { data, isSuccess } = useGetProductsFeaturesAllQuery({});
  let productFeatures: any;
  if (isSuccess) {
    productFeatures = data;
  }

  const { planManagement }: any = useAppSelector(
    (state: any) => state?.planManagementForms,
  );

  const productModules = isNullOrEmpty(planManagement?.addPlanForm?.suide)
    ? planManagement?.addPlanForm?.productId?.map((module: any) => {
        const products = productFeatures?.data?.productfeatures?.find(
          (id: any) => id?.productId === module,
        );
        return {
          productName: products?.productName,
        };
      })
    : planManagement?.addPlanForm?.suide?.map((module: any) => {
        const products = productFeatures?.data?.productfeatures?.find(
          (id: any) => id?.productId === module,
        );
        return {
          productName: products?.productName,
        };
      });

  const productModulesPermissions = productModules?.map((productName: any) => {
    return {
      productName: productName?.productName,
      permissions: SUPER_ADMIN_PLAN_MANAGEMENT_PERMISSIONS?.filter(
        (permissionsArray) =>
          permissionsArray?.ProductName === productName?.productName,
      ),
    };
  });

  // console.log(productModulesPermissions);

  return (
    <div>
      {productModulesPermissions?.map((productModulePermissions: any) => (
        <Accordion
          key={uuidv4()}
          expanded={
            isAccordionExpanded === productModulePermissions?.productName
          }
          onChange={handleExpandAccordionChange(
            productModulePermissions?.productName,
          )}
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
            aria-controls={`accordion-${productModulePermissions?.productName}`}
            id={`accordion-${productModulePermissions?.productName}`}
          >
            <Box display="flex" alignItems="center">
              <FormControlLabel control={<SwitchBtn />} label="" />
              <Typography variant="h4">
                {productModulePermissions?.productName}
              </Typography>
            </Box>
          </AccordionSummary>

          <AccordionDetails>
            {productModulePermissions?.permissions.map((permission: any) => (
              <SubModulesAccordion
                key={uuidv4()}
                subModules={permission?.Sub_Modules}
                methods={methods}
                handleSubmit={handleSubmit}
              />
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Modules;
