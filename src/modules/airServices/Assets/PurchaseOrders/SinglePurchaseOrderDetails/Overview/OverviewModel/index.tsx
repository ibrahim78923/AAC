import { LogoImage } from '@/assets/images';
import { Box, Dialog, IconButton, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import Image from 'next/image';
import TanstackTable from '@/components/Tabel/TanstackTable';
import {
  overViewTablePdfColumns,
  overViewTablePdfData,
} from '../Overview.data';
import OverviewBilling from '../OverviewBilling';
import { styles } from '../Overview.style';
import { DownloadFileIcon, PrinterIcon } from '@/assets/icons';

const OverviewModel = ({ openOverviewModel, setOpenOverviewModel }: any) => {
  const {
    modelSizing,
    logoBox,
    logoHeading,
    iconsStyle,
    textColorCommon,
    textColorCommontwo,
    logoImage,
    textBoxStyle,
  } = styles();
  const handleClose = () => {
    setOpenOverviewModel(false);
  };
  return (
    <div>
      <Dialog
        fullWidth
        open={openOverviewModel}
        onClose={handleClose}
        sx={modelSizing}
      >
        <Box sx={logoBox}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Image src={LogoImage} alt="logo" style={logoImage} />
            <Box>
              <Typography variant="h2">Air Applecart</Typography>
              <Typography variant="h5" sx={logoHeading}>
                Air Services
              </Typography>
            </Box>
          </Box>
          <IconButton sx={{ mb: '2rem' }}>
            <CancelIcon fontSize="large" onClick={handleClose} />
          </IconButton>
        </Box>
        <Box sx={iconsStyle}>
          <PrinterIcon />
          <DownloadFileIcon />
        </Box>
        <Box sx={textBoxStyle}>
          <Box>
            <Typography variant="body2" sx={textColorCommon}>
              Invoice To
            </Typography>
            <Typography variant="h3" sx={{ mb: '0.3125rem' }}>
              Albert Torento
            </Typography>
            <Typography variant="h6" sx={textColorCommon}>
              Hight&apos;s St Covendis
            </Typography>
            <Typography variant="h6" sx={textColorCommon}>
              Sudbury
            </Typography>
            <Typography variant="h6" sx={textColorCommon}>
              CO I8 BAX
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '3rem' }}>
            <Box>
              <Typography variant="h6" sx={textColorCommon}>
                Invoice
              </Typography>
              <Typography variant="h6" sx={textColorCommon}>
                Date
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" sx={textColorCommontwo}>
                1203
              </Typography>
              <Typography variant="h6" sx={textColorCommontwo}>
                19/01/2022
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ px: { md: '3rem', xs: '1rem' } }}>
          <TanstackTable
            data={overViewTablePdfData}
            columns={overViewTablePdfColumns()}
          />
        </Box>
        <Box sx={{ m: { md: '1rem 3rem 5rem 0' }, px: { xs: '1rem' } }}>
          <OverviewBilling />
        </Box>
      </Dialog>
    </div>
  );
};

export default OverviewModel;
