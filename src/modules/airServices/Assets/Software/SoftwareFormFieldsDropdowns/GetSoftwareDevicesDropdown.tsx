import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetAssetsDropdownQuery } from '@/services/airServices/assets/software/single-software-detail/installations';

const GetSoftwareDevicesDropdown = () => {
  const devicesQuery = useLazyGetAssetsDropdownQuery();

  return (
    <>
      <RHFAutocompleteAsync
        name="device"
        placeholder="Search or add device"
        size="small"
        label="Device"
        required
        apiQuery={devicesQuery}
        getOptionLabel={(option: { _id: string; displayName: string }) =>
          option?.displayName
        }
      />
    </>
  );
};

export default GetSoftwareDevicesDropdown;
