import CommonDrawer from '@/components/CommonDrawer';
import { AddAssociateAssetDrawerPropsI } from './AddAssociationsDrawer.interface';
import TanstackTable from '@/components/Table/TanstackTable';
import {
  drawerTableColumns,
  drawerTableData,
} from './AddAssociationsDrawer.data';
import { useAssociationsDrawer } from './useAssociationsDrawer';
import { Grid } from '@mui/material';
import Search from '@/components/Search';

export const AddAssociationsDrawer = ({
  open,
  setDrawerOpen,
}: AddAssociateAssetDrawerPropsI) => {
  const { drawerData, setDrawerData, theme } = useAssociationsDrawer();

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={open}
        onClose={() => setDrawerOpen(false)}
        title="Add associations"
        submitHandler={() => {}}
        isOk={true}
        footer={true}
        okText="Associate"
      >
        <Grid container>
          <Grid item xs={12}>
            <Search
              label="Search"
              width="100%"
              searchBy=""
              setSearchBy={() => {}}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12} mt={'16px'}>
            <TanstackTable
              columns={drawerTableColumns(
                drawerData,
                setDrawerData,
                drawerTableData,
                theme,
              )}
              data={drawerTableData}
            />
          </Grid>
        </Grid>
      </CommonDrawer>
    </div>
  );
};
