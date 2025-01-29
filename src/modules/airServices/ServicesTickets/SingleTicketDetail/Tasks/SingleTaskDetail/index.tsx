import { Avatar, Typography } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import {
  FormProvider,
  RHFAutocomplete,
  RHFTextField,
} from '@/components/ReactHookForm';
import { styles } from './SingleTaskDetail.styles';
import { useSingleTaskDetail } from './useSingleTaskDetail';
import { drawerDetail, statusOptions } from './SingleTaskDetail.data';
import {
  generateColorFromName,
  generateImage,
  getImageByType,
} from '@/utils/avatarUtils';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { isValidElement } from 'react';
import { DYNAMIC_FORM_FIELDS_TYPES, isValidDate } from '@/utils/dynamic-forms';
import { uiDateFormat } from '@/lib/date-time';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';

export const SingleTaskDetail = () => {
  const {
    theme,
    methods,
    handleSubmit,
    onSubmitDrawer,
    isLoading,
    handleCloseDrawer,
    overviewData,
    isPortalOpen,
  } = useSingleTaskDetail();

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isOpen as boolean}
        onClose={() => handleCloseDrawer()}
        title={`#TSK-${isPortalOpen?.data?._id?.slice(-3)?.toUpperCase()}`}
        submitHandler={handleSubmit(onSubmitDrawer)}
        footer
        isOk
        okText="Update"
        isCancel={false}
        isLoading={isLoading}
      >
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_TICKETS_TICKETS_DETAILS?.VIEW_TASK_DETAILS,
          ]}
        >
          <FormProvider
            onSubmit={handleSubmit(onSubmitDrawer)}
            methods={methods}
          >
            <Typography variant="body2" mb={-2}>
              {isPortalOpen?.data?.assignedUser?.email ?? '---'}
            </Typography>
            <CustomGrid xs={10}>
              <RHFAutocomplete
                name="status"
                sx={styles?.statusFieldStyle}
                options={statusOptions}
                size="small"
                isOptionEqualToValue={(option: any, newValue: any) =>
                  option === newValue
                }
              />
            </CustomGrid>
            <ContainerGrid
              spacing={2.5}
              customStyles={{ mt: 2, flexDirection: 'column' }}
            >
              {drawerDetail(isPortalOpen?.data, theme)?.map((item: any) => (
                <CustomGrid
                  key={item?.id}
                  customStyles={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <CustomGrid
                    xs={6}
                    customStyles={styles?.detailDrawerCustomGridCenter}
                  >
                    <Typography
                      variant="body2"
                      sx={styles?.detailDrawerTitle(theme)}
                    >
                      {item?.title}
                    </Typography>
                  </CustomGrid>
                  <CustomGrid
                    xs={6}
                    customStyles={styles?.detailDrawerCustomGridCenter}
                  >
                    {item?.profile && (
                      <Avatar
                        style={styles?.detailDrawerImg}
                        src={generateImage(item?.profile)}
                        alt=""
                      />
                    )}
                    {item?.workspace && (
                      <Avatar
                        sx={{
                          bgcolor: generateColorFromName(item?.workspace),
                          width: 25,
                          height: 25,
                          fontSize: 14,
                          mr: 0.5,
                        }}
                        variant="rounded"
                      >
                        {item?.workspace?.slice?.(0, 2)?.toUpperCase()}
                      </Avatar>
                    )}
                    <Typography
                      variant="body2"
                      fontWeight={400}
                      color={'slateBlue.main'}
                    >
                      {item?.details ? item?.details : '....'}
                    </Typography>
                  </CustomGrid>
                </CustomGrid>
              ))}

              {Object?.entries(overviewData)?.map(([key, value]: any) => (
                <CustomGrid
                  key={key}
                  customStyles={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <CustomGrid
                    xs={6}
                    customStyles={styles?.detailDrawerCustomGridCenter}
                  >
                    <Typography
                      variant={'body2'}
                      sx={styles?.detailDrawerTitle(theme)}
                    >
                      {key}:
                    </Typography>
                  </CustomGrid>
                  <CustomGrid xs={6}>
                    <Typography
                      variant={'body2'}
                      fontWeight={400}
                      color={'slateBlue.main'}
                    >
                      {isValidElement(value) ? (
                        value
                      ) : typeof value === DYNAMIC_FORM_FIELDS_TYPES?.OBJECT &&
                        value !== null &&
                        DYNAMIC_FORM_FIELDS_TYPES?.LABEL in value ? (
                        value?.label
                      ) : typeof value === DYNAMIC_FORM_FIELDS_TYPES?.OBJECT &&
                        value !== null &&
                        DYNAMIC_FORM_FIELDS_TYPES?.FILE_URL in value ? (
                        <Avatar
                          src={getImageByType(value?.fileType, value?.fileUrl)}
                          alt="file-preview"
                          sx={{ width: 45, height: 45 }}
                          variant={'rounded'}
                        />
                      ) : isValidDate(value) ? (
                        uiDateFormat(value)
                      ) : (
                        value?.toString()
                      )}
                    </Typography>
                  </CustomGrid>
                </CustomGrid>
              ))}
              <CustomGrid>
                <RHFTextField
                  name="comments"
                  label="Add Comment"
                  multiline={true}
                  rows={5}
                  fullWidth
                  placeholder="Type here"
                />
              </CustomGrid>
            </ContainerGrid>
          </FormProvider>
        </PermissionsGuard>
      </CommonDrawer>
    </>
  );
};
