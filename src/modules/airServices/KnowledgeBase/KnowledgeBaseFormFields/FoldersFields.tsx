import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import useAuth from '@/hooks/useAuth';
import { useLazyGetFoldersDropdownQuery } from '@/services/airServices/knowledge-base/articles';
import { getActiveAccountSession } from '@/utils';
import { useMemo } from 'react';

export const FoldersFields = (props: any) => {
  const { label = 'Folder' } = props;
  const auth: any = useAuth();
  const product = useMemo(() => getActiveAccountSession(), []);
  const companyId = product?.company?._id ?? {};
  const { _id: userId } = auth?.user ?? {};
  const { _id: organizationId } = auth?.user?.organization ?? {};
  const apiQueryFolder = useLazyGetFoldersDropdownQuery();

  return (
    <RHFAutocompleteAsync
      fullWidth
      name="folder"
      label={label}
      size="small"
      placeholder="Select a Folder"
      sx={{ pb: 1.2 }}
      apiQuery={apiQueryFolder}
      required
      externalParams={{
        userId,
        companyId,
        organizationId,
      }}
    />
  );
};

export default FoldersFields;
