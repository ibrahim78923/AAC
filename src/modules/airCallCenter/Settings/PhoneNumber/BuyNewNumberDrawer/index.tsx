import CommonDrawer from '@/components/CommonDrawer';
import AddNumberForm from './AddNumberForm';
import useBuyNewNumber from './useBuyNewNumber';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BuyNewNumberDrawer = (props: any) => {
  const { isBuyNewNumber, setIsBuyNewNumber } = props;
  const {
    isNumberDetail,
    handleNextDetail,
    setIsNumberDetail,
    isEditNumber,
    serIsEditNumber,
  } = useBuyNewNumber();

  return (
    <CommonDrawer
      isDrawerOpen={isBuyNewNumber}
      onClose={() => setIsBuyNewNumber(false)}
      title="Buy New Number"
      okText="Buy"
      isOk={isNumberDetail ? true : false}
      // submitHandler={() => { }}
      headerIcon={
        isNumberDetail ? (
          <ArrowBackIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => setIsNumberDetail(false)}
          />
        ) : (
          <></>
        )
      }
      footer
    >
      <AddNumberForm
        isNumberDetail={isNumberDetail}
        handleNextDetail={handleNextDetail}
        isEditNumber={isEditNumber}
        serIsEditNumber={serIsEditNumber}
      />
    </CommonDrawer>
  );
};

export default BuyNewNumberDrawer;
