import { Header } from './Header';
import { InstallDevicesList } from './InstallDevicesList';
import { useInstallations } from './useInstallations';

export const Installations = () => {
  const {
    isPortalOpen,
    setIsPortalOpen,
    page,
    setPage,
    selectedDeviceList,
    setSelectedDeviceList,
    search,
    setSearch,
  } = useInstallations();

  return (
    <>
      <Header
        isPortalOpen={isPortalOpen}
        setIsPortalOpen={setIsPortalOpen}
        page={page}
        setPage={setPage}
        selectedDeviceList={selectedDeviceList}
        setSelectedDeviceList={setSelectedDeviceList}
        search={search}
        setSearch={setSearch}
      />
      <br />

      <InstallDevicesList
        isPortalOpen={isPortalOpen}
        setIsPortalOpen={setIsPortalOpen}
        page={page}
        setPage={setPage}
        selectedDeviceList={selectedDeviceList}
        setSelectedDeviceList={setSelectedDeviceList}
        search={search}
        setSearch={setSearch}
      />
    </>
  );
};
