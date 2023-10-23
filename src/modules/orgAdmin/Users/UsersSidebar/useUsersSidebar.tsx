import { useState } from 'react';

const useUsersSidebar = () => {
  const [userStatus, setUserStatus] = useState('active');
  return {
    userStatus,
    setUserStatus,
  };
};

export default useUsersSidebar;
