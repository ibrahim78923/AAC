import CommonModal from '@/components/CommonModal';
import { Box, Button, Typography } from '@mui/material';

const DiscountModal = (props: any) => {
  const {
    open,
    onClose,
    handleApplyDiscount,
    totalAmount,
    handleContinueDiscount,
  } = props;

  return (
    <CommonModal
      open={open?.isToggle}
      handleClose={onClose}
      handleCancel={onClose}
      title="Discount"
      footer
      okText="Continue"
      cancelText="Cancel"
      handleSubmit={handleContinueDiscount}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <Box
          display="flex"
          flexDirection="row"
          gap={2}
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography>Do You want to get Discount</Typography>
          <Button
            variant="contained"
            className="small"
            color="primary"
            onClick={handleApplyDiscount}
            sx={{ width: 'fit-content' }}
          >
            Get Discount
          </Button>
        </Box>
        {open?.isShowDiscountDetails && (
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography fontWeight={500}>
              Discount: <Typography component="span">£ 5</Typography>
            </Typography>
            <Typography fontWeight={500}>
              Total: <Typography component="span">£ {totalAmount}</Typography>
            </Typography>
          </Box>
        )}
      </Box>
    </CommonModal>
  );
};

export default DiscountModal;
