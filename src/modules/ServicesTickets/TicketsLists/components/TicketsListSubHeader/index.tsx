import Search from '@/components/Search';
import { Box, Button, ButtonGroup, useTheme } from '@mui/material';
import { useTicketsListsSubHeader } from './useTicketsListSubHeader';
// import { currencies } from './TicketsListSubHeader.data';
import { useRouter } from 'next/router';
import { TicketsAction } from '../TicketsAction';
import { FilterIcon, ListIcon, ResetIcon, SubTabIcon } from '@/assets/icons';
import CustomizeIcon from '@/assets/icons/shared/customize-icon';
// import { uuid } from 'uuidv4';
// import { v4 as uuidv4 } from 'uuid';

export const TicketsListSubHeader = (props: any) => {
  const {
    onCustomizeClick,
    onFilterClick,
    // onActionClick,
    ticketsActionDropdown,
  } = props;
  const { search, setSearch } = useTicketsListsSubHeader();
  const theme = useTheme();
  const router = useRouter();
  // const selectedView = (viewType: any) => {
  //   if (viewType === 'board') return 'red';
  //   return 'green';
  // };

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
        />
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
          gap={'.5rem'}
        >
          {router.query.viewType !== 'board' && (
            // <Button
            //   variant="outlined"
            //   onClick={() => onActionClick?.()}
            //   size="large"
            //   startIcon={<DownloadIcon />}
            // >
            //   Action
            // </Button>
            <TicketsAction ticketsActionDropdown={ticketsActionDropdown} />
          )}
          {router.query.viewType !== 'board' && (
            <>
              <Button
                variant="outlined"
                onClick={() => onCustomizeClick?.()}
                size="large"
                startIcon={
                  <Box mt={0.5} width={5.4}>
                    <ResetIcon />
                  </Box>
                }
                sx={{ color: theme?.palette?.custom?.main || 'inherit' }}
              />
              {/* Customize
            </Button> */}
              <Button
                variant="outlined"
                onClick={() => onCustomizeClick?.()}
                size="large"
                startIcon={<CustomizeIcon />}
                sx={{ color: theme?.palette?.custom?.main || 'inherit' }}
              >
                Customize
              </Button>
            </>
          )}
          <Button
            variant="outlined"
            onClick={() => onFilterClick?.()}
            size="large"
            startIcon={<FilterIcon />}
            sx={{ color: theme?.palette?.custom?.main || 'inherit' }}
          >
            Filter
          </Button>
          <ButtonGroup size="small" aria-label="small button group">
            {[
              <Button
                key={1}
                onClick={() => {
                  /* eslint-disable @typescript-eslint/no-unused-vars */
                  const { viewType, ...routerQueries } = router.query;
                  router.push({
                    pathname: router.pathname,
                    query: {
                      ...routerQueries,
                    },
                  });
                }}
                style={{
                  backgroundColor:
                    router.query.viewType !== 'board'
                      ? theme?.palette?.primary?.light
                      : '',
                }}
              >
                <ListIcon />
              </Button>,
              <Button
                key={1}
                style={{
                  backgroundColor:
                    router.query.viewType === 'board'
                      ? theme?.palette?.primary?.light
                      : '',
                }}
                onClick={() => {
                  router.push({
                    pathname: router.pathname,
                    query: {
                      ...router.query,
                      viewType: 'board',
                    },
                  });
                }}
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
