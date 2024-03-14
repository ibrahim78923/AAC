import { Box, Skeleton } from '@mui/material';
import ChildBarWrapper from './ChildAssetTypes';
import TitleBar from './TitleBar';
import { useAssetType } from './useAssetType';
import Header from './Header';
import { Fragment } from 'react';
import NoData from '@/components/NoData';
import { NoAssociationFoundImage } from '@/assets/images';
import CustomPagination from '@/components/CustomPagination';
export const AssetType = () => {
  const {
    collapseItem,
    handleCollapse,
    subChildCollapseItem,
    handleSubChildCollapse,
    assetTypeData,
    metaData,
    setPage,
    setPageLimit,
    pageLimit,
    isLoading,
    isFetching,
  } = useAssetType();
  if (isLoading || isFetching) return <Skeleton />;
  return (
    <>
      <Box>
        <Header assetTypeData={assetTypeData} />
        {assetTypeData?.length ? (
          <Box
            borderRadius={3}
            display={'flex'}
            flexDirection="column"
            gap={1.8}
            p={{ xs: 1, md: 2.4 }}
            mt={2.4}
            sx={{
              backgroundColor: 'grey.400',
            }}
          >
            {assetTypeData?.map((asset: any, index: any) => (
              <Fragment key={asset?._id}>
                <TitleBar
                  title={asset?.name}
                  handleCollapse={() => handleCollapse(index)}
                  assetTypeData={asset}
                />
                {collapseItem === index && !!asset?.assetTypeChildIds ? (
                  <ChildBarWrapper
                    parentId={asset?._id}
                    assetTypeData={assetTypeData}
                  >
                    {asset?.childList?.map(
                      (childAsset: any, subChildIndex: any) => (
                        <Fragment key={childAsset?._id}>
                          <TitleBar
                            assetTypeData={childAsset}
                            title={childAsset?.name}
                            handleCollapse={() =>
                              handleSubChildCollapse(subChildIndex)
                            }
                          />
                          {subChildCollapseItem === subChildIndex &&
                          childAsset?.subchildList?.length ? (
                            <ChildBarWrapper
                              childId={childAsset?._id}
                              boxShadow={0}
                            >
                              {childAsset?.subchildList?.map(
                                (subChildAsset: any) => (
                                  <TitleBar
                                    key={subChildAsset?._id}
                                    title={subChildAsset?.name}
                                    icNotCollapseAble
                                  />
                                ),
                              )}
                            </ChildBarWrapper>
                          ) : null}
                        </Fragment>
                      ),
                    )}
                  </ChildBarWrapper>
                ) : null}
              </Fragment>
            ))}
            <CustomPagination
              setPageLimit={setPageLimit}
              setPage={setPage}
              count={metaData?.pages}
              totalRecords={metaData?.total}
              onPageChange={(page: any) => setPage(page)}
              currentPage={metaData?.page}
              pageLimit={pageLimit}
            />
          </Box>
        ) : (
          <NoData message="Data Not Found" image={NoAssociationFoundImage} />
        )}
      </Box>
    </>
  );
};
