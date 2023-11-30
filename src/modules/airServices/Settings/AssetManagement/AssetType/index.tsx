import { Box } from '@mui/material';
import ChildBarWrapper from './ChildBarWrapper';
import TitleBar from './TitleBar';
import { useAssetType } from './useAssetType';
import { assetTypeData } from './AssetType.data';
import Header from './Header';
import { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
export const AssetType = () => {
  const {
    collapseItem,
    handleCollapse,
    subChildCollapseItem,
    handleSubChildCollapse,
  } = useAssetType();

  return (
    <Box>
      <Header />
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
          <Fragment key={uuidv4()}>
            <TitleBar
              title={asset?.title}
              handleCollapse={() => handleCollapse(index)}
              icNotCollapseAble={index === 0}
            />
            {collapseItem === index && !!asset?.childList && (
              <ChildBarWrapper>
                {asset?.childList?.map((childAsset, subChildIndex) => (
                  <Fragment key={uuidv4()}>
                    <TitleBar
                      title={childAsset?.title}
                      handleCollapse={() =>
                        handleSubChildCollapse(subChildIndex)
                      }
                    />
                    {subChildIndex === subChildCollapseItem &&
                      !!childAsset?.subChildList && (
                        <ChildBarWrapper isZeroBoxShadow>
                          {childAsset?.subChildList?.map((subChildAsset) => (
                            <TitleBar
                              key={uuidv4()}
                              title={subChildAsset?.title}
                              icNotCollapseAble
                            />
                          ))}
                        </ChildBarWrapper>
                      )}
                  </Fragment>
                ))}
              </ChildBarWrapper>
            )}
          </Fragment>
        ))}
      </Box>
    </Box>
  );
};
