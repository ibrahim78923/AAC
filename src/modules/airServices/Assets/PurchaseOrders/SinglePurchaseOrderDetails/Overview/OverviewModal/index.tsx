import { LogoImage } from '@/assets/images';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import Image from 'next/image';
import { overviewTablePdfColumns } from './OverviewModal.data';
import OverviewBilling from '../OverviewBilling';
import { DownloadFileIcon, PrinterIcon } from '@/assets/icons';
import TanstackTable from '@/components/Table/TanstackTable';
import { styles } from './OverviewModal.style';

const OverviewModal = ({
  openOverviewModal,
  setOpenOverviewModal,
  purchaseOrderData,
  purchaseOrderDetailData,
  theme,
  orderStatus,
}: any) => {
  return (
    <Box>
      <Dialog
        fullWidth
        open={openOverviewModal}
        onClose={() => setOpenOverviewModal(false)}
        sx={styles?.modelSizing}
      >
        <DialogTitle mt={'-1.5rem'}>
          <Box sx={styles?.logoBox}>
            <Box display={'flex'} gap={1}>
              <Image src={LogoImage} alt="logo" style={styles?.logoImage} />
              <Box>
                <Typography variant="h2">Air Applecart</Typography>
                <Typography variant="h5" sx={styles?.logoHeading}>
                  Air Services
                </Typography>
              </Box>
            </Box>
            <IconButton sx={{ mr: '-1.5rem', mb: '2rem' }}>
              <CancelIcon
                fontSize="large"
                onClick={() => setOpenOverviewModal(false)}
              />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={styles?.iconsStyle}>
            <PrinterIcon />
            <DownloadFileIcon />
          </Box>
          <Box sx={styles?.textBoxStyle}>
            <Box>
              {/*Multiple Typography have common styling that way using sx */}
              <Typography variant="body2" sx={styles?.textColorCommon}>
                Invoice To
              </Typography>
              <Typography variant="h3" mb={'0.3125rem'}>
                Albert Torento
              </Typography>
              <Typography variant="h6" sx={styles?.textColorCommon}>
                Hights St Covendis
              </Typography>
              <Typography variant="h6" sx={styles?.textColorCommon}>
                Sudbury
              </Typography>
              <Typography variant="h6" sx={styles?.textColorCommon}>
                CO I8 BAX
              </Typography>
            </Box>
            <Box display={'flex'} gap={'3rem'}>
              <Box>
                <Typography variant="h6" sx={styles?.textColorCommon}>
                  Invoice
                </Typography>
                <Typography variant="h6" sx={styles?.textColorCommon}>
                  Date
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" sx={styles?.textColorCommonTwo}>
                  1203
                </Typography>
                <Typography variant="h6" sx={styles?.textColorCommonTwo}>
                  19/01/2022
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box px={{ md: '3rem', xs: '1rem' }}>
            <TanstackTable
              data={purchaseOrderDetailData}
              columns={overviewTablePdfColumns(
                setOpenOverviewModal,
                purchaseOrderDetailData,
                theme,
                orderStatus,
              )}
            />
          </Box>
          <Box m={{ md: '1rem 3rem 5rem 0' }} px={{ xs: '1rem' }}>
            <OverviewBilling
              purchaseOrderDetailData={purchaseOrderDetailData}
              purchaseOrderData={purchaseOrderData}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default OverviewModal;
