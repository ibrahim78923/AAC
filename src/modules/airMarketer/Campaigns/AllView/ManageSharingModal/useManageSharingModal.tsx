import { useState } from 'react';

const useManageSharingModal = () => {
  const [accessValue, setAccessValue] = useState('');
  const handleChangeAccessValue = (event: any) => {
    setAccessValue(event?.target?.value);
  };
  return {
    accessValue,
    setAccessValue,
    handleChangeAccessValue,
  };
};
export default useManageSharingModal;
export const teamsArr = [
  {
    label: 'Marketing Team',
    value: 'marketingTeam',
  },
  {
    label: 'Team Alpha',
    value: 'teamAlpha',
  },
  {
    label: 'Team Bravo',
    value: 'teamBravo',
  },
];
