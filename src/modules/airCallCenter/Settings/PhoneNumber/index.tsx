import { Box, Button, Card, Typography } from '@mui/material';
import usePhoneNumber from './usePhoneNumber';
import { AttachFilePrimaryIcon, MicIcon } from '@/assets/icons';
import { styles } from './PhoneNumber.style';
import BuyNewNumberDrawer from './BuyNewNumberDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import { phoneNumberColumns, phoneNumberData } from './PhoneNumber.data';
import { AlertModals } from '@/components/AlertModals';
import EditPhoneNumber from './EditPhoneNumber';
import TestConnectionModal from './TestConnectionModal';

const PhoneNumber = () => {
  const {
    theme,
    isBuyNewNumber,
    setIsBuyNewNumber,
    isDeleteModal,
    setIsDeleteModal,
    isEditNumberDrawer,
    setIsEditNumberDrawer,
    isTestConnectionModal,
    setIsTestConnectionModal,
  } = usePhoneNumber();
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={5}>
        <Typography variant="h3" color={theme?.palette?.slateBlue?.main}>
          Phone Numbers
        </Typography>
        {phoneNumberData()?.length > 0 && (
          <Button
            variant="contained"
            className="small"
            onClick={() => setIsBuyNewNumber(true)}
          >
            Buy new number
          </Button>
        )}
      </Box>
      {phoneNumberData()?.length > 0 ? (
        <TanstackTable
          columns={phoneNumberColumns}
          data={phoneNumberData(
            setIsDeleteModal,
            setIsEditNumberDrawer,
            theme?.palette,
          )}
        />
      ) : (
        <Box>
          <Card sx={styles?.phoneNumberWrapper}>
            <AttachFilePrimaryIcon />
            <Typography
              color={theme?.palette?.grey[900]}
              variant="body3"
              fontWeight={500}
              component="p"
            >
              Start by buying a new number
            </Typography>
            <Button
              variant="contained"
              className="small"
              onClick={() => setIsBuyNewNumber(true)}
            >
              Buy new number
            </Button>
          </Card>
          <Box mt={3} textAlign="right">
            <Button
              variant="contained"
              startIcon={<MicIcon />}
              className="small"
              onClick={() => setIsTestConnectionModal(true)}
            >
              Test Connection
            </Button>
          </Box>
        </Box>
      )}

      <BuyNewNumberDrawer
        isBuyNewNumber={isBuyNewNumber}
        setIsBuyNewNumber={setIsBuyNewNumber}
      />
      <AlertModals
        type="delete"
        open={isDeleteModal}
        message="Are you sure you want to delete this record?"
        handleClose={() => setIsDeleteModal(false)}
        handleSubmitBtn={() => setIsDeleteModal(false)}
      />
      <EditPhoneNumber
        isEditNumberDrawer={isEditNumberDrawer}
        setIsEditNumberDrawer={setIsEditNumberDrawer}
      />
      <TestConnectionModal
        isTestConnectionModal={isTestConnectionModal}
        setIsTestConnectionModal={setIsTestConnectionModal}
      />
    </Box>
  );
};

export default PhoneNumber;
