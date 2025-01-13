import { Box } from '@mui/material';
import { useListLocation } from './useListLocation';
import NoData from '@/components/NoData';
import { DeleteLocation } from '../DeleteLocation';
import { AIR_SERVICES } from '@/constants/routes';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { LOCATION_TYPE } from '../UpsertLocation/UpsertLocation.data';
import { CustomAccordion } from '@/components/CustomAccordion';
import { ItemInitialHoveredIconCard } from '@/components/Cards/ItemInitialHoveredIconCard';
import { ACCORDION_VARIANTS } from '@/constants/mui-constant';
import { AddNewItemButton } from '@/components/Buttons/AddNewItemButton';

export const ListLocation = () => {
  const {
    locationList,
    isLoading,
    isFetching,
    deleteModalOpen,
    setDeleteModalOpen,
    selectedLocation,
    setSelectedLocation,
    router,
    isError,
    refetch,
    handleIconAction,
  } = useListLocation();

  if (isLoading || isFetching) return <SkeletonTable />;
  if (isError) return <ApiErrorState canRefresh refresh={refetch} />;

  return (
    <>
      {!!locationList?.length ? (
        <Box bgcolor={'grey.400'} p={2} borderRadius={2}>
          <>
            {locationList?.map((parent: any) => (
              <CustomAccordion
                variantType={ACCORDION_VARIANTS?.TERTIARY}
                key={parent?._id}
                summaryKey={parent?._id}
                accordionSummary={
                  <ItemInitialHoveredIconCard
                    id={parent?._id}
                    name={parent?.locationName}
                    key={parent?._id}
                    iconList={['edit', 'delete']}
                    onIconClick={(e: any, action: string) =>
                      handleIconAction?.(e, action, {
                        type: LOCATION_TYPE?.PARENT,
                        parentId: parent?._id,
                      })
                    }
                  />
                }
              >
                {!!parent?.childLocaions?.length &&
                  parent?.childLocaions?.map((child: any) => (
                    <ItemInitialHoveredIconCard
                      initial={parent?.locationName?.slice(0, 1)}
                      name={child?.locationName}
                      key={child?._id}
                      id={child?._id}
                      iconList={['edit', 'delete']}
                      onIconClick={(e: any, action: string) =>
                        handleIconAction?.(e, action, {
                          type: LOCATION_TYPE?.CHILD,
                          parentId: parent?._id,
                          childId: child?._id,
                        })
                      }
                    />
                  ))}
                <AddNewItemButton
                  variant={'outlined'}
                  color={'secondary'}
                  iconType="square"
                  onClick={() =>
                    router?.push({
                      pathname: AIR_SERVICES?.ADD_NEW_LOCATION,
                      query: {
                        type: LOCATION_TYPE?.CHILD,
                        parentId: parent?._id,
                      },
                    })
                  }
                />
              </CustomAccordion>
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
