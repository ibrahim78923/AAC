import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
export const useApprovals = () => {
  const router = useRouter();
  const { palette }: any = useTheme();
  const theme = useTheme();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState<any>({});
  const setApproval = (approval: any) => {
    setSelectedApproval(approval);
    setIsConfirmModalOpen(true);
  };

  return {
    router,
    theme,
    palette,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    selectedApproval,
    setSelectedApproval,
    setApproval,
  };
};
