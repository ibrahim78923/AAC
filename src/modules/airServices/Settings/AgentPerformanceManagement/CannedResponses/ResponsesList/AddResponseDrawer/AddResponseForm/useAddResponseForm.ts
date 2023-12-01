import { useEffect, useState } from 'react';

export const useAddResponseForm = (props: any) => {
  const { submitCreateNewTicket, methods, handleSubmit } = props;
  const { watch } = methods;
  const [openSelectAgentsModal, setOpenSelectAgentsModal] = useState(false);
  const [agents, setAgents] = useState<any>([]);
  const availableForChanged = watch('availableFor');
  useEffect(() => {
    if (watch('availableFor') === 'selectAgents') {
      setOpenSelectAgentsModal(true);
    }
  }, [availableForChanged]);
  return {
    methods,
    handleSubmit,
    submitCreateNewTicket,
    agents,
    setAgents,
    setOpenSelectAgentsModal,
    openSelectAgentsModal,
  };
};
