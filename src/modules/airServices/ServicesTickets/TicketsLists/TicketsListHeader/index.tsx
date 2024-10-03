import Search from '@/components/Search';
import { Box, Button, ButtonGroup } from '@mui/material';
import { EditGreyIcon, FilterIcon, ListIcon, SubTabIcon } from '@/assets/icons';
import { Autorenew } from '@mui/icons-material';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { VIEW_TYPES } from '@/constants/strings';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import {
  AIR_SERVICES_TICKETS_TICKETS_DETAILS,
  AIR_SERVICES_TICKETS_TICKET_LISTS,
} from '@/constants/permission-keys';
import { useTicketsListHeader } from './useTicketsListHeader';
import { TICKETS_ACTION_CONSTANTS } from './TicketListHeader.data';

const {
  SEARCH_AND_FILTER,
  ACTIONS,
  RESET,
  COLUMN_CUSTOMIZATION,
  TICKETS_LIST_VIEW,
  BOARD_VIEW,
} = AIR_SERVICES_TICKETS_TICKET_LISTS ?? {};

const { UPDATE_INFO_EDIT_TICKET_DETAILS } =
  AIR_SERVICES_TICKETS_TICKETS_DETAILS ?? {};
const { BOARD } = VIEW_TYPES ?? {};

const { FILTER_DATA, CUSTOMIZE_COLUMN } = TICKETS_ACTION_CONSTANTS ?? {};

export const TicketsListHeader = () => {
  const {
    ticketsActionDropdown,
    isPortalOpen,
    ticketActionComponent,
    setTicketAction,
    handleSetSearch,
    selectedTicketLists,
    setInitialColumns,
    renderTableView,
    renderBoardView,
    router,
  } = useTicketsListHeader();

  return (
    <>
      <Box
        display={'flex'}
        gap={'1rem'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        alignItems={'center'}
      >
        <PermissionsGuard permissions={[SEARCH_AND_FILTER]}>
          <Search label="Search Here" setSearchBy={handleSetSearch} />
        </PermissionsGuard>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
          gap={'.5rem'}
        >
          <PermissionsGuard
            permissions={[ACTIONS, UPDATE_INFO_EDIT_TICKET_DETAILS]}
          >
            {router?.query?.viewType !== BOARD && (
              <SingleDropdownButton
                dropdownOptions={ticketsActionDropdown}
                disabled={!!!selectedTicketLists?.length}
              />
            )}
          </PermissionsGuard>
          <PermissionsGuard permissions={[RESET]}>
            {router?.query?.viewType !== BOARD && (
              <Button
                className="small"
                variant="outlined"
                onClick={setInitialColumns}
                color="secondary"
              >
                <Autorenew />
              </Button>
            )}
          </PermissionsGuard>
          <PermissionsGuard permissions={[COLUMN_CUSTOMIZATION]}>
            {router?.query?.viewType !== BOARD && (
              <Button
                className="small"
                variant="outlined"
                onClick={() => setTicketAction?.(CUSTOMIZE_COLUMN)}
                startIcon={<EditGreyIcon />}
                color="secondary"
              >
                Customize
              </Button>
            )}
          </PermissionsGuard>
          <PermissionsGuard permissions={[SEARCH_AND_FILTER]}>
            <Button
              className="small"
              variant="outlined"
              onClick={() => setTicketAction?.(FILTER_DATA)}
              startIcon={<FilterIcon />}
              color="secondary"
            >
              Filter
            </Button>
          </PermissionsGuard>
          <ButtonGroup size="small" aria-label="small button group">
            {[
              <PermissionsGuard key={1} permissions={[TICKETS_LIST_VIEW]}>
                <Button
                  className="small"
                  key={1}
                  onClick={renderTableView}
                  sx={{
                    backgroundColor:
                      router?.query?.viewType !== BOARD ? 'grey.0' : '',
                  }}
                  color="secondary"
                >
                  <ListIcon />
                </Button>
              </PermissionsGuard>,
              <PermissionsGuard key={2} permissions={[BOARD_VIEW]}>
                <Button
                  className="small"
                  key={2}
                  sx={{
                    backgroundColor:
                      router?.query?.viewType === BOARD ? 'grey.0' : '',
                  }}
                  onClick={renderBoardView}
                  color="secondary"
                >
                  <SubTabIcon />
                </Button>
              </PermissionsGuard>,
            ]}
          </ButtonGroup>
        </Box>
      </Box>
      {isPortalOpen?.isOpen &&
        ticketActionComponent?.[isPortalOpen?.action as string]}
    </>
  );
};
