import { Box, Typography } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import {
  FormProvider,
  RHFAutocomplete,
  RHFTextField,
} from '@/components/ReactHookForm';
import { styles } from './SingleTaskDetail.styles';
import { useSingleTaskDetail } from './useSingleTaskDetail';
import { drawerDetail, statusOptions } from './SingleTaskDetail.data';
import { generateColorFromName } from '@/utils/avatarUtils';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { DynamicFormDataDisplay } from '@/components/DynamicForm/DynamicFormDataDisplay';
import { CustomAvatar } from '@/components/Avatars/CustomAvatar';
import { AVATAR_VARIANTS } from '@/constants/mui-constant';
import { pxToRem } from '@/utils/getFontValue';

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
        titleSx={{ width: '100%' }}
        titleBoxSx={{ flex: 1, marginBottom: 0.2 }}
        title={
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              mb: 0,
              flexWrap: 'wrap',
              paddingRight: 1,
            }}
          >
            <Typography variant="body2" sx={{ flex: 1 }}>
              {`#TSK-${isPortalOpen?.data?._id?.slice(-3)?.toUpperCase()}`}
            </Typography>
            <Box sx={{ flex: 1 }}>
              <FormProvider
                onSubmit={handleSubmit(onSubmitDrawer)}
                methods={methods}
              >
                <RHFAutocomplete
                  name="status"
                  fullWidth
                  sx={{
                    minWidth: { xs: 'inherit', sm: pxToRem(200) },
                    '.MuiInputBase-input': {
                      padding: `${pxToRem(5)} !important`,
                    },
                    '.MuiFormHelperText-root': {
                      display: 'none',
                    },
                    '& .MuiOutlinedInput-root ': {
                      height: pxToRem(36),
                    },
                  }}
                  options={statusOptions}
                  size="small"
                  isOptionEqualToValue={(option: any, newValue: any) =>
                    option === newValue
                  }
                />
              </FormProvider>
            </Box>
          </Box>
        }
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
            <br />
            <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
              {isPortalOpen?.data?.assignedUser?.email ?? '---'}
            </Typography>

            <br />
            {drawerDetail(isPortalOpen?.data, theme)?.map((item: any) => (
              <Box
                key={item?.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  my: 2,
                  gap: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant="body2"
                    sx={styles?.detailDrawerTitle(theme)}
                  >
                    {item?.title}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {item?.profile && <CustomAvatar avatarSrc={item?.profile} />}
                  {item?.workspace && (
                    <CustomAvatar
                      backgroundColor={generateColorFromName(item?.workspace)}
                      avatarSize={{
                        variant: AVATAR_VARIANTS?.ROUNDED,
                      }}
                      avatarSrc=""
                      nameInitial={item?.workspace?.slice?.(0, 2)}
                    />
                  )}
                  <Typography
                    variant="body2"
                    fontWeight={400}
                    color={'slateBlue.main'}
                  >
                    {item?.details ? item?.details : '....'}
                  </Typography>
                </Box>
              </Box>
            ))}

            {Object?.entries(overviewData)?.map(([key, value]: any) => (
              <Box
                key={key}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  my: 2,
                  gap: 2,
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant={'body2'}
                    sx={styles?.detailDrawerTitle(theme)}
                  >
                    {key}:
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant={'body2'}
                    fontWeight={400}
                    color={'slateBlue.main'}
                  >
                    <DynamicFormDataDisplay value={value} />
                  </Typography>
                </Box>
              </Box>
            ))}
            <RHFTextField
              name="comments"
              label="Add Comment"
              multiline
              rows={5}
              fullWidth
              placeholder="Type here"
            />
          </FormProvider>
        </PermissionsGuard>
      </CommonDrawer>
    </>
  );
};
