import { SingleListLocation } from './SingleListLocation';
import { SubListWrapper } from './SubListWrapper';
import { SubListLocation } from './SubListLocation';
import { Box } from '@mui/material';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { useListLocation } from './useListLocation';

export const ListLocation = () => {
  const { theme, handleCollapse, locationList, isLoading, collapseItem } =
    useListLocation();

  return (
    <Box bgcolor={theme?.palette?.grey[400]} p={2} borderRadius={2}>
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <>
          {locationList?.map((item: any, index: any) => (
            <Box key={item?._id}>
              <SingleListLocation
                editData={item}
                continents={item?.locationName}
                handleCollapse={() => handleCollapse(index)}
              />
              {isLoading ? (
                <SkeletonTable />
              ) : (
                <>
                  {collapseItem === index && !!item?.Locations && (
                    <SubListWrapper data={item}>
                      {item?.Locations?.map((subItem: any) => (
                        <Box key={subItem?._id}>
                          <SubListLocation
                            country={subItem?.locationName}
                            childEditData={subItem}
                            data={item}
                          />
                        </Box>
                      ))}
                    </SubListWrapper>
                  )}
                </>
              )}
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};
