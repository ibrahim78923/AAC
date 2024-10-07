import { Box, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { DragDropContext } from 'react-beautiful-dnd';
import { useAddWidgets } from './useAddWidgets';

const RHFMultiCheckboxDraggable = dynamic(
  () => import('@/components/ReactHookForm/RHFMultiCheckboxDraggable'),
  { ssr: false },
);

export const AddWidgets = (props: any) => {
  const { dashboardWidgetsWatch } = props;
  const { onDragEnd } = useAddWidgets(props);
  return (
    <>
      <Typography
        variant="h6"
        mt={1}
        fontWeight={'fontWeightMedium'}
        color="slateBlue.main"
      >
        Use the checkboxes to remove/add any report you want
      </Typography>
      <Box>
        <DragDropContext onDragEnd={onDragEnd}>
          <RHFMultiCheckboxDraggable
            name="reports"
            options={dashboardWidgetsWatch}
          />
        </DragDropContext>
      </Box>
    </>
  );
};
