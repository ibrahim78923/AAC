import { AddTaskDrawer } from './AddTaskDrawer';
import { EditTaskDrawer } from './EditTaskDrawer';
import { DetailTaskDrawer } from './DetailTaskDrawer';

export const TaskDrawer = ({
  type,
  isDrawerOpen,
  onClose,
  taskDetail,
}: any) => {
  const typeAdd = 'add';
  const typeEdit = 'edit';
  return (
    <>
      {type === typeAdd ? (
        <AddTaskDrawer isDrawerOpen={isDrawerOpen} onClose={onClose} />
      ) : type === typeEdit ? (
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
