import { AddTaskDrawer } from './AddTaskDrawer';
import { EditTaskDrawer } from './EditTaskDrawer';
import { DetailTaskDrawer } from './DetailTaskDrawer';

export const TaskDrawer = ({
  type,
  isDrawerOpen,
  onClose,
  taskDetail,
}: any) => {
  const TYPE_ADD = 'add';
  const TYPE_EDIT = 'edit';
  return (
    <>
      {type === TYPE_ADD ? (
        <AddTaskDrawer isDrawerOpen={isDrawerOpen} onClose={onClose} />
      ) : type === TYPE_EDIT ? (
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
