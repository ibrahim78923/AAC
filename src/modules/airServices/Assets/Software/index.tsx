import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { data, columns, dataArray } from './Software.data';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { FilterSharedIcon } from '@/assets/icons';
import { useTheme } from '@emotion/react';
import { PageTitledHeader } from '../../../../components/PageTitledHeader/index';
import useManage from '@/modules/airSales/Dashboard/Manage/useManage';
import SoftwareFilter from './SoftwareFilter';
import SoftwareAssignCategory from './SoftwareAssignCategory';
import { AddSoftwareDrawer } from './AddSoftwareDrawer';
import { useRouter } from 'next/router';

function Software() {
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState<boolean>(false);
  const [softwareData, setSoftwareData] = useState([]);
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [assignCategory, setAssignCategory] = useState(false);
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
            label="search"
            width="100%"
            searchBy={searchValue}
            setSearchBy={SetSearchValue}
          />
        </Box>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1.5}>
          <Button
            color="secondary"
            variant="outlined"
            disabled={!!!softwareData.length}
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
        title={'Assign Category'}
        dataArray={dataArray}
        cancelText={'Cancel'}
        okText={'Assign'}
        successMessage={'Assign Successfully'}
        setData={setAssignCategory}
      />

      <AddSoftwareDrawer
        isDrawerOpen={isAddDrawerOpen}
        onClose={setIsAddDrawerOpen}
      />
      {assignCategory && null}
    </>
  );
}

export default Software;
