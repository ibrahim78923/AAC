import Search from '@/components/Search';
import { EditColumnIcon } from '@/assets/icons/';
import { v4 as uuidv4 } from 'uuid';
import DrawerComp from '../Drawer';
import { drawerTasksData } from '../Task.data';
import { ColumnsWrapper } from './ColumnWrapper';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_TASK_MANAGE_TASK_PERMISSIONS } from '@/constants/permission-keys';

const EditColumn = () => {
  return (
    <DrawerComp
      btnTitle="Edit Columns"
      btnIcon={<EditColumnIcon />}
      title="Edit Columns"
      key={'editColumns'}
    >
      <Search size={'medium'} fullWidth label={'Search'} />
      <PermissionsGuard
        permissions={[AIR_SALES_TASK_MANAGE_TASK_PERMISSIONS?.EDIT_COLUMNS]}
      >
        {drawerTasksData.map((column: any) => (
          <ColumnsWrapper key={uuidv4()} title={column?.title} />
        ))}
      </PermissionsGuard>
    </DrawerComp>
  );
};

export default EditColumn;
