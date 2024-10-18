import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useAssociateAssetsDropdown } from './useAssociateAssetsDropdown';

export const AssociateAssetsDropdown = (props: any) => {
  const { getCompanyId, apiQueryAssociateAsset } = useAssociateAssetsDropdown();
  return (
    <RHFAutocompleteAsync
      name="associatesAssets"
      label="Associate Assets"
      fullWidth
      multiple
      apiQuery={apiQueryAssociateAsset}
      externalParams={{ companyId: getCompanyId }}
      getOptionLabel={(option: any) => option?.displayName}
      placeholder="Choose Assets"
      {...props}
    />
  );
};
