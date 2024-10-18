import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { CONTRACT_TYPES_CHECK } from '../UpsertContract/UpsertContract.data';
import { useLazyGetAssetsDropdownListForContractApprovalsQuery } from '@/services/airServices/assets/contracts';

const GetContractAssetsDropdown = ({ watchForContractType }: any) => {
  const apiQueryAsset = useLazyGetAssetsDropdownListForContractApprovalsQuery();
  return (
    <>
      <RHFAutocompleteAsync
        name="associateAssets"
        label="Associate Assets"
        placeholder="Select Associate Assets"
        fullWidth
        size="small"
        required={
          watchForContractType?.name !== CONTRACT_TYPES_CHECK?.SOFTWARE_LICENSE
        }
        disabled={
          watchForContractType?.name === CONTRACT_TYPES_CHECK?.SOFTWARE_LICENSE
        }
        apiQuery={apiQueryAsset}
        externalParams={{ limit: 50 }}
        getOptionLabel={(option: any) => option?.displayName}
      />
    </>
  );
};

export default GetContractAssetsDropdown;
