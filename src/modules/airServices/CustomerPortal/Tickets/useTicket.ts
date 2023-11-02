import { useState } from 'react';

export const useTicket = () => {
  const [status, setStatus] = useState(false);

  return {
    status,
    setStatus,
  };
};
