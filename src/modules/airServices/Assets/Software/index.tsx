import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { data, columns } from './Software.data';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { FilterSharedIcon } from '@/assets/icons';
import { useTheme } from '@emotion/react';
import { PageTitledHeader } from '../../../../components/PageTitledHeader/index';
import useManage from '@/modules/airSales/Dashboard/Manage/useManage';
import SoftwareFilter from './SoftwareFilter';
import { UpsertSoftware } from './UpsertSoftware';
import { useRouter } from 'next/router';
import CustomPagination from '@/components/CustomPagination';
import { SoftwareAssignCategory } from './SoftwareAssignCategory';

function Software() {
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState<boolean>(false);
  const [softwareData, setSoftwareData] = useState([]);
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [searchValue, SetSearchValue] = useState<string>('');

  const theme: any = useTheme();
  const router = useRouter();
  const { setIsOpenFilterDrawer, isOpenFilterDrawer } = useManage();

  return (
    <>
      <PageTitledHeader
        title={'Software'}
        addTitle={'New Software'}
        handleAction={() => setIsAddDrawerOpen(true)}
      />
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1.5}
      >
        <Box>
          <Search
            label="Search Here"
            width="100%"
            searchBy={searchValue}
            setSearchBy={SetSearchValue}
          />
        </Box>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1.5}>
          <Button
            color="secondary"
            variant="outlined"
            disabled={!!!softwareData?.length}
            onClick={() => {
              setOpenAssignModal(true);
            }}
          >
            Assign Category
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            startIcon={<FilterSharedIcon />}
            onClick={() => setIsOpenFilterDrawer(true)}
          >
            Filter
          </Button>
        </Box>
      </Box>
      <br />
      <Box>
        <TanstackTable
          data={data}
          columns={columns(softwareData, setSoftwareData, data, theme, router)}
        />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </Box>

      {isOpenFilterDrawer && (
        <SoftwareFilter
          isOpenDrawer={isOpenFilterDrawer}
          onClose={() => setIsOpenFilterDrawer(false)}
        />
      )}

      <SoftwareAssignCategory
        openAssignModal={openAssignModal}
        setOpenAssignModal={setOpenAssignModal}
        selectedSoftware={softwareData}
      />
      <UpsertSoftware
        isDrawerOpen={isAddDrawerOpen}
        onClose={setIsAddDrawerOpen}
      />
    </>
  );
}

export default Software;
