import { Box, Button, Card, Typography } from '@mui/material';
import usePhoneNumber from './usePhoneNumber';
import { AttachFilePrimaryIcon } from '@/assets/icons';
import { styles } from './PhoneNumber.style';
import BuyNewNumberDrawer from './BuyNewNumberDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import { phoneNumberColumns, phoneNumberData } from './PhoneNumber.data';
import { AlertModals } from '@/components/AlertModals';
import EditPhoneNumber from './EditPhoneNumber';

const PhoneNumber = () => {
  const {
    theme,
    isBuyNewNumber,
    setIsBuyNewNumber,
    isDeleteModal,
    setIsDeleteModal,
    isEditNumberDrawer,
    setIsEditNumberDrawer,
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
    </Box>
  );
};

export default PhoneNumber;
