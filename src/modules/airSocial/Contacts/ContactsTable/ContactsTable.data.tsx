import { useRouter } from 'next/router';
import { Avatar, Box } from '@mui/material';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { AIR_SOCIAL } from '@/routesConstants/paths';
import { IMG_URL } from '@/config';
import RowSelection from '@/components/RowSelection';
import RowSelectionAll from '@/components/RowSelectionAll';

export const ContactsColumns = (
  columnsData: any,
  selectedRow: any,
  setSelectedRow: any,
) => {
  const router = useRouter();
  const COLUMNS_ATTR = {
    CONTACTS: 'contacts',
    EMAIL: 'email',
    ADDRESS: 'address',
    DATE_BIRTH: 'dateOfBirth',
    PHONE_NUMBER: 'phoneNumber',
    WHATSAPP_NUMBER: 'whatsAppNumber',
  };

  const activeColumnsData = (attribute: any, info: any) => {
    if (attribute?.includes(COLUMNS_ATTR?.CONTACTS)) {
      const firstName = info?.cell?.row?.original?.firstName
        ? info?.cell?.row?.original?.firstName
        : '';
      const lastName = info?.cell?.row?.original?.lastName
        ? info?.cell?.row?.original?.lastName
        : '';
      const fullName = `${firstName} ${lastName}`;
      const contactId = info?.row?.original?._id;
      const imgAlt = `${firstName?.charAt(0)}${lastName?.charAt(0)}`;
      const imgUrl = info?.cell?.row?.original?.profilePicture?.url;
      const email = info?.cell?.row?.original?.email;
      return (
        <Box
          onClick={() => router.push(`${AIR_SOCIAL?.CONTACTS}/${contactId}`)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <Avatar
            sx={{
              bgcolor: 'primary.main',
              textTransform: 'uppercase',
              fontSize: '14px',
              mr: '6px',
            }}
            alt={info?.getValue()}
            src={`${IMG_URL}${imgUrl}`}
          >
            {imgAlt}
          </Avatar>
          <Box>
            {firstName === '' && lastName === '' ? (
              <></>
            ) : (
              <Box sx={{ color: 'blue.dull_blue' }}>{fullName}</Box>
            )}

            <Box sx={{ fontSize: '12px' }}>{email}</Box>
          </Box>
        </Box>
      );
    } else if (attribute === COLUMNS_ATTR?.DATE_BIRTH) {
      const formattedDate = dayjs(info?.getValue()).format(DATE_FORMAT?.UI);
      return formattedDate;
    } else {
      return info?.getValue();
    }
  };

  const checkboxColumn = {
    accessorFn: (row: any) => row?.Id,
    id: 'Id',
    isSortable: false,
    header: (info: any) => {
      const rows = info?.table?.options?.data;
      return (
        <RowSelectionAll
          rows={rows}
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
          disabled={rows?.length === 0}
        />
      );
    },
    cell: (info: any) => {
      const id = info?.cell?.row?.original?._id;
      return (
        <RowSelection
          id={id}
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
        />
      );
    },
  };

  const tableActiveColumns: any =
    columnsData
      ?.filter((item: any) => item?.active)
      .map((item: any) => ({
        accessorFn: (row: any) => row[item?.attributes],
        id: item?.attributes,
        isSortable: true,
        header: item?.slug,
        cell: (info: any) => activeColumnsData(item?.attributes, info),
      })) || [];
  const columns = [checkboxColumn, ...tableActiveColumns];
  return columns;
};
