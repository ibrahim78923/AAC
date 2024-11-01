import { useGetGmailFoldersQuery } from '@/services/commonFeatures/email/gmail';
import { useGetMailFoldersOutlookQuery } from '@/services/commonFeatures/email/outlook';
import { useEffect, useState } from 'react';

const useEmails = () => {
  const [openDrawer, setOpenDrawer] = useState('');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>([]);

  const {
    data: outlookFoldersData,
    isLoading: outlookFoldersLoading,
    refetch: outLookRefetch,
  } = useGetMailFoldersOutlookQuery({});
  const {
    data: gmailFoldersData,
    isLoading: gmailFoldersLoading,
    refetch: gmailRefetch,
  } = useGetGmailFoldersQuery({});

  const handleCheckboxChange = (item: any) => {
    setSelectedCheckboxes((prevSelected: any) => {
      if (prevSelected.some((selected: any) => selected._id === item._id)) {
        return prevSelected.filter(
          (selected: any) => selected._id !== item._id,
        );
      } else {
        return [...prevSelected, item];
      }
    });
  };

  useEffect(() => {
    outLookRefetch();
    gmailRefetch();
  }, []);

  return {
    openDrawer,
    setOpenDrawer,
    selectedCheckboxes,
    handleCheckboxChange,
    outlookStates: { outlookFoldersData, outlookFoldersLoading },
    gmailStates: { gmailFoldersData, gmailFoldersLoading },
  };
};

export default useEmails;
