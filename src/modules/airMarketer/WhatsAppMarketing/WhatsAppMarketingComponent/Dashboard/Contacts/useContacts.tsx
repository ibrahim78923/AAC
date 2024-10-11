import { CONTACTS_CONSTANTS } from '@/constants/strings';
import { useGetContactsListQuery } from '@/services/common-APIs';
import { countRecentContacts } from '@/utils';
import { Theme, useTheme } from '@mui/material';

const useContacts = () => {
  const theme = useTheme<Theme>();

  const { data: dataGetContacts, isLoading: loadingGetContacts } =
    useGetContactsListQuery({
      numberType: CONTACTS_CONSTANTS?.WHATSAPP_NUMBER,
    });

  const allContacts = dataGetContacts?.data?.contacts;

  const recentContactsCount = countRecentContacts(allContacts);

  return {
    theme,
    allContacts,
    loadingGetContacts,
    recentContactsCount,
  };
};

export default useContacts;
