import React from 'react';
import { InstallationHeader } from './InstallationHeader';
import { InstallationTable } from './InstallationTable';
import { useInstallation } from '../useInstallations';

export const InstallationDetails = () => {
  const { activeCheck, setActiveCheck } = useInstallation();
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
