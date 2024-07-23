import React from 'react';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControlLabel,
  Box,
  CircularProgress,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { SwitchBtn } from '@/components/SwitchButton';

import { useModules } from './useModules';
import SubModulesAccordion from './SubModulesAccordian';

import { v4 as uuidv4 } from 'uuid';

import { useAppSelector } from '@/redux/store';
import {
  useGetPermissionsByProductsQuery,
  useGetProductsPermissionsPlanQuery,
} from '@/services/superAdmin/plan-mangement';
import { useGetProductsQuery } from '@/services/common-APIs';
import { isNullOrEmpty } from '@/utils';
import { Module, ModulesProps, SubModule } from './modules.interface';

const Modules = ({
  methods,
  handleSubmit,
  selectedPermission,
  selectAllPermissions,
  getModulePermissions,
  handleExpandAccordionChange,
  handleChangeSubModule,
  selectedModule,
  selectedSubModule,
  updatePlanLoading,
  isLoading,
}: ModulesProps) => {
  const { theme } = useModules();
  let prevProductId: string | null = null;

  const planManagement: any = useAppSelector(
    (state: any) => state?.planManagementForms,
  );
  const {
    data: productPermissionsData,
    isLoading: GetSinglePermissionsLoading,
  } = useGetProductsPermissionsPlanQuery({
    productId: planManagement?.addPlanForm?.productId,
  });
  const { data: modulesPermissions } = useGetPermissionsByProductsQuery({
    id: planManagement?.addPlanForm?.productId,
  });

  let productIdArray: string[] = [];
  if (!isNullOrEmpty(planManagement?.addPlanForm?.suite)) {
    productIdArray = planManagement?.addPlanForm?.suite;
  }

  const modulesPermissionsArray: any = [];
  let isLoadingMultiple;
  for (const productId of productIdArray) {
    const { data: modulesPermissions, isLoading } =
      useGetPermissionsByProductsQuery({
        id: productId,
      });
    isLoadingMultiple = isLoading;
    modulesPermissionsArray.push(modulesPermissions);
  }

  const groupedData: { [key: string]: SubModule[] } = {};
  modulesPermissions?.data?.forEach((item: Module) => {
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
  const groupedDataCrm: { [key: string]: SubModule[] } = {};
  modulesPermissionsArray?.map((modulesPermissions: any) => {
    return modulesPermissions?.data.forEach((item: Module) => {
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
      {isLoading?.isLoading ||
      updatePlanLoading ||
      isLoadingMultiple ||
      GetSinglePermissionsLoading ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '50vh',
          }}
        >
          <CircularProgress />{' '}
        </Box>
      ) : (
        <>
          {isNullOrEmpty(planManagement?.addPlanForm?.suite) &&
            productPermissionsData?.data?.map((item: Module) => (
              <Accordion
                key={uuidv4()}
                disableGutters
                expanded={
                  selectedModule ===
                  `${item?.subModules[0]?.permissions[0]?.productId}:${item?.name}`
                }
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
                    handleExpandAccordionChange(
                      `${item?.subModules[0]?.permissions[0]?.productId}:${item?.name}`,
                    );
                  }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="dashboard"
                  id="dashboard"
                >
                  <Box display="flex" alignItems="center">
                    <FormControlLabel
                      control={
                        <SwitchBtn
                          checked={getModulePermissions(
                            item?.subModules,
                          )?.every(
                            (permission: any) =>
                              selectedPermission?.includes(permission),
                          )}
                          onClick={(
                            event: React.MouseEvent<HTMLButtonElement>,
                          ) => {
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
                  {selectedModule ===
                    `${item?.subModules[0]?.permissions[0]?.productId}:${item?.name}` && (
                    <SubModulesAccordion
                      subModules={item?.subModules}
                      methods={methods}
                      handleSubmit={handleSubmit}
                      handleChangeSubModule={handleChangeSubModule}
                      selectedSubModule={selectedSubModule}
                    />
                  )}
                </AccordionDetails>
              </Accordion>
            ))}

          {modulesPermissionsArray?.map((perProduct: any) => (
            <>
              {perProduct?.data?.map(
                (itema: Module) =>
                  itema?.subModules?.map(
                    (itemb: SubModule) =>
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

              {perProduct?.data?.map((item: Module) => (
                <Accordion
                  key={uuidv4()}
                  disableGutters
                  expanded={
                    selectedModule ===
                    `${item?.subModules[0]?.permissions[0]?.productId}:${item?.name}`
                  }
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
                    onClick={() => {
                      handleExpandAccordionChange(
                        `${item?.subModules[0]?.permissions[0]?.productId}:${item?.name}`,
                      );
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <FormControlLabel
                        control={
                          <SwitchBtn
                            checked={getModulePermissions(
                              item?.subModules,
                            )?.every(
                              (permission: any) =>
                                selectedPermission?.includes(permission),
                            )}
                            onClick={(
                              event: React.MouseEvent<HTMLButtonElement>,
                            ) => {
                              event.stopPropagation();
                              selectAllPermissions(
                                item?.subModules,
                                `${item?.subModules[0]?.permissions[0]?.productId}:${item?.name}`,
                              );
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
                    {selectedModule ===
                      `${item?.subModules[0]?.permissions[0]?.productId}:${item?.name}` && (
                      <SubModulesAccordion
                        subModules={item?.subModules}
                        methods={methods}
                        handleSubmit={handleSubmit}
                        handleChangeSubModule={handleChangeSubModule}
                        selectedSubModule={selectedSubModule}
                      />
                    )}
                  </AccordionDetails>
                </Accordion>
              ))}
            </>
          ))}
        </>
      )}
    </div>
  );
};

export default Modules;
