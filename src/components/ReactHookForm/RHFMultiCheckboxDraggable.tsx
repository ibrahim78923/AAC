import { useFormContext, Controller } from 'react-hook-form';
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon, DragIcon } from '@/assets/icons';
import { Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable } from '@/components/DynamicFormModals/StrictModeDroppable';

interface RHFMultiCheckboxOptionI {
  value: string;
  label: string;
}

interface RHFMultiCheckboxDraggablePropsI {
  name: string;
  options: RHFMultiCheckboxOptionI[];
  [key: string]: any;
}

export const RHFMultiCheckboxDraggable = (
  props: RHFMultiCheckboxDraggablePropsI,
) => {
  const { name, options, ...other } = props;

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
            render={({ field, fieldState: { error } }) => {
              const onSelected = (option: RHFMultiCheckboxOptionI) => {
                const selectedValues = field?.value || [];
                if (
                  selectedValues?.some((item: string) => item === option?.value)
                ) {
                  return selectedValues?.filter(
                    (value: string) => value !== option?.value,
                  );
                } else {
                  const index = options?.findIndex(
                    (item: any) => item?.value === option?.value,
                  );

                  const updatedSelectedValues = [...selectedValues];

                  if (index !== -1) {
                    const insertionIndex = options
                      ?.slice?.(0, index)
                      ?.map((item: any) => item?.value)
                      ?.filter((value: any) => selectedValues?.includes(value))
                      ?.length;

                    updatedSelectedValues?.splice?.(
                      insertionIndex,
                      0,
                      option?.value,
                    );
                  }

                  return updatedSelectedValues;
                }
              };

              return (
                <>
                  <FormGroup>
                    {options?.map(
                      (option: RHFMultiCheckboxOptionI, index: number) => (
                        <Draggable
                          key={option?.value}
                          draggableId={option?.value}
                          index={index}
                        >
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
                                control={
                                  <Checkbox
                                    checked={field?.value?.some(
                                      (item: any) => item === option?.value,
                                    )}
                                    onChange={() =>
                                      field?.onChange(onSelected(option))
                                    }
                                    icon={<CheckboxIcon />}
                                    checkedIcon={<CheckboxCheckedIcon />}
                                    color="primary"
                                  />
                                }
                                label={option?.label}
                                {...other}
                              />
                            </div>
                          )}
                        </Draggable>
                      ),
                    )}
                  </FormGroup>
                  {!!error && (
                    <FormHelperText
                      error
                      sx={{ display: 'block', mt: -0.5, ml: 0 }}
                    >
                      {error?.message}
                    </FormHelperText>
                  )}
                </>
              );
            }}
          />
          {provided?.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default RHFMultiCheckboxDraggable;
