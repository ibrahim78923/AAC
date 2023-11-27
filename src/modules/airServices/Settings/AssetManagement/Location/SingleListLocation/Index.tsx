import { ListLocation } from './ListLocation';
import { locationlist } from '../Location.data';
import { useState } from 'react';
import { SubListWrapper } from './SubListWrapper';
import { SubListLocation } from './SubListLocation';
import { Box } from '@mui/material';

export const SingleListLocation = () => {
  const [collapseItem, setIsCollapse] = useState<undefined | number>();
  const handleCollapse = (item: number) => {
    setIsCollapse(collapseItem !== item ? item : undefined);
  };

  return (
    <>
      {locationlist?.map((item, index) => (
        <Box key={item?.id}>
          <ListLocation
            continents={item?.title}
            handleCollapse={() => handleCollapse(index)}
          />
          {collapseItem === index && !!item?.subList && (
            <SubListWrapper>
              {item?.subList?.map((subItem) => (
                <Box key={subItem?.id}>
                  <SubListLocation country={subItem?.title} />
                </Box>
              ))}
            </SubListWrapper>
          )}
        </Box>
      ))}
    </>
  );
};
