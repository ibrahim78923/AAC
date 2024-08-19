import {
  AutocompleteAsyncOptionsI,
  AutocompleteOptionsI,
} from '@/components/ReactHookForm/ReactHookForm.interface';

export interface TicketsFilterDataDefaultValuesI {
  category?: AutocompleteAsyncOptionsI | null;
  agent?: AutocompleteAsyncOptionsI | null;
  requester?: AutocompleteAsyncOptionsI | null;
  department?: AutocompleteAsyncOptionsI | null;
  createdOn?: any;
  status?: AutocompleteOptionsI | null;
  ticketType?: AutocompleteOptionsI | null;
  pirority?: AutocompleteOptionsI | null;
  impact?: AutocompleteOptionsI | null;
  typeSource?: AutocompleteOptionsI | null;
  plannedStartDate?: any;
  plannedEndDate?: any;
}

export interface TicketsFilterFormFieldsI {
  category?: AutocompleteAsyncOptionsI | null;
  agent?: AutocompleteAsyncOptionsI | null;
  requester?: AutocompleteAsyncOptionsI | null;
  department?: AutocompleteAsyncOptionsI | null;
  createdOn?: any;
  status?: AutocompleteOptionsI | null;
  ticketType?: AutocompleteOptionsI | null;
  pirority?: AutocompleteOptionsI | null;
  impact?: AutocompleteOptionsI | null;
  typeSource?: AutocompleteOptionsI | null;
  plannedStartDate?: any;
  plannedEndDate?: any;
}
