import { useState } from 'react';

export function RequestApprovals() {
  const [cancleApproval, setCancleApproval] = useState(false);
  const [receivedApproval, setReceivedApproval] = useState(true);

  const handleCancleApproval = () => {
    setCancleApproval(true);
  };
  const handleReceivedApproval = () => {
    setReceivedApproval(true);
  };

  return {
    cancleApproval,
    receivedApproval,
    handleCancleApproval,
    handleReceivedApproval,
  };
}
