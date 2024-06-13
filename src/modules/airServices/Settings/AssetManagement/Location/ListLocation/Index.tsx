import { SubListWrapper } from './SubListWrapper';
import { Box } from '@mui/material';
import { useListLocation } from './useListLocation';
import NoData from '@/components/NoData';
import { DeleteLocation } from '../DeleteLocation';
import { AIR_SERVICES } from '@/constants';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { LocationCard } from '../LocationCard';
import { LOCATION_TYPE } from '../UpsertLocation/UpsertLocation.data';

export const ListLocation = () => {
  const {
    handleCollapse,
    locationList,
    isLoading,
    collapseItem,
    isFetching,
    deleteModalOpen,
    setDeleteModalOpen,
    selectedLocation,
    setSelectedLocation,
    setDeleteRecord,
    router,
    isError,
  } = useListLocation();

  if (isLoading || isFetching) return <SkeletonTable />;
  if (isError) return <ApiErrorState />;

  return (
    <>
      {!!locationList?.length ? (
        <Box bgcolor={'grey.400'} p={2} borderRadius={2}>
          <>
            {locationList?.map((item: any, index: any) => (
              <Box key={item?._id}>
                <LocationCard
                  parentId={item?._id}
                  continents={item?.locationName}
                  handleCollapse={() => handleCollapse(index)}
                  setDeleteRecord={(id: any) => setDeleteRecord?.(id)}
                  onAddClick={() =>
                    router?.push({
                      pathname: AIR_SERVICES?.ADD_NEW_LOCATION,
                      query: {
                        type: LOCATION_TYPE?.PARENT,
                      },
                    })
                  }
                  onEditClick={() =>
                    router?.push({
                      pathname: AIR_SERVICES?.ADD_NEW_LOCATION,
                      query: {
                        type: LOCATION_TYPE?.PARENT,
                        parentId: item?._id,
                      },
                    })
                  }
                />
                {collapseItem === index && (
                  <SubListWrapper
                    onAddClick={() =>
                      router?.push({
                        pathname: AIR_SERVICES?.ADD_NEW_LOCATION,
                        query: {
                          type: 'child',
                          parentId: item?._id,
                        },
                      })
                    }
                  >
                    {item?.childLocaions?.map((subItem: any) => (
                      <Box key={subItem?._id}>
                        <LocationCard
                          isChild
                          parentId={item?._id}
                          childId={subItem?._id}
                          continents={subItem?.locationName}
                          setDeleteRecord={(id: any) => setDeleteRecord?.(id)}
                          onAddClick={() =>
                            router?.push({
                              pathname: AIR_SERVICES?.ADD_NEW_LOCATION,
                              query: {
                                type: LOCATION_TYPE?.CHILD,
                                parentId: item?._id,
                              },
                            })
                          }
                          onEditClick={() =>
                            router?.push({
                              pathname: AIR_SERVICES?.ADD_NEW_LOCATION,
                              query: {
                                type: LOCATION_TYPE?.CHILD,
                                parentId: item?._id,
                                childId: subItem?._id,
                              },
                            })
                          }
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
        <NoData message="No location Found" />
      )}

      {deleteModalOpen && (
        <DeleteLocation
          deleteModalOpen={deleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      )}
    </>
  );
};
