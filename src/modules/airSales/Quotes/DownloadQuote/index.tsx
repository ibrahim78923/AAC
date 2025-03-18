import { useEffect } from 'react';
import CommonModal from '@/components/CommonModal';
import BuyerCompany from '../ViewQuote/BuyerCompany';
import QuoteInfo from '../ViewQuote/QuoteInfo';
import ProductsAndServices from '../ViewQuote/ProductsAndServices';
import Quotation from '../ViewQuote/Quotation';
import useDownloadQuote from './useDownloadQuote';
import { Box, Button, CircularProgress } from '@mui/material';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { useDownloadDashboard } from '../../Dashboard/DownloadDashboard/useDownloadDashboard';
import { DOWNLOAD_FILE_TYPE } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';
import { capitalizeFirstLetter } from '@/utils/api';

const DownloadQuote = (props: any) => {
  const { isDownloadQuote, setIsDownloadQuote, rowId } = props;
  const {
    isFetching,
    downloadRef,
    QuotesProduct,
    viewQuotesData,
    hasDownloaded,
    setHasDownloaded,
  } = useDownloadQuote(rowId);

  const name = viewQuotesData?.data?.name;
  const { PDF } = DOWNLOAD_FILE_TYPE ?? {};

  const { isDownloading, downloadReport } = useDownloadDashboard?.(
    name,
    downloadRef,
  );

  useEffect(() => {
    if (isDownloadQuote && viewQuotesData && !hasDownloaded) {
      downloadReport?.(PDF);
      setHasDownloaded(true);
      setTimeout(() => {
        setIsDownloadQuote(false);
        enqueueSnackbar(
          `${capitalizeFirstLetter(name)} Downloaded Successfully`,
          { variant: 'success' },
        );
      }, 1000);
    }
  }, [isDownloadQuote, viewQuotesData, downloadReport, hasDownloaded]);

  return (
    <CommonModal
      title=""
      open={isDownloadQuote}
      handleClose={() => setIsDownloadQuote(false)}
      handleCancel={() => setIsDownloadQuote(false)}
      width="60%"
    >
      {isDownloading?.isLoading && (
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Button variant="outlined" color="inherit" sx={{ mt: 2 }}>
            <CircularProgress color="secondary" size={15} sx={{ mr: 0.7 }} />
            Downloading ...
          </Button>
        </Box>
      )}

      {isFetching ? (
        <>
          <SkeletonTable />
          <SkeletonTable />
        </>
      ) : (
        <Box ref={downloadRef}>
          <BuyerCompany viewQuotesData={viewQuotesData} />
          <QuoteInfo viewQuotesData={viewQuotesData} />
          <ProductsAndServices QuotesProduct={QuotesProduct} />
          <Quotation viewQuotesData={viewQuotesData} />
        </Box>
      )}
    </CommonModal>
  );
};

export default DownloadQuote;
