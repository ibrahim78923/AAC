import { Grid } from '@mui/material';
import CheckboxCard from './CheckboxCard';
import { Header } from './Header';
import { cardData } from './ShopsTab.data';
import { useShopsTab } from './useShopsTab';
import ShopDetailsModal from './ShopDetailsModal';
import { DeleteShop } from './DeleteShop';
import NoData from '@/components/NoData';
import { NoAssociationFoundImage } from '@/assets/images';

const ShopsTab = () => {
  const {
    search,
    setSearch,
    handleSelect,
    selectedCardList,
    handleSelectAll,
    openDetailDrawer,
    setOpenDetailDrawer,
    deleteModalOpen,
    setDeleteModalOpen,
    addShopModalOpen,
    setAddShopModalOpen,
    isLoading,
    isFetching,
    shopData,
  } = useShopsTab();
  return (
    <>
      <Header
        handleSelectAll={() => handleSelectAll(cardData)}
        search={search}
        setSearch={setSearch}
        selectedCardList={selectedCardList}
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        addShopModalOpen={addShopModalOpen}
        setAddShopModalOpen={setAddShopModalOpen}
      />
      {shopData?.length ? (
        <Grid container spacing={2.4}>
          {shopData?.map?.((card: any) => (
            <Grid item xs={12} md={6} lg={4} key={card?._id}>
              <CheckboxCard
                {...card}
                selectedCardList={selectedCardList}
                handleSelect={handleSelect}
                handleOpenDetailModal={() =>
                  setOpenDetailDrawer({ isOpen: true, _id: card?._id })
                }
                isFetching={isFetching}
                isLoading={isLoading}
              />
              {openDetailDrawer?._id === card?._id && (
                <ShopDetailsModal
                  data={card}
                  isDetailDrawerOpen={openDetailDrawer?.isOpen}
                  setIsDetailDrawerOpen={setOpenDetailDrawer}
                  setAddShopModalOpen={setAddShopModalOpen}
                  setDeleteModalOpen={setDeleteModalOpen}
                />
              )}
            </Grid>
          ))}
          <DeleteShop
            deleteModalOpen={deleteModalOpen}
            setDeleteModalOpen={setDeleteModalOpen}
            selectedCardList={selectedCardList}
          />
        </Grid>
      ) : (
        <NoData image={NoAssociationFoundImage} message={'No data found'} />
      )}
    </>
  );
};

export default ShopsTab;
