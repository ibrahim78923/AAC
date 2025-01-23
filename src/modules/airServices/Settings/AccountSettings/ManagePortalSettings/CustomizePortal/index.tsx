import { FormProvider } from '@/components/ReactHookForm';
import { Box, Typography } from '@mui/material';
import Customizations from './Customizations';
import Preview from './Preview';
import useCustomizePortal from './useCustomizePortal';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { CustomGrid } from '@/components/Grids/CustomGrid';

const CustomizePortal = () => {
  const {
    watch,
    methods,
    handleSubmit,
    onSubmit,
    reset,
    customizationsDataArray,
    isLoading,
    isFetching,
    isError,
    refetch,
    patchCustomerPortalStylingsStatus,
  } = useCustomizePortal();

  return (
    <CustomGrid isContainer>
      {isLoading || isFetching ? (
        <CustomGrid>
          <Box
            border={1}
            borderColor={'grey.700'}
            p={2}
            borderRadius={4}
            maxHeight={'65vh'}
            overflow={'auto'}
          >
            <SkeletonTable />
          </Box>
        </CustomGrid>
      ) : isError ? (
        <CustomGrid>
          <Box
            border={1}
            borderColor={'grey.700'}
            p={2}
            borderRadius={4}
            maxHeight={'65vh'}
            overflow={'auto'}
          >
            <ApiErrorState canRefresh refresh={refetch} />
          </Box>
        </CustomGrid>
      ) : (
        <>
          <CustomGrid lg={8}>
            <Box
              border={1}
              borderColor={'grey.700'}
              p={2}
              borderRadius={4}
              maxHeight={'65vh'}
              overflow={'auto'}
            >
              <Typography variant={'h3'} color={'blue.main'} mb={2}>
                Preview
              </Typography>
              <Preview watch={watch} />
            </Box>
          </CustomGrid>

          <CustomGrid lg={4}>
            <Box
              border={1}
              borderColor={'grey.700'}
              p={2}
              borderRadius={4}
              maxHeight={'65vh'}
              overflow={'auto'}
            >
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Customizations
                  reset={reset}
                  customizationsDataArray={customizationsDataArray}
                  patchCustomerPortalStylingsStatus={
                    patchCustomerPortalStylingsStatus
                  }
                />
              </FormProvider>
            </Box>
          </CustomGrid>
        </>
      )}
    </CustomGrid>
  );
};

export default CustomizePortal;
