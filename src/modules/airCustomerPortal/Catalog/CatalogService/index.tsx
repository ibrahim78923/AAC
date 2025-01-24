import { Box, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { CatalogRequest } from '../CatalogRequest';
import useCatalogService from './useCatalogService';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { customizePortalDefaultValues } from '@/layout/CustomerPortal/CustomerPortal.data';
import { Theme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AIR_CUSTOMER_PORTAL } from '@/constants/routes';
import { AvatarInfoCard } from '@/components/Cards/AvatarInfoCard';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';

const CatalogService = () => {
  const {
    open,
    setOpen,
    servicesDetails,
    isError,
    refetch,
    router,
    theme,
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
          <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1}>
            <Typography
              variant="h3"
              sx={{ color: theme?.palette?.primary?.main }}
            >
              Tickets
            </Typography>
            <ArrowForwardIosIcon fontSize="small" />
            <Typography variant="h5">
              {servicesDetails?.data?.itemName}
            </Typography>
          </Box>
        }
      />
      <ContainerGrid>
        <CustomGrid xs={12} md={6} lg={4}>
          <AvatarInfoCard
            name={servicesDetails?.data?.itemName}
            description={servicesDetails?.data?.description}
            info={servicesDetails?.data?.cost}
            avatarSrc={servicesDetails?.data?.attachmentDetails?.fileUrl}
          />
        </CustomGrid>
      </ContainerGrid>

      <Box my={1}>
        <Typography variant="h5">{servicesDetails?.data?.itemName}</Typography>
        <Typography variant="body1" my={1} color="blue.lighter">
          Description:
        </Typography>
        {!!servicesDetails?.data?.description ? (
          <Typography
            color="blue.lighter"
            variant="body4"
            dangerouslySetInnerHTML={{
              __html: servicesDetails?.data?.description,
            }}
          />
        ) : (
          '---'
        )}
      </Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'end'}
        position={'absolute'}
        bottom={'1rem'}
        right={'2rem'}
        gap={2}
      >
        <LoadingButton
          className="small"
          variant="outlined"
          color="secondary"
          onClick={() => router?.push(AIR_CUSTOMER_PORTAL?.CATALOG_SERVICES)}
        >
          Cancel
        </LoadingButton>
        <LoadingButton
          className="small"
          variant="contained"
          onClick={() => setOpen?.(true)}
          sx={(theme: Theme) => ({
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
        </LoadingButton>
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
