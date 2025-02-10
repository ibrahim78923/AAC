import { Box, Typography } from '@mui/material';
import { CatalogRequest } from '../CatalogRequest';
import useCatalogService from './useCatalogService';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { customizePortalDefaultValues } from '@/layout/CustomerPortal/CustomerPortal.data';
import { Theme } from '@mui/material';
import { AIR_CUSTOMER_PORTAL } from '@/constants/routes';
import { AvatarInfoCard } from '@/components/Cards/AvatarInfoCard';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { SingleBreadcrumb } from '@/components/Breadcrumbs/SingleBreadcrumb';
import { HtmlRenderer } from '@/components/DataDisplay/HtmlRenderer';
import { CustomLoadingButton } from '@/components/Buttons/CustomLoadingButton';

const CatalogService = () => {
  const {
    open,
    setOpen,
    servicesDetails,
    isError,
    refetch,
    router,
    companyId,
    portalStyles,
    showLoader,
  } = useCatalogService();

  return (
    <ApiRequestFlow
      showSkeleton={showLoader}
      hasError={isError}
      refreshApi={refetch}
    >
      <PageTitledHeader
        canMovedBack
        moveBack={() => {
          router?.push({
            pathname: AIR_CUSTOMER_PORTAL?.CATALOG_SERVICES,
            query: { ...(!!companyId && { companyId }) },
          });
        }}
        title={
          <SingleBreadcrumb
            previousPathname="Tickets"
            activePathname={servicesDetails?.data?.itemName}
          />
        }
      />

      <ContainerGrid>
        <CustomGrid md={6} lg={4}>
          <AvatarInfoCard
            name={servicesDetails?.data?.itemName}
            description={servicesDetails?.data?.description}
            info={servicesDetails?.data?.cost}
            avatarSrc={servicesDetails?.data?.attachmentDetails?.fileUrl}
          />
        </CustomGrid>
      </ContainerGrid>
      <Box mt={1} mb={2}>
        <Typography variant="h5">{servicesDetails?.data?.itemName}</Typography>
        <Typography variant="body1" my={1} color="blue.lighter">
          Description:
        </Typography>
        {!!servicesDetails?.data?.description ? (
          <HtmlRenderer
            hasEditor
            maxHeight="none"
            description={servicesDetails?.data?.description}
          />
        ) : (
          <Typography>No description available</Typography>
        )}
      </Box>
      <br />
      <br />
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'flex-end'}
        gap={2}
        position={'absolute'}
        bottom={'1rem'}
        right={'1rem'}
      >
        <CustomLoadingButton
          primary={false}
          onClick={() => router?.push(AIR_CUSTOMER_PORTAL?.CATALOG_SERVICES)}
          customStyles={(theme: Theme) => ({
            borderColor:
              portalStyles?.btnSecondary ||
              customizePortalDefaultValues(theme)?.btnSecondary,
            color:
              portalStyles?.btnSecondary ||
              customizePortalDefaultValues(theme)?.btnSecondary,
            '&:hover': {
              borderColor:
                portalStyles?.btnSecondary ||
                customizePortalDefaultValues(theme)?.btnSecondary,
              color:
                portalStyles?.btnSecondary ||
                customizePortalDefaultValues(theme)?.btnSecondary,
            },
          })}
        >
          Cancel
        </CustomLoadingButton>
        <CustomLoadingButton
          onClick={() => setOpen?.(true)}
          customStyles={(theme: Theme) => ({
            bgcolor:
              portalStyles?.btnPrimary ||
              customizePortalDefaultValues(theme)?.btnPrimary,
            color: 'common.white',
            '&:hover': {
              bgcolor:
                portalStyles?.btnPrimary ||
                customizePortalDefaultValues(theme)?.btnPrimary,
              color: 'common.white',
            },
          })}
        >
          Place Request
        </CustomLoadingButton>
      </Box>

      {open && (
        <CatalogRequest
          open={open}
          setOpen={setOpen}
          servicesDetails={servicesDetails}
        />
      )}
    </ApiRequestFlow>
  );
};

export default CatalogService;
