import { useState } from 'react';
import {
  TABLE_CONSTANTS,
  ticketsListsColumnFunction,
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

export const useTicketsLists = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [to, setTo] = useState(false);
  const theme = useTheme();
  const router = useRouter();

  const submitTicketBulkUpdateForm = async () => {};

  const submitCreateNewTicket = async () => {};

  const [ticketsListsColumn, seTTicketsListsColumn] = useState(
    ticketsListsColumnFunction(theme, router),
  );
  const ticketsListsColumnPersist = ticketsListsColumnFunction(theme, router);
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
      return { [id]: true, ...x };
    },
    {},
  );
  const [customizeColumn, setCustomizeColumn] = useState(customizeColumns);
  const submitTicketFilterForm = async () => {};
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
              // console.log(customizeColumn);

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
      okText: 'Submit',
      isOk: true,
      submitHandler: () => {
        methodsTicketFilterForm.handleSubmit(submitTicketFilterForm)();
      },
      children: (
        <TicketsFilter
          methods={methodsTicketFilterForm}
          reset={methodsTicketFilterForm?.reset}
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

  return {
    ticketsListsColumn,
    isDrawerOpen,
    setIsDrawerOpen,
    router,
    openDrawer,
    TABLE_CONSTANTS,
    drawerComponent,
  };
};
