import { AddTaskDrawer } from './AddTaskDrawer';
import { EditTaskDrawer } from './EditTaskDrawer';
import { DetailTaskDrawer } from './DetailTaskDrawer';

export const TaskDrawer = ({
  type,
  isDrawerOpen,
  onClose,
  taskDetail,
}: any) => {
  return (
    <>
      {type === 'add' ? (
        <AddTaskDrawer isDrawerOpen={isDrawerOpen} onClose={onClose} />
      ) : type === 'edit' ? (
        <EditTaskDrawer isDrawerOpen={isDrawerOpen} onClose={onClose} />
      ) : (
        <DetailTaskDrawer
          isDrawerOpen={isDrawerOpen}
          onClose={onClose}
          taskDetail={taskDetail}
        />
      )}
    </>
  );
};
