import CommonDrawer from '@/components/CommonDrawer';
import AddNumberForm from './AddNumberForm';
import useBuyNewNumber from './useBuyNewNumber';

const BuyNewNumberDrawer = (props: any) => {
  const { isBuyNewNumber, setIsBuyNewNumber } = props;
  const { isNumberDetail, handleNextDetail } = useBuyNewNumber();

  return (
    <CommonDrawer
      isDrawerOpen={isBuyNewNumber}
      onClose={() => setIsBuyNewNumber(false)}
      title="Buy New Number"
      okText="Buy"
      isOk={isNumberDetail ? true : false}
      // submitHandler={() => { }}
      footer
    >
      <AddNumberForm
        isNumberDetail={isNumberDetail}
        handleNextDetail={handleNextDetail}
      />
    </CommonDrawer>
  );
};

export default BuyNewNumberDrawer;
