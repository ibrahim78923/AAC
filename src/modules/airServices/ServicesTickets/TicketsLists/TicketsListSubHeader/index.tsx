import Search from '@/components/Search';
import { Box, Button, ButtonGroup, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { CutomizeIcon, FilterIcon, ListIcon, SubTabIcon } from '@/assets/icons';
import AutoRenewIcon from '@mui/icons-material/Autorenew';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { ticketsListInitialColumns } from '../TicketsLists.data';
import usePath from '@/hooks/usePath';

export const TicketsListSubHeader = (props: any) => {
  const {
    onCustomizeClick,
    onFilterClick,
    ticketsActionDropdown,
    search,
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
        <Search
          label="search"
          width="100%"
          searchBy={search}
          setSearchBy={setSearch}
          sx={{ minWidth: '260px' }}
        />
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
          gap={'.5rem'}
        >
          {router?.query?.viewType !== 'board' && (
            <SingleDropdownButton
              dropdownOptions={ticketsActionDropdown}
              disabled={disabledActionButton}
            />
          )}
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
          {router?.query?.viewType !== 'board' && (
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
          <Button
            variant="outlined"
            onClick={() => onFilterClick?.()}
            size="large"
            startIcon={<FilterIcon />}
            color="secondary"
          >
            Filter
          </Button>
          <ButtonGroup size="small" aria-label="small button group">
            {[
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
                    router?.query?.viewType !== 'board'
                      ? theme?.palette?.grey?.['0']
                      : '',
                }}
                color="secondary"
              >
                <ListIcon />
              </Button>,
              <Button
                key={2}
                sx={{
                  backgroundColor:
                    router?.query?.viewType === 'board'
                      ? theme?.palette?.grey?.['0']
                      : '',
                }}
                onClick={() => {
                  router?.push({
                    pathname: router?.pathname,
                    query: {
                      ...router?.query,
                      viewType: 'board',
                    },
                  });
                }}
                color="secondary"
              >
                <SubTabIcon />
              </Button>,
            ]}
          </ButtonGroup>
        </Box>
      </Box>
    </>
  );
};
