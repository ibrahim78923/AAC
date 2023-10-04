import Search from '@/components/Search';
import { Box, Button, ButtonGroup, useTheme } from '@mui/material';
import { useTicketsListsSubHeader } from './useTicketsListSubHeader';
import { AddIcCallOutlined } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
// import { currencies } from './TicketsListSubHeader.data';
import { useRouter } from 'next/router';
// import { uuid } from 'uuidv4';
// import { v4 as uuidv4 } from 'uuid';

export const TicketsListSubHeader = (props: any) => {
  const { onCustomizeClick, onFilterClick, onActionClick } = props;
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
          <Button onClick={() => {}} variant="outlined" size="small">
            <AddIcCallOutlined fontSize="small" />
          </Button>
          {router.query.viewType !== 'board' && (
            <Button
              variant="outlined"
              onClick={() => onActionClick?.()}
              size="large"
              startIcon={<DownloadIcon />}
            >
              Action
            </Button>
          )}
          {router.query.viewType !== 'board' && (
            <Button
              variant="outlined"
              onClick={() => onCustomizeClick?.()}
              size="large"
              startIcon={<DownloadIcon />}
            >
              Customize
            </Button>
          )}
          <Button
            variant="outlined"
            onClick={() => onFilterClick?.()}
            size="large"
            startIcon={<DownloadIcon />}
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
                <DeleteIcon />
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
                <DeleteIcon />
              </Button>,
            ]}
          </ButtonGroup>
        </Box>
      </Box>
    </>
  );
};
