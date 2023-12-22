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
import { useGetProductsPermissionsQuery } from '@/services/orgAdmin/roles-and-rights';

const Modules = ({ methods, handleSubmit }: any) => {
  const { theme } = useModules();

  const { planManagement }: any = useAppSelector(
    (state: any) => state?.planManagementForms,
  );
  const { data: productPermissionsData } = useGetProductsPermissionsQuery({
    productId: planManagement?.addPlanForm?.productId,
  });
  const { data: modulesPermissions } = useGetPermissionsByProductsQuery({
    id: planManagement?.addPlanForm?.productId,
  });

  const productIdArray = planManagement?.addPlanForm?.suite;
  const modulesPermissionsArray = [];

  for (const productId of productIdArray) {
    const { data: modulesPermissions } = useGetPermissionsByProductsQuery({
      id: productId,
    });

    modulesPermissionsArray.push(modulesPermissions);
  }

  const groupedData: any = {};
  modulesPermissions?.data?.forEach((item: any) => {
    const moduleName = item?.module;

    if (!groupedData[moduleName]) {
      groupedData[moduleName] = [];
    }

    groupedData[moduleName].push({
      slug: item?.slug,
      name: item?.name,
      subModule: item?.subModule,
    });
  });
  const groupedDataCrm: any = {};
  modulesPermissionsArray?.map((modulesPermissions: any) => {
    return modulesPermissions?.data.forEach((item: any) => {
      const moduleName = item?.module;
      if (!groupedDataCrm[moduleName]) {
        groupedDataCrm[moduleName] = [];
      }
      groupedDataCrm[moduleName].push({
        slug: item?.slug,
        name: item?.name,
        subModule: item?.subModule,
      });
    });
  });

  return (
    <div>
      {productPermissionsData?.data?.map((item: any) => (
        <Accordion
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
              color: theme.palette.common.white,
              borderRadius: '8px',
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="dashboard"
            id="dashboard"
          >
            <Box display="flex" alignItems="center">
              <FormControlLabel control={<SwitchBtn />} label="" />
              <Typography variant="h4" fontWeight={700}>
                {item?.name}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <SubModulesAccordion
              subModules={item?.subModules}
              methods={methods}
              handleSubmit={handleSubmit}
            />
          </AccordionDetails>
        </Accordion>
      ))}
      {/* {!isNullOrEmpty(planManagement?.addPlanForm?.productId)
        ? Object?.keys(groupedData)?.map((productModulePermissions: any) => (
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
        : Object?.keys(groupedDataCrm).map((productModulePermissions: any) => (
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
          ))} */}
    </div>
  );
};

export default Modules;
