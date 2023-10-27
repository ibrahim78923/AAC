import { InstallationHeader } from './InstallationHeader';
import { InstallationTable } from './InstallationTable';
import { useInstallationDetail } from './useInstallationsDetail';

export const InstallationDetails = () => {
  const { activeCheck, setActiveCheck } = useInstallationDetail();
  return (
    <>
      <InstallationHeader activeCheck={activeCheck} />
      <br />
      <InstallationTable
        activeCheck={activeCheck}
        setActiveCheck={setActiveCheck}
      />
    </>
  );
};
