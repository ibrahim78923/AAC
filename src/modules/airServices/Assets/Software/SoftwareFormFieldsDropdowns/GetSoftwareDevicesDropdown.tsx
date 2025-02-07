import { RHFAutocompleteAsync } from '@/components/ReactHookForm';

const GetSoftwareDevicesDropdown = ({ devicesQuery }: any) => {
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
