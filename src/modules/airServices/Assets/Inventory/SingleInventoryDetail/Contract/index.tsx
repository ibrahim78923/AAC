import NoData from '@/components/NoData';
import { Typography } from '@mui/material';
import { InventoryCard } from '@/components/InventoryCard/index';
import { ContractImage } from '@/assets/images';
import { useContract } from './useContract';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

export const Contract = () => {
  const {
    AssetsInventoryContractsData,
    isLoading,
    openDeleteModal,
    setOpenDeleteModal,
    handleDelete,
    theme,
    setDelateRecord,
  } = useContract();

  return (
    <>
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <>
          {AssetsInventoryContractsData?.[0]?.contractList?.length ? (
            AssetsInventoryContractsData?.map(
              (singleContractList: any) =>
                singleContractList?.contractList?.map((singleContract: any) => (
                  <InventoryCard
                    openDeleteModal={openDeleteModal}
                    setOpenDeleteModal={setOpenDeleteModal}
                    handleDelete={handleDelete}
                    setDelateRecord={setDelateRecord}
                    deletedRecordId={singleContract?._id}
                    heading={singleContract?.name}
                    status={singleContract?.status}
                    key={singleContract?._id}
                    showChild
                  >
                    <Typography color={theme?.palette?.grey?.[900]}>
                      {singleContract?.licenseType}
                    </Typography>
                  </InventoryCard>
                )),
            )
          ) : (
            <NoData
              image={ContractImage}
              message={'There are no active contract available'}
            />
          )}
        </>
      )}
    </>
  );
};
