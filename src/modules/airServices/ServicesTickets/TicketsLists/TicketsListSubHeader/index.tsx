import Search from '@/components/Search';
import { Box, Button, ButtonGroup, Stack, useTheme } from '@mui/material';
// import { useTicketsListsSubHeader } from './useTicketsListSubHeader';
import { useRouter } from 'next/router';
import { FilterIcon, ListIcon, ResetIcon, SubTabIcon } from '@/assets/icons';
import CustomizeIcon from '@/assets/icons/shared/customize-icon';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';

export const TicketsListSubHeader = (props: any) => {
  const {
    onCustomizeClick,
    onFilterClick,
    ticketsActionDropdown,
    search,
    setSearch,
  } = props;
  // const { search, setSearch } = useTicketsListsSubHeader();
  const theme: any = useTheme();
  const router = useRouter();

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
            <SingleDropdownButton dropdownOptions={ticketsActionDropdown} />
          )}
          <Button
            variant="outlined"
            onClick={() => {}}
            size="large"
            color="secondary"
          >
            <Stack>
              <ResetIcon />
            </Stack>
          </Button>
          {router?.query?.viewType !== 'board' && (
            <Button
              variant="outlined"
              onClick={() => onCustomizeClick?.()}
              size="large"
              startIcon={<CustomizeIcon />}
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
                  //TODO: destructing because do not require viewType in restqyesries
                  /* eslint-disable @typescript-eslint/no-unused-vars */
                  const { viewType, ...routerQueries } = router?.query;
                  router?.push({
                    pathname: router?.pathname,
                    query: {
                      ...routerQueries,
                    },
                  });
                }}
                style={{
                  backgroundColor:
                    router?.query?.viewType !== 'board'
                      ? theme?.palette?.grey['0']
                      : '',
                }}
                color="secondary"
              >
                <ListIcon />
              </Button>,
              <Button
                key={1}
                style={{
                  backgroundColor:
                    router?.query?.viewType === 'board'
                      ? theme?.palette?.grey['0']
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
