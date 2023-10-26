import { useState, useEffect } from 'react';
import {
  TABLE_CONSTANTS,
  ticketsActionDropdownFunction,
  ticketsListsColumnFunction,
  ticketsListsData,
} from './TicketsLists.data';
import { TicketsColumnDrag } from './components/TicketsColumnDrag';
import { useRouter } from 'next/router';
import { TicketsBulkUpdate } from './components/TicketsBulkUpdate';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ticketsBulkUpdateFormSchemaFunction } from './components/TicketsBulkUpdate/TicketsBulkUpdate.data';
import { useTheme } from '@mui/material';
import {
  ticketsFilterDefaultFormValuesFunction,
  ticketsFilterFormSchema,
} from './components/TicketsFilter/TicketsFilter.data';
import { TicketsFilter } from './components/TicketsFilter';
import CreateTicket from '../CreateTicket';
import {
  createTicketDefaultValues,
  createTicketValidationSchema,
} from '../CreateTicket/CreateTicket.data';
import { enqueueSnackbar } from 'notistack';

export const useTicketsLists = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [ticketList, setTicketList] = useState([]);
  const [selectedTicketList, setSelectedTicketList] = useState([]);

  useEffect(() => {
    setTicketList(ticketsListsData);
  }, [ticketsListsData]);

  const [to, setTo] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const theme = useTheme();
  const router = useRouter();

  const submitTicketBulkUpdateForm = async () => {};

  const submitCreateNewTicket = async () => {
    enqueueSnackbar('Ticket Added Successfully', {
      variant: 'success',
    });
    methodsCreateNewTicketForm.reset(createTicketDefaultValues);
    setIsDrawerOpen(false);
  };

  const handleChange = (value: any, event: any) => {
    setTicketList(
      (preVal: any) =>
        preVal?.map((item: any) =>
          value?.ticketId === item?.ticketId
            ? { ...item, [event?.name]: [event?.value] }
            : item,
        ),
    );
  };

  const [ticketsListsColumn, seTTicketsListsColumn] = useState(
    ticketsListsColumnFunction(
      theme,
      router,
      ticketList,
      setTicketList,
      ticketsListsData,
      handleChange,
    ),
  );
  const ticketsListsColumnPersist = ticketsListsColumnFunction(
    theme,
    router,
    ticketList,
    setTicketList,
    ticketsListsData,
    handleChange,
  );

  const methodsBulkUpdateForm: any = useForm({
    resolver: yupResolver(ticketsBulkUpdateFormSchemaFunction?.(to)),
    defaultValues: ticketsBulkUpdateFormSchemaFunction?.(to),
  });

  const methodsTicketFilterForm = useForm({
    resolver: yupResolver(ticketsFilterFormSchema),
    defaultValues: ticketsFilterDefaultFormValuesFunction?.(),
  });

  const methodsCreateNewTicketForm = useForm({
    resolver: yupResolver(createTicketValidationSchema),
    defaultValues: createTicketDefaultValues,
  });

  const customizeColumns: any = ticketsListsColumnPersist.reduce(
    (x: any, y: any) => {
      const { id } = y;
      return { ...x, [id]: true };
    },
    {},
  );
  const [customizeColumn, setCustomizeColumn] = useState(customizeColumns);

  const submitTicketFilterForm = async () => {};

  const resetTicketFilterForm = async () => {
    methodsTicketFilterForm?.reset();
    setIsDrawerOpen(false);
  };

  const drawerComponent: any = {
    'customize-column': {
      title: 'Customize Column',
      okText: 'Submit',
      isOk: true,
      submitHandler: () => {
        const newTableColumns = ticketsListsColumnPersist.filter(
          (x: any) => customizeColumn[x.id],
        );
        seTTicketsListsColumn(newTableColumns);
      },
      children: (
        <TicketsColumnDrag
          checkboxClick={(co: any) => {
            if (customizeColumn[co.id]) {
              delete customizeColumn[co.id];

              // const { [keys], ...restCustomize } = customizeColumn;
              // setCustomizeColumn({
              //   // ...restCustomize,
              // });
              return;
            }
            setCustomizeColumn({
              ...customizeColumn,
              [co.id]: true,
            });
          }}
          tableColumns={ticketsListsColumnPersist?.slice(1)}
          customizeColumn={customizeColumn}
        />
      ),
    },
    'filter-data': {
      title: 'Filter',
      okText: 'Apply',
      cancelText: 'Reset',
      isOk: true,
      submitHandler: () => {
        methodsTicketFilterForm.handleSubmit(submitTicketFilterForm)();
      },
      resetHandler: resetTicketFilterForm,
      children: (
        <TicketsFilter
          methods={methodsTicketFilterForm}
          reset={resetTicketFilterForm}
          submitTicketFilterForm={submitTicketFilterForm}
          handleSubmit={methodsTicketFilterForm.handleSubmit}
        />
      ),
    },
    'bulk-update-data': {
      title: 'Bulk Update',
      okText: 'Submit',
      isOk: true,
      submitHandler: () => {
        methodsBulkUpdateForm.handleSubmit(submitTicketBulkUpdateForm)();
      },
      children: (
        <TicketsBulkUpdate
          submitTicketBulkUpdateForm={submitTicketBulkUpdateForm}
          to={to}
          setTo={setTo}
          methods={methodsBulkUpdateForm}
          reset={methodsBulkUpdateForm?.reset}
          handleSubmit={methodsBulkUpdateForm.handleSubmit}
        />
      ),
    },
    'create-new-ticket': {
      title: 'Create Ticket',
      okText: 'Submit',
      isOk: true,
      submitHandler: () => {
        methodsCreateNewTicketForm.handleSubmit(submitCreateNewTicket)();
      },
      children: (
        <CreateTicket
          submitCreateNewTicket={submitCreateNewTicket}
          methods={methodsCreateNewTicketForm}
          handleSubmit={methodsCreateNewTicketForm.handleSubmit}
        />
      ),
    },
  };

  const openDrawer = (tableActionQuery: any) => {
    router.push({
      pathname: router.pathname,
      query: {
        tableAction: tableActionQuery,
      },
    });
    setTimeout(() => {
      setIsDrawerOpen(true);
    }, 100);
  };
  const ticketsActionDropdown = ticketsActionDropdownFunction?.();
  // openDrawer,
  // setDeleteModalOpen,
  return {
    theme,
    router,
    ticketList,
    selectedTicketList,
    setSelectedTicketList,
    handleChange,
    ticketsListsColumn,
    isDrawerOpen,
    setIsDrawerOpen,
    openDrawer,
    TABLE_CONSTANTS,
    drawerComponent,
    ticketsActionDropdown,
    deleteModalOpen,
    setDeleteModalOpen,
  };
};
