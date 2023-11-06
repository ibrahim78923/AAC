import { useRouter } from 'next/router';
import Link from 'next/link';

import { Box, Button, SvgIcon, Typography, useTheme } from '@mui/material';

import Search from '@/components/Search';
import { SUPER_ADMIN } from '@/constants';

import CreatedTable from './CreatedTable';
import ContactsCustomize from './CreatedCustomize';
import CreatedActions from './CreatedActions';
import useImportRecordCreated from './useImportRecordCreated';
import CreatedFilterDrawer from './CreatedFilterDrawer';

import {
  BackArrIcon,
  CutomizeIcon,
  FilterIcon,
  RestoreIcon,
} from '@/assets/icons';

const ImportRecordCreated = () => {
  const theme = useTheme();
  const route = useRouter();
  const {
    handleActions,
    isCustomize,
    handleCustomizeDrawer,
    IsFilter,
    handleFilterDrawer,
  } = useImportRecordCreated();

  return (
    <>
      <Typography variant="h4" gap={1} display="flex" alignItems="center">
        <SvgIcon
          cursor="pointer"
          onClick={() => {
            route.push(SUPER_ADMIN.AIRSALES_IMPORTHISTORY);
          }}
        >
          <BackArrIcon />
        </SvgIcon>
        Import : Record Created (Contact.csv)
      </Typography>
      <Box
        display="flex"
        my="15px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Search
          label={'Search Here'}
          width={250}
          searchBy={''}
          setSearchBy={() => {}}
        />
        <Box display="flex" justifyContent="end" alignItems="center" gap={1}>
          <CreatedActions
            menuItem={['Re-assign', 'Delete']}
            disableActionBtn={false}
            onChange={handleActions}
          />
          <Link href={SUPER_ADMIN.IMPORTRECORD_RESTORE}>
            <Button
              variant="outlined"
              sx={{ height: '30px', color: theme.palette.custom['main'] }}
              startIcon={<RestoreIcon />}
            >
              Restore
            </Button>
          </Link>
          <Button
            onClick={handleCustomizeDrawer}
            variant="outlined"
            sx={{ height: '30px', color: theme.palette.custom['main'] }}
          >
            <CutomizeIcon /> &nbsp; Customize
          </Button>

          <Button
            variant="outlined"
            sx={{ height: '30px', color: theme.palette.custom['main'] }}
            onClick={handleFilterDrawer}
          >
            <FilterIcon />
            &nbsp; Filter
          </Button>
          <Button
            variant="outlined"
            sx={{ height: '30px', color: theme.palette.custom['main'] }}
          >
            <FilterIcon />
            &nbsp; Export
          </Button>
        </Box>
      </Box>
      <ContactsCustomize open={isCustomize} onClose={handleCustomizeDrawer} />
      <CreatedFilterDrawer open={IsFilter} onClose={handleFilterDrawer} />
      <CreatedTable />
    </>
  );
};

export default ImportRecordCreated;
