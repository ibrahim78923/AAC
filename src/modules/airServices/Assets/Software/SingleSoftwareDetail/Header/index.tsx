import { Box, Skeleton } from '@mui/material';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useHeader } from './useHeader';
import { UpsertSoftware } from '../../UpsertSoftware';
import { DeleteSoftware } from '../../DeleteSoftware';
import { ARRAY_INDEX } from '@/constants/strings';
import { PublicSingleDropdownButton } from '@/components/Buttons/PublicSingleDropdownButton';
import { capitalizeFirstWord } from '@/utils/api';

export default function Header() {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    moveBackArrow,
    data,
    isLoading,
    isFetching,
    actionOptions,
  } = useHeader();

  if (isLoading || isFetching) return <Skeleton height={50} />;

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={2}
      >
        <PageTitledHeader
          canMovedBack
          moveBack={moveBackArrow}
          title={capitalizeFirstWord(data?.data?.[ARRAY_INDEX?.ZERO]?.name)}
        />
        <PublicSingleDropdownButton dropdownOptions={actionOptions} />
      </Box>
      {deleteModalOpen && (
        <DeleteSoftware
          deleteModalOpen={deleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
        />
      )}
      {isDrawerOpen && (
        <UpsertSoftware
          isAddDrawerOpen={isDrawerOpen}
          setIsAddDrawerOpen={setIsDrawerOpen}
          data={data?.data?.[ARRAY_INDEX?.ZERO]}
          isLoading={isLoading}
          isFetching={isFetching}
        />
      )}
    </>
  );
}
