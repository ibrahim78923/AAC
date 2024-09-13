import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { ARRAY_INDEX } from '@/constants/strings';
import useAuth from '@/hooks/useAuth';
import { useLazyGetFoldersDropdownQuery } from '@/services/airServices/knowledge-base/articles';

export const FoldersFields = (props: any) => {
  const { label = 'Folder' } = props;
  const auth: any = useAuth();
  const { _id: companyId } =
    auth?.product?.accounts?.[ARRAY_INDEX?.ZERO]?.company ?? {};
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
