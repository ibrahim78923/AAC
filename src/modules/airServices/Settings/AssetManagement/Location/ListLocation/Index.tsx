import { Box } from '@mui/material';
import { useListLocation } from './useListLocation';
import { DeleteLocation } from '../DeleteLocation';
import { AIR_SERVICES } from '@/constants/routes';
import { LOCATION_TYPE } from '../UpsertLocation/UpsertLocation.data';
import { ItemInitialHoveredIconCard } from '@/components/Cards/ItemInitialHoveredIconCard';
import { ACCORDION_VARIANTS, SKELETON_TYPES } from '@/constants/mui-constant';
import { AddNewItemButton } from '@/components/Buttons/AddNewItemButton';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { UncontrolledAccordion } from '@/components/Accordions/UncontrolledAccordion';

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

  return (
    <ApiRequestFlow
      hasNoData={!locationList?.length}
      hasError={isError}
      refreshApi={refetch}
      showSkeleton={isLoading || isFetching}
      skeletonType={SKELETON_TYPES?.BARS}
      noDataMessage="No location found"
    >
      <Box bgcolor={'grey.400'} p={2} borderRadius={2}>
        <>
          {locationList?.map((parent: any) => (
            <UncontrolledAccordion
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
            </UncontrolledAccordion>
          ))}
        </>
      </Box>

      {deleteModalOpen && (
        <DeleteLocation
          deleteModalOpen={deleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      )}
    </ApiRequestFlow>
  );
};
