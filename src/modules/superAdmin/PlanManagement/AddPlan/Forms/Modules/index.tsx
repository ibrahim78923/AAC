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

import { useAppSelector } from '@/redux/store';
import { useGetPermissionsByProductsQuery } from '@/services/superAdmin/plan-mangement';

const Modules = ({ methods, handleSubmit }: any) => {
  const { theme, isAccordionExpanded, handleExpandAccordionChange } =
    useModules();
  // const { data, isSuccess } = useGetProductsFeaturesAllQuery({});
  const { planManagement }: any = useAppSelector(
    (state: any) => state?.planManagementForms,
  );
  const { data: modulesPermissions } = useGetPermissionsByProductsQuery({
    id: planManagement?.addPlanForm?.productId,
  });

  const productIdArray = planManagement?.addPlanForm?.suite; // Replace with your actual array of productIds
  const modulesPermissionsArray = [];

  for (const productId of productIdArray) {
    const { data: modulesPermissions } = useGetPermissionsByProductsQuery({
      id: productId,
    });

    modulesPermissionsArray.push(modulesPermissions);
  }

  // let productFeatures: any;
  // if (isSuccess) {
  //   productFeatures = data;
  // }

  // const productModules = isNullOrEmpty(planManagement?.addPlanForm?.suite)
  //   ? planManagement?.addPlanForm?.productId?.map((module: any) => {
  //       const products = productFeatures?.data?.productfeatures?.find(
  //         (id: any) => id?.productId === module,
  //       );
  //       return {
  //         productName: products?.productName,
  //       };
  //     })
  //   : planManagement?.addPlanForm?.suite?.map((module: any) => {
  //       const products = productFeatures?.data?.productfeatures?.find(
  //         (id: any) => id?.productId === module,
  //       );
  //       return {
  //         productName: products?.productName,
  //       };
  //     });

  // const productModulesPermissions = productModules?.map((productName: any) => {
  //   return {
  //     productName: productName?.productName,
  //     permissions: SUPER_ADMIN_PLAN_MANAGEMENT_PERMISSIONS?.filter(
  //       (permissionsArray) =>
  //         permissionsArray?.ProductName === productName?.productName,
  //     ),
  //   };
  // });
  const groupedData: any = {};
  modulesPermissions?.data.forEach((item: any) => {
    // Extract module name
    const moduleName = item.module; // Replace with the actual property name

    // If the module name is not already a key in groupedData, create an array for it
    if (!groupedData[moduleName]) {
      groupedData[moduleName] = [];
    }

    // Extract relevant properties and push into the array
    groupedData[moduleName].push({
      slug: item.slug,
      name: item.name,
      subModule: item.subModule,
      // Add other properties as needed
    });
  });
  const groupedDataCrm: any = {};
  modulesPermissionsArray?.map((modulesPermissions: any) => {
    return modulesPermissions?.data.forEach((item: any) => {
      // Extract module name
      const moduleName = item.module; // Replace with the actual property name

      // If the module name is not already a key in groupedData, create an array for it
      if (!groupedDataCrm[moduleName]) {
        groupedDataCrm[moduleName] = [];
      }

      // Extract relevant properties and push into the array
      groupedDataCrm[moduleName].push({
        slug: item.slug,
        name: item.name,
        subModule: item.subModule,
        // Add other properties as needed
      });
    });
  });

  return (
    <div>
      {planManagement?.addPlanForm?.productId.length > 0
        ? Object.keys(groupedData).map((productModulePermissions: any) => (
            <Accordion
              key={uuidv4()}
              expanded={isAccordionExpanded === productModulePermissions}
              onChange={handleExpandAccordionChange(productModulePermissions)}
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
                aria-controls={`accordion-${productModulePermissions}`}
                id={`accordion-${productModulePermissions}`}
              >
                <Box display="flex" alignItems="center">
                  <FormControlLabel control={<SwitchBtn />} label="" />
                  <Typography variant="h4">
                    {productModulePermissions}
                  </Typography>
                </Box>
              </AccordionSummary>

              <AccordionDetails>
                <SubModulesAccordion
                  key={uuidv4()}
                  subModules={groupedData[productModulePermissions]}
                  methods={methods}
                  name={productModulePermissions}
                  value={productModulePermissions}
                  handleSubmit={handleSubmit}
                />
              </AccordionDetails>
            </Accordion>
          ))
        : Object.keys(groupedDataCrm).map((productModulePermissions: any) => (
            <Accordion
              key={uuidv4()}
              expanded={isAccordionExpanded === productModulePermissions}
              onChange={handleExpandAccordionChange(productModulePermissions)}
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
                aria-controls={`accordion-${productModulePermissions}`}
                id={`accordion-${productModulePermissions}`}
              >
                <Box display="flex" alignItems="center">
                  <FormControlLabel control={<SwitchBtn />} label="" />
                  <Typography variant="h4">
                    {productModulePermissions}
                  </Typography>
                </Box>
              </AccordionSummary>

              <AccordionDetails>
                <SubModulesAccordion
                  key={uuidv4()}
                  subModules={groupedDataCrm[productModulePermissions]}
                  methods={methods}
                  name={productModulePermissions}
                  value={productModulePermissions}
                  handleSubmit={handleSubmit}
                />
              </AccordionDetails>
            </Accordion>
          ))}
    </div>
  );
};

export default Modules;
