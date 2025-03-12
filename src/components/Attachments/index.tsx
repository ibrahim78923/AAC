import { Box } from '@mui/material';
import { AttachFileCard } from '@/components/Avatars/AttachFileCard';
import { useAttachments } from './useAttachments';
import NoData from '../NoData';
import { AttachmentsPropsI } from './Attachments.interface';
import dynamic from 'next/dynamic';
import LazyLoadingFlow from '../LazyLoadingFlow';
import { ContainerGrid } from '../Grids/ContainerGrid';
import { CustomGrid } from '../Grids/CustomGrid';
import { AddNewItemButton } from '../Buttons/AddNewItemButton';
import { ApiRequestFlow } from '../ApiRequestStates/ApiRequestFlow';

const DeleteAttachments = dynamic(() => import('./DeleteAttachments'), {
  ssr: false,
  loading: (options: any) => (
    <LazyLoadingFlow
      name="delete attachment"
      isLoading={options?.isLoading}
      error={options?.error}
    />
  ),
});

export const Attachments = (props: AttachmentsPropsI) => {
  const {
    permissionKey,
    size,
    colSpan,
    canAttachFile = false,
    attachFileHandler,
    children = <NoData message="No attachments found" height="100%" />,
    hasStyling = true,
    canDelete = true,
    hasNoDeletePermission = false,
  } = props;

  const {
    deleteModal,
    setDeleteModal,
    data,
    isFetching,
    isLoading,
    isError,
    getSingleAttachment,
  }: any = useAttachments(props);

  return (
    <>
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasError={isError}
        refreshApi={getSingleAttachment}
        errorHeight="100%"
      >
        {!!data?.data?.length ? (
          <>
            {canAttachFile && (
              <Box mb={2} textAlign={'end'}>
                <AddNewItemButton
                  name="Attach Files"
                  variant="outlined"
                  onClick={attachFileHandler}
                />
              </Box>
            )}
            <ContainerGrid>
              {data?.data?.map((singleAttachment: any) => (
                <CustomGrid
                  sm={colSpan?.sm ?? 6}
                  lg={colSpan?.lg ?? 4}
                  key={singleAttachment?._id}
                >
                  <AttachFileCard
                    size={size}
                    data={singleAttachment}
                    onDelete={() =>
                      setDeleteModal({ open: true, id: singleAttachment?._id })
                    }
                    permissionKey={permissionKey}
                    hasNoDeletePermission={hasNoDeletePermission}
                    hasStyling={hasStyling}
                    canDelete={canDelete}
                  />
                </CustomGrid>
              ))}
            </ContainerGrid>
          </>
        ) : (
          children
        )}
      </ApiRequestFlow>

      {deleteModal?.open && (
        <DeleteAttachments
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
          getSingleAttachment={getSingleAttachment}
        />
      )}
    </>
  );
};
