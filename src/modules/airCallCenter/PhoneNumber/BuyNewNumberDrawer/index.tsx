import CommonDrawer from '@/components/CommonDrawer';
import CommonTabs from '@/components/Tabs';
import LocalNumber from './LocalNumber';
import TollFreeNumber from './TollFreeNumber';
import useBuyNewNumber from './useBuyNewNumber';

const BuyNewNumberDrawer = (props: any) => {
  const { isBuyNewNumber, setIsBuyNewNumber } = props;
  const { isNumberDetail } = useBuyNewNumber();

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
      {!isNumberDetail && (
        <CommonTabs tabsArray={['Local', 'Toll-Free']}>
          <LocalNumber />
          <TollFreeNumber />
        </CommonTabs>
      )}
    </CommonDrawer>
  );
};

export default BuyNewNumberDrawer;
