import { CONTACTS_CONSTANTS } from '@/constants/strings';
import { useGetContactsListQuery } from '@/services/common-APIs';
import { Theme, useTheme } from '@mui/material';

const useContacts = () => {
  const theme = useTheme<Theme>();

  const { data: dataGetContacts, isLoading: loadingGetContacts } =
    useGetContactsListQuery({
      numberType: CONTACTS_CONSTANTS?.WHATSAPP_NUMBER,
    });

  const allContacts = dataGetContacts?.data?.contacts;

  return {
    theme,
    allContacts,
    loadingGetContacts,
  };
};

export default useContacts;
