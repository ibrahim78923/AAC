import { Fragment } from 'react';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES } from '@/constants/routes';
import { AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { Box } from '@mui/material';
import ParentType from './ParentType';
import ChildType from './ChildType';
import useAssetType from './useAssetType';
import { CustomAccordion } from '@/components/CustomAccordion';
import { ACCORDION_VARIANTS, SKELETON_TYPES } from '@/constants/mui-constant';
import { ItemInitialHoveredIconCard } from '@/components/Cards/ItemInitialHoveredIconCard';
import { AddNewItemButton } from '@/components/Buttons/AddNewItemButton';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';

export const AssetType = () => {
  const {
    router,
    setParentDetails,
    isLoading,
    isFetching,
    isError,
    data,
    setChildDetails,
    parentDetails,
    childDetails,
    refetch,
  } = useAssetType();

  return (
    <Fragment>
      <PageTitledHeader
        title={'Asset Type & Fields'}
        canMovedBack
        moveBack={() => {
          router?.push({
            pathname: AIR_SERVICES?.ASSET_MANAGEMENT_SETTINGS,
          });
        }}
        addTitle={'New Asset Type'}
        createPermissionKey={[
          AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.ADD_ASSET_TYPES,
        ]}
        handleAction={() => setParentDetails({ open: true, parentData: null })}
        disableAddButton={isLoading || isFetching}
      />
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasError={isError}
        refreshApi={refetch}
        hasNoData={!data?.data?.length}
        skeletonType={SKELETON_TYPES?.BARS}
        length={6}
      >
        <Box borderRadius={3} p={2} mt={2} bgcolor={'grey.400'}>
          <ItemInitialHoveredIconCard
            initial="D"
            name="Default Fields"
            id={'default'}
            onIconClick={() => {
              router?.push({
                pathname: AIR_SERVICES?.ASSET_TYPE_DEFAULT_FIELDS,
              });
            }}
          />
          {data?.data?.map((parent: any) => (
            <CustomAccordion
              variantType={ACCORDION_VARIANTS?.TERTIARY}
              key={parent?._id}
              disabled={parent?.perDefine}
              summaryKey={parent?._id}
              accordionSummary={
                <ItemInitialHoveredIconCard
                  name={parent?.name}
                  id={parent?._id}
                  key={parent?._id}
                  iconList={['edit']}
                  onIconClick={(event: any) => {
                    event?.stopPropagation();
                    setParentDetails({ open: true, parentData: parent });
                  }}
                />
              }
            >
              {!!parent?.childList?.length &&
                parent?.childList?.map((child: any) => (
                  <ItemInitialHoveredIconCard
                    initial={parent?.name?.slice(0, 1)}
                    name={child?.name}
                    id={child?._id}
                    key={child?._id}
                    iconList={['edit']}
                    onIconClick={() =>
                      setChildDetails({
                        open: true,
                        parentData: parent,
                        childData: child,
                      })
                    }
                  />
                ))}
              <AddNewItemButton
                variant={'outlined'}
                color={'secondary'}
                iconType="square"
                name="Add New"
                onClick={() =>
                  setChildDetails({
                    open: true,
                    parentData: parent,
                    childData: null,
                  })
                }
              />
            </CustomAccordion>
          ))}
        </Box>
      </ApiRequestFlow>
      {parentDetails?.open && (
        <ParentType
          parentDetails={parentDetails}
          setParentDetails={setParentDetails}
        />
      )}

      {childDetails?.open && (
        <ChildType
          childDetails={childDetails}
          setChildDetails={setChildDetails}
        />
      )}
    </Fragment>
  );
};
