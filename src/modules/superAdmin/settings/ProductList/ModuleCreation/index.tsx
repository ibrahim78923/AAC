import React, { useState } from 'react';

import { Box, Grid, Typography, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import CommonModal from '@/components/CommonModal';
import TanstackTable from '@/components/Table/TanstackTable';

import {
  editModuleDataArray,
  editModuleDefaultValues,
  editModuleValidationSchema,
  editRightDefaultValues,
  editRightValidationSchema,
  editSubModuleDefaultValues,
  editSubModuleValidationSchema,
  moduleCreationColumns,
  rightsColumns,
  subModuleColumns,
} from './ModuleCreation.data';

import { moduleCreationData } from '@/mock/modules/superAdmin/Settings/ProductList/ModuleCreation';

import { styles } from './ModuleCreation.style';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { v4 as uuidv4 } from 'uuid';

const ModuleCreation = () => {
  const theme = useTheme();

  const [subModuleData, setSubModuleData] = useState();
  const [rightsData, setRightsData] = useState();

  const [isShowSubModule, setIsShowSubModule] = useState(false);
  const [isShowRights, setIsShowRights] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editModalProperties, setEditModalProperties] = useState<any>();

  const handelModalProperties = (ele: any) => {
    if (ele) {
      setEditModalProperties({
        modalType: ele.modalType,
        rowData: ele.rowData,
      });
      setIsEditModalOpen(true);
    }
  };

  const getModuleCreationColumns = moduleCreationColumns(
    setSubModuleData,
    setIsShowSubModule,
    handelModalProperties,
    setIsShowRights,
  );
  const getSubModuleColumns = subModuleColumns(
    setRightsData,
    setIsShowRights,
    handelModalProperties,
  );
  const getRightsColumns = rightsColumns(handelModalProperties);

  const modalTitles: any = {
    module: 'Edit Module',
    subModule: 'Edit Sub Module',
    right: 'Edit Right',
  };
  const modalValidationSchema: any = {
    module: editModuleValidationSchema,
    subModule: editSubModuleValidationSchema,
    right: editRightValidationSchema,
  };
  const modalDefaultValues: any = {
    module: editModuleDefaultValues,
    subModule: editSubModuleDefaultValues,
    right: editRightDefaultValues,
  };

  const methodsModuleCreation = useForm({
    resolver: yupResolver(
      modalValidationSchema[editModalProperties?.modalType],
    ),
    defaultValues: modalDefaultValues[editModalProperties?.modalType] || {},
  });

  const onSubmit = () => {
    reset();
    setIsEditModalOpen(false);
  };
  const { handleSubmit, reset } = methodsModuleCreation;

  return (
    <Box>
      <Box sx={styles.moduleCreationMain(theme)}>
        <Box
          sx={{
            padding: '20px',
          }}
        >
          <Typography variant="h3" color={theme.palette.grey[800]}>
            Module creation
          </Typography>
          <Typography
            variant="h6"
            mt={2}
            color={theme.palette.custom.grayish_blue}
            fontWeight={600}
          >
            Modules
          </Typography>
        </Box>
        <TanstackTable
          columns={getModuleCreationColumns}
          data={moduleCreationData}
        />
      </Box>

      <Box
        mt={2}
        sx={{
          border: `1px solid ${theme.palette.grey[700]}`,
          borderRadius: '8px',
        }}
      >
        <Box sx={styles.subModuleHeader(theme)}>
          <Typography
            variant="h6"
            color={theme.palette.common.white}
            fontWeight={600}
          >
            Sub-Modules
          </Typography>
          <Box
            onClick={() => setIsShowSubModule(!isShowSubModule)}
            style={{ cursor: 'pointer' }}
          >
            <ArrowDropDownIcon
              sx={{
                color: '#fff',
                fontSize: 35,
                transform: isShowSubModule ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </Box>
        </Box>
        {subModuleData && isShowSubModule && (
          <TanstackTable columns={getSubModuleColumns} data={subModuleData} />
        )}
      </Box>

      <Box
        mt={2}
        sx={{
          border: `1px solid ${theme.palette.grey[700]}`,
          borderRadius: '8px',
        }}
      >
        <Box sx={styles.subModuleHeader(theme)}>
          <Typography
            variant="h6"
            color={theme.palette.common.white}
            fontWeight={600}
          >
            Rights
          </Typography>
          <Box
            onClick={() => setIsShowRights(!isShowRights)}
            style={{ cursor: 'pointer' }}
          >
            <ArrowDropDownIcon
              sx={{
                color: '#fff',
                fontSize: 35,
                transform: isShowRights ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </Box>
        </Box>
        {rightsData && isShowRights && (
          <TanstackTable columns={getRightsColumns} data={rightsData} />
        )}
      </Box>

      <CommonModal
        open={isEditModalOpen}
        handleSubmit={handleSubmit(onSubmit)}
        footer
        handleClose={() => setIsEditModalOpen(false)}
        title={modalTitles[editModalProperties?.modalType]}
        okText="Update"
      >
        <FormProvider
          methods={methodsModuleCreation}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={4}>
            {editModalProperties?.modalType === 'module' && (
              <Grid item xs={12} md={12}>
                <RHFTextField name="moduleId" label="Module ID" size="small" />
              </Grid>
            )}
            {['module', 'right'].includes(editModalProperties?.modalType) && (
              <Grid item xs={12} md={12}>
                <RHFTextField
                  name="moduleName"
                  label="Module Name"
                  size="small"
                />
              </Grid>
            )}
            {editModalProperties?.modalType === 'subModule' && (
              <Grid item xs={12} md={12}>
                <RHFTextField
                  name="subModuleId"
                  label="Sub Module ID"
                  size="small"
                />
              </Grid>
            )}
            {['subModule', 'right'].includes(
              editModalProperties?.modalType,
            ) && (
              <Grid item xs={12} md={12}>
                <RHFTextField
                  name="subModuleName"
                  label="Sub Module Name"
                  size="small"
                />
              </Grid>
            )}

            {editModalProperties?.modalType === 'right' && (
              <Grid item xs={12} md={12}>
                <RHFTextField
                  name="rightName"
                  label="Right Name"
                  size="small"
                />
              </Grid>
            )}

            {editModuleDataArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select
                    ? item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))
                    : null}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </CommonModal>
    </Box>
  );
};

export default ModuleCreation;
