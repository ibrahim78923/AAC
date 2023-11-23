import { ListLocation } from './ListLocation';
import { locationlist } from './Location.data';
import { useState } from 'react';

export const Location = () => {
  const [collapseItem, setIsCollapse] = useState<undefined | number>();
  const handleCollapse = (item: number) => {
    setIsCollapse(collapseItem !== item ? item : undefined);
  };

  return (
    <>
      {locationlist?.map((asset, index) => (
        <>
          <ListLocation
            title={asset?.title}
            handleCollapse={() => handleCollapse(index)}
            icNotCollapseAble={index === 0}
          />
          {/* {collapseItem === index && !!asset?.subList && (
      <ChildBarWrapper>
        {asset?.subList?.map((subAsset) => (
          <>
            <TitleBar
              title={subAsset?.title}
            />
          </>
        ))}
      </ChildBarWrapper>
    )} */}
        </>
      ))}
    </>
  );
};
