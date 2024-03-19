import { SingleListLocation } from './SingleListLocation';
import { SubListWrapper } from './SubListWrapper';
import { SubListLocation } from './SubListLocation';
import { Box, Skeleton } from '@mui/material';
import { useListLocation } from './useListLocation';
import NoData from '@/components/NoData';
import { NoAssociationFoundImage } from '@/assets/images';

export const ListLocation = () => {
  const {
    theme,
    handleCollapse,
    locationList,
    isLoading,
    collapseItem,
    isFetching,
  } = useListLocation();
  if (isLoading || isFetching) return <Skeleton />;
  return (
    <>
      {locationList?.length ? (
        <Box bgcolor={theme?.palette?.grey[400]} p={2} borderRadius={2}>
          <>
            {locationList?.map((item: any, index: any) => (
              <Box key={item?._id}>
                <SingleListLocation
                  parentId={item?._id}
                  continents={item?.locationName}
                  handleCollapse={() => handleCollapse(index)}
                />
                {collapseItem === index && !!item?.childLocations && (
                  <SubListWrapper
                    parentId={item?._id}
                    ChildId={item?.childLocations?.map(
                      (subItem: any) => subItem?._id,
                    )}
                  >
                    {item?.childLocations?.map((subItem: any) => (
                      <Box key={subItem?._id}>
                        <SubListLocation
                          country={subItem?.locationName}
                          childId={subItem?._id}
                          parentId={item?._id}
                        />
                      </Box>
                    ))}
                  </SubListWrapper>
                )}
              </Box>
            ))}
          </>
        </Box>
      ) : (
        <NoData message="Data Not Found" image={NoAssociationFoundImage} />
      )}
    </>
  );
};
