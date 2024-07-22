import { Box, Typography, useTheme } from '@mui/material';
import BlurOnRoundedIcon from '@mui/icons-material/BlurOnRounded';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { StrictModeDroppable as Droppable } from '@/components/DynamicFormModals/StrictModeDroppable';
import { Draggable } from 'react-beautiful-dnd';
import { DYNAMIC_FORM_IDS, dynamicFormFieldsList } from '@/utils/dynamic-forms';

export default function DraggableFields({
  dynamicFormFields = dynamicFormFieldsList,
}: any) {
  const theme: any = useTheme();

  return (
    <Droppable droppableId={DYNAMIC_FORM_IDS?.DRAGGABLE_ID}>
      {(provided) => (
        <Box
          borderRadius={2}
          ref={provided?.innerRef}
          {...provided?.droppableProps}
        >
          <Typography variant={'h5'} mb={2}>
            Drag & Drop Field
          </Typography>

          {dynamicFormFields?.map((item: any, index: number) => (
            <Draggable key={item?.id} draggableId={item?.id} index={index}>
              {(provided) => (
                <Box
                  border={`1px solid ${theme?.palette?.grey?.[0]}`}
                  bgcolor={'common.white'}
                  borderRadius={2}
                  mb={index === dynamicFormFields?.length - 1 ? 0 : 2}
                  p={1}
                  display={'flex'}
                  overflow={'auto'}
                  alignItems={'center'}
                  ref={provided?.innerRef}
                  {...provided?.draggableProps}
                  {...provided?.dragHandleProps}
                  sx={{
                    '&:hover': {
                      boxShadow: 5,
                    },
                  }}
                >
                  <BlurOnRoundedIcon sx={{ color: 'grey.900' }} />
                  <HorizontalRuleIcon
                    fontSize={'large'}
                    sx={{ transform: 'rotate(90deg)', color: 'grey.900' }}
                  />
                  <Box
                    bgcolor={'grey.700'}
                    display={'flex'}
                    alignItems={'center'}
                    mr={1}
                    p={0.5}
                    borderRadius={1}
                  >
                    {item?.icon}
                  </Box>
                  <Box>
                    <Typography variant={'body1'} color={'custom.main'}>
                      {item?.title}
                    </Typography>
                    <Typography variant={'body2'} color={'grey.0'}>
                      {item?.description}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Draggable>
          ))}
          {provided?.placeholder}
        </Box>
      )}
    </Droppable>
  );
}
