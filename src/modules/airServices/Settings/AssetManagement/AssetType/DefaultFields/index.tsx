import { PageTitledHeader } from '@/components/PageTitledHeader';
import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { AIR_SERVICES } from '@/constants/routes';
import { Box, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { predefinedAssetTypeDataArray } from './DefaultFields.data';
import { LoadingButton } from '@mui/lab';
import { useFormLib } from '@/hooks/useFormLib';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { HeadingFormGrid } from '@/components/Grids/HeadingFormGrid';

export default function DefaultFields() {
  const theme: any = useTheme();
  const { methods } = useFormLib({});
  const router: any = useRouter();

  const moveBack = () => {
    router?.push({
      pathname: AIR_SERVICES?.ASSET_TYPE_SETTINGS,
    });
  };

  return (
    <>
      <PageTitledHeader
        moveBack={() => moveBack?.()}
        canMovedBack
        title={'Default Fields'}
      />

      <FormProvider methods={methods}>
        <ContainerGrid rowSpacing={1.8} columnSpacing={2}>
          <CustomGrid lg={9}>
            <Box
              p={2}
              borderRadius={3}
              border={`2px solid ${theme?.palette?.custom?.off_white_three}`}
            >
              <HeadingFormGrid
                formFieldsList={predefinedAssetTypeDataArray}
                rowSpacing={1.8}
                columnSpacing={3}
                disabled
              />
              <Box sx={{ display: { lg: 'none', xs: 'block' } }}>
                <RHFDropZone name={'fileUrl'} disabled />
              </Box>
            </Box>

            <Box display={'flex'} justifyContent={'flex-end'} mt={2}>
              <LoadingButton
                variant="outlined"
                color="secondary"
                className="small"
                onClick={() => moveBack?.()}
              >
                Back
              </LoadingButton>
            </Box>
          </CustomGrid>
          <CustomGrid
            lg={3}
            customStyles={{ display: { xs: 'none', lg: 'block' } }}
          >
            <RHFDropZone name={'fileUrl'} disabled />
          </CustomGrid>
        </ContainerGrid>
      </FormProvider>
    </>
  );
}
