import Search from '@/components/Search';
import { Box, Button, ButtonGroup } from '@mui/material';
import { CutomizeIcon, FilterIcon, ListIcon, SubTabIcon } from '@/assets/icons';
import AutoRenewIcon from '@mui/icons-material/Autorenew';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { VIEW_TYPES } from '@/constants/strings';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import {
  AIR_SERVICES_TICKETS_TICKETS_DETAILS,
  AIR_SERVICES_TICKETS_TICKET_LISTS,
} from '@/constants/permission-keys';
import { useTicketsListHeader } from './useTicketsListHeader';
import { TICKETS_ACTION_CONSTANTS } from './TicketListHeader.data';

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
        <PermissionsGuard
          permissions={[AIR_SERVICES_TICKETS_TICKET_LISTS?.SEARCH_AND_FILTER]}
        >
          <Search label="Search Here" setSearchBy={handleSetSearch} />
        </PermissionsGuard>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
          gap={'.5rem'}
        >
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_TICKETS_TICKET_LISTS?.ACTIONS,
              AIR_SERVICES_TICKETS_TICKETS_DETAILS?.UPDATE_INFO_EDIT_TICKET_DETAILS,
            ]}
          >
            {router?.query?.viewType !== VIEW_TYPES?.BOARD && (
              <SingleDropdownButton
                dropdownOptions={ticketsActionDropdown}
                disabled={!!!selectedTicketLists?.length}
              />
            )}
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_SERVICES_TICKETS_TICKET_LISTS?.RESET]}
          >
            {router?.query?.viewType !== VIEW_TYPES?.BOARD && (
              <Button
                className="small"
                variant="outlined"
                onClick={setInitialColumns}
                size="large"
                color="secondary"
              >
                <AutoRenewIcon />
              </Button>
            )}
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_TICKETS_TICKET_LISTS?.COLUMN_CUSTOMIZATION,
            ]}
          >
            {router?.query?.viewType !== VIEW_TYPES?.BOARD && (
              <Button
                className="small"
                variant="outlined"
                onClick={() =>
                  setTicketAction?.(TICKETS_ACTION_CONSTANTS?.CUSTOMIZE_COLUMN)
                }
                size="large"
                startIcon={<CutomizeIcon />}
                color="secondary"
              >
                Customize
              </Button>
            )}
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_SERVICES_TICKETS_TICKET_LISTS?.SEARCH_AND_FILTER]}
          >
            <Button
              className="small"
              variant="outlined"
              onClick={() =>
                setTicketAction?.(TICKETS_ACTION_CONSTANTS?.FILTER_DATA)
              }
              size="large"
              startIcon={<FilterIcon />}
              color="secondary"
            >
              Filter
            </Button>
          </PermissionsGuard>
          <ButtonGroup size="small" aria-label="small button group">
            {[
              <PermissionsGuard
                key={1}
                permissions={[
                  AIR_SERVICES_TICKETS_TICKET_LISTS?.TICKETS_LIST_VIEW,
                ]}
              >
                <Button
                  className="small"
                  key={1}
                  onClick={renderTableView}
                  sx={{
                    backgroundColor:
                      router?.query?.viewType !== VIEW_TYPES?.BOARD
                        ? 'grey.0'
                        : '',
                  }}
                  color="secondary"
                >
                  <ListIcon />
                </Button>
              </PermissionsGuard>,
              <PermissionsGuard
                key={2}
                permissions={[AIR_SERVICES_TICKETS_TICKET_LISTS?.BOARD_VIEW]}
              >
                <Button
                  className="small"
                  key={2}
                  sx={{
                    backgroundColor:
                      router?.query?.viewType === VIEW_TYPES?.BOARD
                        ? 'grey.0'
                        : '',
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
