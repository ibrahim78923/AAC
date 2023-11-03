import { useFormContext, Controller } from 'react-hook-form';
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon, DragIcon } from '@/assets/icons';
import { Draggable, Droppable } from 'react-beautiful-dnd';
export default function RHFMultiCheckboxDraggable({
  name,
  options,
  ...other
}: any) {
  const { control } = useFormContext();

  return (
    <Droppable droppableId="source">
      {(provided: any) => (
        <div
          ref={provided?.innerRef}
          {...provided?.droppableProps}
          style={{ marginRight: '20px' }}
        >
          <Controller
            name={name}
            control={control}
            render={({ field }) => {
              const onSelected = (option: any) =>
                field?.value?.includes(option)
                  ? field?.value?.filter((value: any) => value !== option)
                  : [...field?.value, option];

              return (
                <FormGroup>
                  {options.map((option: any, index: any) => (
                    <Draggable key={option} draggableId={option} index={index}>
                      {(provided: any) => (
                        <div
                          ref={provided?.innerRef}
                          {...provided?.draggableProps}
                          {...provided?.dragHandleProps}
                          style={{
                            userSelect: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            ...provided?.draggableProps?.style,
                          }}
                        >
                          <DragIcon />
                          <FormControlLabel
                            key={option}
                            control={
                              <Checkbox
                                checked={field?.value?.includes(option)}
                                onChange={() =>
                                  field?.onChange(onSelected(option))
                                }
                                icon={<CheckboxIcon />}
                                checkedIcon={<CheckboxCheckedIcon />}
                                color="primary"
                              />
                            }
                            label={option}
                            {...other}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </FormGroup>
              );
            }}
          />
          {provided?.placeholder}
        </div>
      )}
    </Droppable>
  );
}
