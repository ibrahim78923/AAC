import { AIR_SERVICES_ENQUIRIES_PERMISSION } from '@/constants/permission-keys';
import { truncateText } from '@/utils/avatarUtils';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { Checkbox, CircularProgress, MenuItem, Select } from '@mui/material';
import { errorSnackbar } from '@/utils/api';
import { ARRAY_INDEX, DONE } from '@/constants/strings';
import {
  ICloseMenu,
  IEnquiry,
  IGetEnquiriesActionDropdown,
  IGetEnquiriesColumnsArgs,
  IGetEnquiriesColumnsReturn,
} from './Enquiries.interface';
import { ChangeEvent } from 'react';

export const statusOptions = ['Done', 'Pending'];

export const getEnquiriesActionDropdown = ({
  enquiriesSelected,
  setIsModalOpen,
}: IGetEnquiriesActionDropdown) => [
  {
    id: 1,
    permissionKey: [AIR_SERVICES_ENQUIRIES_PERMISSION?.VIEW_ENQUIRY],
    title: 'View & Reply',
    handleClick: (closeMenu: () => void) => {
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
    handleClick: (closeMenu: () => void) => {
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
    handleClick: (closeMenu: ICloseMenu) => {
      if (enquiriesSelected?.length > 1) {
        errorSnackbar('Please Select Only One Enquiry');
        closeMenu?.();
        return;
      }
      if (enquiriesSelected?.[ARRAY_INDEX?.ZERO]?.ticketCreated) {
        errorSnackbar('Ticket Already Created!');
        closeMenu?.();
        return;
      }
      if (enquiriesSelected?.[ARRAY_INDEX?.ZERO]?.status === DONE) {
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
    handleClick: (closeMenu: ICloseMenu) => {
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
}: IGetEnquiriesColumnsArgs): IGetEnquiriesColumnsReturn => [
  {
    accessorFn: (row: IEnquiry) => row,
    id: '_id',
    cell: (info) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={!!enquiriesSelected?.find((item) => item === info?.getValue())}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          e?.target?.checked
            ? setEnquiriesSelected([...enquiriesSelected, info?.getValue()])
            : setEnquiriesSelected(
                enquiriesSelected?.filter((item) => item !== info?.getValue()),
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
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          e?.target?.checked
            ? setEnquiriesSelected(dataArray?.map((enquiry) => enquiry))
            : setEnquiriesSelected([]);
        }}
        color="primary"
        name="_id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: IEnquiry) => row?.name ?? '-',
    id: 'name',
    isSortable: true,
    header: 'Name',
    cell: (info) => info?.getValue() ?? '-',
  },
  {
    accessorFn: (row: IEnquiry) => row?.email,
    id: 'email',
    isSortable: true,
    header: 'Email',
    cell: (info) => info?.getValue() ?? '-',
  },
  {
    accessorFn: (row: IEnquiry) => row?.phoneNumber,
    id: 'phoneNumber',
    isSortable: true,
    header: 'Phone Number',
    cell: (info) => info?.getValue() ?? '-',
  },
  {
    accessorFn: (row: IEnquiry) => row?.query,
    id: 'comments',
    isSortable: true,
    header: 'Comments',
    cell: (info) => truncateText(info?.getValue()),
  },
  {
    accessorFn: (row: IEnquiry) => row?.ticketCreated,
    id: 'ticketCreated',
    header: 'Ticket Created',
    cell: (info) => (info?.getValue() ? 'Created' : 'Not Created'),
  },
  {
    accessorFn: (row: IEnquiry) => row?.status,
    id: 'status',
    header: 'Status',
    cell: (info) => (
      <>
        {patchEnquiriesStatus?.isLoading &&
        patchEnquiriesStatus?.originalArgs?.queryParams ===
          info?.row?.original?._id ? (
          <CircularProgress size={20} />
        ) : (
          <Select
            value={info?.getValue()}
            label={''}
            onChange={(event: ChangeEvent<HTMLSelectElement> | any) =>
              handleStatusChange(info?.row?.original, event)
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
