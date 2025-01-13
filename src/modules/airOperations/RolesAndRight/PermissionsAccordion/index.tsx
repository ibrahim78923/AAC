import { Box, Grid } from '@mui/material';
import { RHFCheckbox } from '@/components/ReactHookForm';
import ApiErrorState from '@/components/ApiErrorState';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { usePermissionsAccordion } from './usePermissionsAccordion';
import { AntSwitch } from '@/components/AntSwitch';
import { Fragment } from 'react';
import { pxToRem } from '@/utils/getFontValue';
import { CustomAccordion } from '@/components/CustomAccordion';
import { CustomLinearProgress } from '@/components/ProgressBars/CustomLinearProgress';
import { ACCORDION_VARIANTS } from '@/constants/mui-constant';

export const PermissionsAccordion = (props: any) => {
  const { disabled } = props;
  const {
    isError,
    isLoading,
    isFetching,
    data,
    switchChangeHandler,
    isSettingPermission,
    checkAllPermissions,
    refetch,
  } = usePermissionsAccordion(props);

  if (isError) return <ApiErrorState canRefresh refresh={refetch} />;

  if (isLoading || isFetching) return <SkeletonTable />;

  return (
    <>
      {data?.data?.permissions?.map((parent: any) => (
        <Fragment key={parent?.name}>
          {isSettingPermission?.isLoading &&
          isSettingPermission?.name === parent?.name ? (
            <Box height={pxToRem(20)} width="100%" mb={2}>
              <CustomLinearProgress
                customStyles={{ my: 2 }}
                width="100%"
                backgroundBarColor="primary.light"
              />
            </Box>
          ) : (
            <CustomAccordion
              key={parent?.name}
              summaryTitle={parent?.name}
              accordionSummary={
                <AntSwitch
                  size="small"
                  checked={checkAllPermissions(parent)}
                  onChange={(e: any) => switchChangeHandler?.(e, parent)}
                  isLoading={
                    isSettingPermission?.isLoading &&
                    isSettingPermission?.name === parent?.name
                  }
                  disabled={isSettingPermission?.isLoading || disabled}
                />
              }
            >
              {parent?.subModules?.map((subModule: any) => (
                <CustomAccordion
                  variantType={ACCORDION_VARIANTS?.INHERIT}
                  key={subModule?.subModule}
                  summaryTitle={subModule?.name}
                >
                  <Grid container spacing={1}>
                    {subModule?.permissions?.map((item: any) => (
                      <Grid item xs={12} md={4} key={item?.slug}>
                        <RHFCheckbox
                          name={item?.slug}
                          label={item?.name}
                          disabled={disabled}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </CustomAccordion>
              ))}
            </CustomAccordion>
          )}
        </Fragment>
      ))}
    </>
  );
};
