import { Box } from '@mui/material';
import ChildBarWrapper from './ChildAssetTypes';
import TitleBar from './TitleBar';
import { useAssetType } from './useAssetType';
import { assetTypeData } from './AssetType.data';
import Header from './Header';
import { Fragment } from 'react';
import NoData from '@/components/NoData';
import { NoAssociationFoundImage } from '@/assets/images';
export const AssetType = () => {
  const {
    collapseItem,
    handleCollapse,
    subChildCollapseItem,
    handleSubChildCollapse,
  } = useAssetType();

  return (
    <>
      <Box>
        <Header />
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
            {assetTypeData?.map((asset, index) => (
              <Fragment key={asset?.id}>
                <TitleBar
                  title={asset?.title}
                  handleCollapse={() => handleCollapse(index)}
                />
                {collapseItem === index && !!asset?.childList ? (
                  <ChildBarWrapper>
                    {asset?.childList?.map((childAsset, subChildIndex) => (
                      <Fragment key={childAsset?.id}>
                        <TitleBar
                          title={childAsset?.title}
                          handleCollapse={() =>
                            handleSubChildCollapse(subChildIndex)
                          }
                        />
                        {subChildIndex === subChildCollapseItem &&
                        !!childAsset?.subChildList ? (
                          <ChildBarWrapper boxShadow={0}>
                            {childAsset?.subChildList?.map((subChildAsset) => (
                              <TitleBar
                                key={asset?.id}
                                title={subChildAsset?.title}
                                icNotCollapseAble
                              />
                            ))}
                          </ChildBarWrapper>
                        ) : null}
                      </Fragment>
                    ))}
                  </ChildBarWrapper>
                ) : null}
              </Fragment>
            ))}
          </Box>
        ) : (
          <NoData message="Data Not Found" image={NoAssociationFoundImage} />
        )}
      </Box>
    </>
  );
};
