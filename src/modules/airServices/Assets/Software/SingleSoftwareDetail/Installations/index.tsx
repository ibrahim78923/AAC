import { InstallationDetails } from './InstallationDetails';
import AddDevice from './addDevice';

export const Installations = () => {
  return (
    <>
      Installation
      <AddDevice
        isModalOpen={false}
        setIsmodalOpen={{}}
        onSubmit={() => {}}
        options={[]}
      />
      <InstallationDetails />
    </>
  );
};
