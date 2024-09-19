import { Checkbox, Typography } from '@mui/material';
import { AIR_SERVICES } from '@/constants';
import { TICKET_TYPE } from '@/constants/strings';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { NextRouter } from 'next/router';
import { TicketTableRowI } from '../TicketsLists.interface';
import { uiDateFormat } from '@/utils/dateTime';
import { TruncateText } from '@/components/TruncateText';
import { UserInfo } from '@/components/UserInfo';

export const ticketsListsColumnDynamic: any = (
  router?: NextRouter,
  ticketList = [],
  selectedTicketList?: any,
  setSelectedTicketList?: any,
) => {
  return [
    {
      accessorFn: (row: TicketTableRowI) => row?._id,
      id: '_id',
      cell: (info: any) => (
        <Checkbox
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxCheckedIcon />}
          checked={
            !!selectedTicketList?.find(
              (item: any) => item?._id === info?.getValue(),
            )
          }
          onChange={(e: any) => {
            e?.target?.checked
              ? setSelectedTicketList([
                  ...selectedTicketList,
                  info?.row?.original,
                ])
              : setSelectedTicketList(
                  selectedTicketList?.filter(
                    (item: any) => item?._id !== info?.getValue(),
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
            ticketList?.length
              ? selectedTicketList?.length === ticketList?.length
              : false
          }
          onChange={(e: any) => {
            e?.target?.checked
              ? setSelectedTicketList(ticketList?.map((ticket: any) => ticket))
              : setSelectedTicketList([]);
          }}
          color="primary"
          name="_id"
        />
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: TicketTableRowI) => row?.ticketIdNumber,
      id: 'ticketIdNumber',
      cell: (info: any) => (
        <UserInfo
          nameInitial={fullNameInitial(
            info?.row?.original?.departmentsDetails?.name,
          )}
          name={info?.getValue()}
          avatarSrc={info?.row?.original?.attachment?.fileUrl}
          handleNameClick={() => {
            router?.push({
              pathname: AIR_SERVICES?.TICKETS_LIST,
              query: {
                ticketId: info?.row?.original?._id,
              },
            });
          }}
          nameProps={{
            sx: {
              color: 'custom.bright',
              cursor: 'pointer',
            },
          }}
          avatarSize={{ variant: 'rounded', height: 25, width: 25 }}
        />
      ),
      header: 'Ticket ID',
      isSortable: true,
    },
    {
      accessorFn: (row: TicketTableRowI) => row?.subject,
      id: 'subject',
      isSortable: true,
      header: 'Subject',
      cell: (info: any) => (
        <>
          {info?.row?.original?.ticketType === TICKET_TYPE?.SR ? (
            <TruncateText
              text={info.getValue()}
              retainTextLeft="Request For: "
            />
          ) : (
            <TruncateText text={info.getValue()} />
          )}
        </>
      ),
    },
    {
      accessorFn: (row: TicketTableRowI) => row?.requesterDetails,
      id: 'requesterDetails',
      isSortable: true,
      header: 'Requester',
      cell: (info: any) => (
        <UserInfo
          nameInitial={fullNameInitial(
            info?.getValue()?.firstName,
            info?.getValue()?.lastName,
          )}
          name={fullName(
            info?.getValue()?.firstName,
            info?.getValue()?.lastName,
          )}
          avatarSrc={info?.row?.original?.requesterDetails?.avatar?.url}
        />
      ),
    },
    {
      accessorFn: (row: TicketTableRowI) => row?.agentDetails,
      id: 'agentDetails',
      isSortable: true,
      header: 'Assigned to',
      cell: (info: any) => (
        <Typography variant="body2" textTransform={'capitalize'}>
          {fullName(info?.getValue()?.firstName, info?.getValue()?.lastName)}
        </Typography>
      ),
    },
    {
      accessorFn: (row: TicketTableRowI) => row?.state,
      id: 'state',
      isSortable: true,
      header: 'State',
      cell: (info: any) => (
        <Typography variant={'body2'} textTransform={'capitalize'}>
          {info?.getValue() ?? '---'}
        </Typography>
      ),
    },
    {
      accessorFn: (row: TicketTableRowI) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => (
        <Typography variant={'body2'} textTransform={'capitalize'}>
          {info?.getValue()?.toLowerCase() ?? '---'}
        </Typography>
      ),
    },
    {
      accessorFn: (row: TicketTableRowI) => row?.pirority,
      id: 'pirority',
      isSortable: true,
      header: 'Priority',
      cell: (info: any) => (
        <Typography variant={'body2'} textTransform={'capitalize'}>
          {info?.getValue()?.toLowerCase() ?? '---'}
        </Typography>
      ),
    },
    {
      accessorFn: (row: TicketTableRowI) => row?.departmentsDetails,
      id: 'departmentsDetails',
      isSortable: true,
      header: 'Department',
      cell: (info: any) => (
        <TruncateText
          text={info.getValue()?.name?.toLowerCase()}
          boxProps={{ textTransform: 'capitalize' }}
        />
      ),
    },
    {
      accessorFn: (row: TicketTableRowI) => row?.createdAt,
      id: 'createdAt',
      isSortable: true,
      header: 'Created Date',
      cell: (info: any) => uiDateFormat(info?.getValue()),
    },
    {
      accessorFn: (row: TicketTableRowI) => row?.plannedEndDate,
      id: 'plannedEndDate',
      isSortable: true,
      header: 'Due Date',
      cell: (info: any) =>
        !!info?.getValue() ? uiDateFormat(info?.getValue()) : '---',
    },
    {
      accessorFn: (row: TicketTableRowI) => row?.impact,
      id: 'impact',
      isSortable: true,
      header: 'Impact',
      cell: (info: any) => (
        <Typography variant={'body2'} textTransform={'capitalize'}>
          {info?.getValue()?.toLowerCase() ?? '---'}
        </Typography>
      ),
    },
    {
      accessorFn: (row: TicketTableRowI) => row?.plannedStartDate,
      id: 'plannedStartDate',
      isSortable: true,
      header: 'Planned Start Date',
      cell: (info: any) => uiDateFormat(info?.getValue()),
    },
    {
      accessorFn: (row: TicketTableRowI) => row?.plannedEndDate,
      id: 'plannedEndDate',
      isSortable: true,
      header: 'Planned End Date',
      cell: (info: any) =>
        !!info?.getValue() ? uiDateFormat(info?.getValue()) : '---',
    },
    {
      accessorFn: (row: TicketTableRowI) => row?.plannedEffort,
      id: 'plannedEffort',
      isSortable: true,
      header: 'Planned Effort',
      cell: (info: any) => info?.getValue() ?? '---',
    },
  ];
};
