import { AIR_SERVICES_ENQUIRIES_PERMISSION } from '@/constants/permission-keys';
import { truncateText } from '@/utils/avatarUtils';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { Checkbox, CircularProgress, MenuItem, Select } from '@mui/material';
import { errorSnackbar } from '@/utils/api';
import { DONE } from '@/constants/strings';

export const statusOptions = ['Done', 'Pending'];

export const getEnquiriesActionDropdown = ({
  enquiriesSelected,
  setIsModalOpen,
}: any) => [
  {
    id: 1,
    permissionKey: [AIR_SERVICES_ENQUIRIES_PERMISSION?.VIEW_ENQUIRY],
    title: 'View & Reply',
    handleClick: (closeMenu: any) => {
      if (enquiriesSelected?.length > 1) {
        errorSnackbar('Please Select Only One Enquiry!');
        closeMenu?.();
        return;
      }
      setIsModalOpen({
        filterOpen: false,
        viewOpen: true,
        deleteOpen: false,
        convertToTicket: false,
        createRequester: false,
        data: enquiriesSelected,
      });
      closeMenu?.();
    },
  },
  {
    id: 2,
    permissionKey: [AIR_SERVICES_ENQUIRIES_PERMISSION?.DELETE_ENQUIRY],
    title: 'Delete',
    handleClick: (closeMenu: any) => {
      setIsModalOpen({
        filterOpen: false,
        viewOpen: false,
        deleteOpen: true,
        convertToTicket: false,
        createRequester: false,
        data: enquiriesSelected,
      });
      closeMenu?.();
    },
  },
  {
    id: 3,
    permissionKey: [AIR_SERVICES_ENQUIRIES_PERMISSION?.ENQUIRIES_LIST],
    title: 'Convert to Ticket',
    handleClick: (closeMenu: any) => {
      if (enquiriesSelected?.length > 1) {
        errorSnackbar('Please Select Only One Enquiry');
        closeMenu?.();
        return;
      }
      if (enquiriesSelected?.[0]?.ticketCreated) {
        errorSnackbar('Ticket Already Created!');
        closeMenu?.();
        return;
      }
      if (enquiriesSelected?.[0]?.status === DONE) {
        errorSnackbar('Enquiry Already Resolved!');
        closeMenu?.();
        return;
      }
      setIsModalOpen({
        filterOpen: false,
        viewOpen: false,
        deleteOpen: false,
        convertToTicket: true,
        createRequester: false,
        data: enquiriesSelected,
      });
      closeMenu?.();
    },
  },
  {
    id: 4,
    permissionKey: [AIR_SERVICES_ENQUIRIES_PERMISSION?.ENQUIRIES_LIST],
    title: 'Create Requester',
    handleClick: (closeMenu: any) => {
      if (enquiriesSelected?.length > 1) {
        errorSnackbar('Please Select Only One Enquiry');
        closeMenu?.();
        return;
      }
      setIsModalOpen({
        filterOpen: false,
        viewOpen: false,
        deleteOpen: false,
        convertToTicket: false,
        createRequester: true,
        data: enquiriesSelected,
      });
      closeMenu?.();
    },
  },
];

export const getEnquiriesColumns = ({
  enquiriesSelected,
  setEnquiriesSelected,
  dataArray,
  handleStatusChange,
  patchEnquiriesStatus,
}: any) => [
  {
    accessorFn: (row: any) => row,
    id: '_id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          !!enquiriesSelected?.find((item: any) => item === info?.getValue())
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setEnquiriesSelected([...enquiriesSelected, info?.getValue()])
            : setEnquiriesSelected(
                enquiriesSelected?.filter(
                  (item: any) => item !== info?.getValue(),
                ),
              );
        }}
        color="primary"
        name={info?.getValue()}
      />
    ),
    header: (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          dataArray?.length
            ? enquiriesSelected?.length === dataArray?.length
            : false
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setEnquiriesSelected(dataArray?.map((enquiry: any) => enquiry))
            : setEnquiriesSelected([]);
        }}
        color="primary"
        name="_id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.name ?? '-',
    id: 'name',
    isSortable: true,
    header: 'Name',
    cell: (info: any) => info?.getValue() ?? '-',
  },
  {
    accessorFn: (row: any) => row?.email,
    id: 'email',
    isSortable: true,
    header: 'Email',
    cell: (info: any) => info?.getValue() ?? '-',
  },
  {
    accessorFn: (row: any) => row?.phoneNumber,
    id: 'phoneNumber',
    isSortable: true,
    header: 'Phone Number',
    cell: (info: any) => info?.getValue() ?? '-',
  },
  {
    accessorFn: (row: any) => row?.query,
    id: 'comments',
    isSortable: true,
    header: 'Comments',
    cell: (info: any) => truncateText(info?.getValue()),
  },
  {
    accessorFn: (row: any) => row?.ticketCreated,
    id: 'ticketCreated',
    header: 'Ticket Created',
    cell: (info: any) => (info?.getValue() ? 'Created' : 'Not Created'),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    header: 'Status',
    cell: (info: any) => (
      <>
        {patchEnquiriesStatus?.isLoading &&
        patchEnquiriesStatus?.originalArgs?.queryParams ===
          info?.row?.original?._id ? (
          <CircularProgress size={20} />
        ) : (
          <Select
            value={info?.getValue()}
            label={''}
            onChange={(event: any) =>
              handleStatusChange?.(info?.row?.original, event)
            }
            disabled={patchEnquiriesStatus?.isLoading}
            size={'small'}
            sx={{
              color: 'custom.main',
              '.MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
          >
            <MenuItem value={'done'}>Done</MenuItem>
            <MenuItem value={'pending'}>Pending</MenuItem>
          </Select>
        )}
      </>
    ),
  },
];
