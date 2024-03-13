import Search from '@/components/Search';
import { Box, Button, ButtonGroup, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { CutomizeIcon, FilterIcon, ListIcon, SubTabIcon } from '@/assets/icons';
import AutoRenewIcon from '@mui/icons-material/Autorenew';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { ticketsListInitialColumns } from '../TicketsLists.data';
import usePath from '@/hooks/usePath';
import { VIEW_TYPES } from '@/constants/strings';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import {
  AIR_SERVICES_TICKETS_TICKETS_DETAILS,
  AIR_SERVICES_TICKETS_TICKET_LISTS,
} from '@/constants/permission-keys';

export const TicketsListSubHeader = (props: any) => {
  const {
    onCustomizeClick,
    onFilterClick,
    ticketsActionDropdown,
    setSearch,
    disabledActionButton,
    setTicketsListsActiveColumn,
  } = props;

  const theme: any = useTheme();
  const router = useRouter();
  const { makePath } = usePath();

  return (
    <>
      <Box
        display={'flex'}
        gap={'1rem'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
      >
        <PermissionsGuard
          permissions={[AIR_SERVICES_TICKETS_TICKET_LISTS?.SEARCH_AND_FILTER]}
        >
          <Search
            label="Search Here"
            width="100%"
            setSearchBy={setSearch}
            sx={{ minWidth: '260px' }}
          />
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
                disabled={disabledActionButton}
              />
            )}
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_SERVICES_TICKETS_TICKET_LISTS?.RESET]}
          >
            {router?.query?.viewType !== VIEW_TYPES?.BOARD && (
              <Button
                variant="outlined"
                onClick={() => {
                  setTicketsListsActiveColumn(ticketsListInitialColumns);
                }}
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
                variant="outlined"
                onClick={() => onCustomizeClick?.()}
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
              variant="outlined"
              onClick={() => onFilterClick?.()}
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
                  key={1}
                  onClick={() => {
                    router?.push(
                      makePath({
                        path: router?.pathname,
                        skipQueries: ['viewType'],
                      }),
                    );
                  }}
                  sx={{
                    backgroundColor:
                      router?.query?.viewType !== VIEW_TYPES?.BOARD
                        ? theme?.palette?.grey?.['0']
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
                  key={2}
                  sx={{
                    backgroundColor:
                      router?.query?.viewType === VIEW_TYPES?.BOARD
                        ? theme?.palette?.grey?.['0']
                        : '',
                  }}
                  onClick={() => {
                    router?.push({
                      pathname: router?.pathname,
                      query: {
                        ...router?.query,
                        viewType: VIEW_TYPES?.BOARD,
                      },
                    });
                  }}
                  color="secondary"
                >
                  <SubTabIcon />
                </Button>
              </PermissionsGuard>,
            ]}
          </ButtonGroup>
        </Box>
      </Box>
    </>
  );
};
