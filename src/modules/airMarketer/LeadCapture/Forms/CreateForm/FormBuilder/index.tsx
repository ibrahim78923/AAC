import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import FormField from './FormField';
import FormControls from './FormControls';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { styles } from './styles';
import { isNullOrEmpty } from '@/utils';
import { MobileFormIcon, MonitorIcon } from '@/assets/icons';
import { Field } from './interface';
import { fieldTypes, formMode, ItemTypes } from '@/constants/form-builder';

const FormBuilder = ({ fields, setFields, mode }: any) => {
  const theme = useTheme();
  const [desktopView, setDesktopView] = useState(true);

  const handleDrop = (item: any) => {
    if (!item?.type) return;

    const newField: Field = {
      _id: uuidv4(),
      type: item?.type,
      name: `field-${fields?.length + 1}`,
      label: `Label ${item?.type}`,
      values:
        item?.type === fieldTypes?.select
          ? [
              { label: 'Option 1', value: 'option-1', selected: false },
              { label: 'Option 2', value: 'option-2', selected: false },
            ]
          : undefined,
      required: false,
      space: item?.type === fieldTypes?.space ? 20 : undefined,
      dividerWidth: item?.type === fieldTypes?.divider ? 1 : undefined,
      dividerColor:
        item?.type === fieldTypes?.divider
          ? theme?.palette?.custom?.light_lavender_gray
          : undefined,
      buttonType: item?.type === fieldTypes?.button ? 'submit' : undefined,
      buttonText: item?.type === fieldTypes?.button ? 'Submit' : undefined,
    };
    setFields([...fields, newField]);
  };

  const [, drop] = useDrop({
    accept: ItemTypes.FIELD,
    drop: (item: any, monitor) => {
      const didDropInside = monitor.didDrop();
      if (!didDropInside && item.source === 'control') {
        handleDrop(item);
      }
    },
  });

  const moveField = (dragIndex: number, hoverIndex: number) => {
    const draggedField = fields[dragIndex];
    const updatedFields = [...fields];
    updatedFields.splice(dragIndex, 1);
    updatedFields.splice(hoverIndex, 0, draggedField);
    setFields(updatedFields);
  };

  const handleRemove = (id?: string) => {
    setFields(fields.filter((field: any) => field?._id !== id));
  };

  const handleFieldChange = (
    id: string,
    updatedField: Partial<Field>,
    deleteOption?: string,
  ) => {
    setFields((prevFields: Field[]) =>
      prevFields.map((field: Field) => {
        if (field?._id === id) {
          if (deleteOption) {
            return {
              ...field,
              values: field?.values?.filter(
                (opt) => opt.value !== deleteOption,
              ),
            };
          } else {
            return { ...field, ...updatedField };
          }
        }
        return field;
      }),
    );
  };

  const addOption = (id: string) => {
    setFields((prevFields: Field[]) =>
      prevFields.map((field: any) => {
        if (field._id === id) {
          return {
            ...field,
            values: [
              ...field?.values,
              {
                label: `Option ${field?.values?.length + 1}`,
                value: `option-${field?.values?.length + 1}`,
                selected: false,
              },
            ],
          };
        }
        return field;
      }),
    );
  };

  return (
    <Box sx={styles?.wrapper}>
      <Box sx={styles?.content}>
        <Box sx={styles?.contentPaper}>
          <Box sx={styles?.viewSwitcher}>
            <Button
              startIcon={<MobileFormIcon />}
              sx={styles?.viewButtonMobile(theme, desktopView)}
              onClick={() => setDesktopView(false)}
            >
              Mobile
            </Button>
            <Button
              startIcon={<MonitorIcon />}
              sx={styles?.viewButtonDesktop(theme, desktopView)}
              onClick={() => setDesktopView(true)}
            >
              Desktop
            </Button>
          </Box>
          <Box ref={drop} sx={styles?.dropZone}>
            {isNullOrEmpty(fields) && (
              <Typography variant="body2" sx={{ textAlign: 'center' }}>
                Please Create your Form from side bar menu selection.
              </Typography>
            )}
            {fields.map((field: Field, index: number) => {
              return (
                <FormField
                  id={field?._id}
                  key={field?._id}
                  index={index}
                  field={field}
                  onRemove={handleRemove}
                  onChange={handleFieldChange}
                  addOption={addOption}
                  moveField={moveField}
                  source="form"
                />
              );
            })}
          </Box>
        </Box>
      </Box>
      {mode === formMode?.edit && (
        <Box sx={styles?.sideBar}>
          <FormControls />
        </Box>
      )}
    </Box>
  );
};

export default FormBuilder;
