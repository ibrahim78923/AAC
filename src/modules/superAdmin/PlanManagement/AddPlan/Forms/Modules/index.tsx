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
import { useGetProductsQuery } from '@/services/common-APIs';
import { isNullOrEmpty } from '@/utils';

const Modules = ({
  methods,
  handleSubmit,
  selectedPermission,
  selectAllPermissions,
  getModulePermissions,
  editPlan,
  handleExpandAccordionChange,
  handleChangeSubModule,
  selectedModule,
  selectedSubModule,
}: any) => {
  const { theme } = useModules();
  let prevProductId: any = null;

  const { planManagement }: any = useAppSelector(
    (state: any) => state?.planManagementForms,
  );
  const { data: productPermissionsData } = useGetProductsPermissionsQuery({
    productId: planManagement?.addPlanForm?.productId,
  });
  const { data: modulesPermissions } = useGetPermissionsByProductsQuery({
    id: planManagement?.addPlanForm?.productId,
  });

  let productIdArray: any = [];
  if (!isNullOrEmpty(planManagement?.addPlanForm?.suite)) {
    productIdArray = planManagement?.addPlanForm?.suite;
  }

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

  const { data: productList } = useGetProductsQuery({});

  const productsOptions = productList?.data?.map((product: any) => ({
    value: product?._id,
    label: product?.name,
  }));

  return (
    <div>
      {productPermissionsData?.data?.map((item: any) => (
        <Accordion
          key={uuidv4()}
          disableGutters
          expanded={selectedModule === item?.name?.toLowerCase()}
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
            onClick={() => {
              handleExpandAccordionChange(item?.name?.toLowerCase());
            }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="dashboard"
            id="dashboard"
          >
            <Box display="flex" alignItems="center">
              <FormControlLabel
                control={
                  <SwitchBtn
                    checked={getModulePermissions(item?.subModules)?.every(
                      (permission: any) =>
                        selectedPermission?.includes(permission),
                    )}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                      event.stopPropagation();
                      selectAllPermissions(item?.subModules);
                    }}
                  />
                }
                label=""
              />
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
              editPlan={editPlan?.planProductPermissions[0]?.permissionSlugs}
              handleChangeSubModule={handleChangeSubModule}
              selectedSubModule={selectedSubModule}
            />
          </AccordionDetails>
        </Accordion>
      ))}

      {modulesPermissionsArray?.map((perProduct: any) => (
        <>
          {perProduct?.data?.map(
            (itema: any) =>
              itema?.subModules?.map(
                (itemb: any) =>
                  itemb?.permissions?.map((itemc: any) => {
                    const currentProductId = itemc?.productId;
                    const productName =
                      productList &&
                      productsOptions?.find(
                        (obj: any) => obj?.value === currentProductId,
                      )?.label;

                    if (currentProductId !== prevProductId) {
                      prevProductId = currentProductId;
                      return (
                        <Typography variant="h4" my={2} key={uuidv4()}>
                          {productName}
                        </Typography>
                      );
                    } else {
                      return null;
                    }
                  }),
              ),
          )}

          {perProduct?.data?.map((item: any) => (
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
                  <FormControlLabel
                    control={
                      <SwitchBtn
                        checked={getModulePermissions(item?.subModules)?.every(
                          (permission: any) =>
                            selectedPermission?.includes(permission),
                        )}
                        onClick={() => {
                          selectAllPermissions(item?.subModules);
                        }}
                      />
                    }
                    label=""
                  />
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
        </>
      ))}
    </div>
  );
};

export default Modules;
