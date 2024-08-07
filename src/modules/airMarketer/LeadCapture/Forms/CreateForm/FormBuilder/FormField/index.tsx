import { Box } from '@mui/material';
import React, { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { styles } from './styles';
import { DeleteIcon, DragSharedIcon, EditGreyIcon } from '@/assets/icons';
import EditDialog from './EditDialog';
import { fieldTypes, ItemTypes } from '@/constants/form-builder';
import { Field } from '../interface';

interface FieldProps {
  id?: string;
  index: number;
  source: string;
  field: Field;
  onRemove: (id?: string) => void;
  onChange: (id: string, updatedField: Partial<Field>) => void;
  addOption?: (id: string) => void;
  moveField: (dragIndex: number, hoverIndex: number) => void;
}

const FormField: React.FC<FieldProps> = ({
  id,
  index,
  source,
  field,
  onRemove,
  onChange,
  addOption,
  moveField,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ItemTypes?.FIELD,
    hover: (item: any, monitor) => {
      if (!ref.current) return;
      if (item.source !== 'form') return;
      const dragIndex = item.index;
      const hoverIndex: number = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset: any = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveField(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    type: ItemTypes?.FIELD,
    item: { _id: id, index, source },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const [openEdit, setOpenEdit] = useState(false);
  const handleClickOpen = () => {
    setOpenEdit(true);
  };
  const handleClose = () => {
    setOpenEdit(false);
  };

  return (
    <Box sx={styles?.fieldWrapper} ref={ref}>
      <Box sx={styles?.field}>
        {field?.label &&
          field?.type !== fieldTypes?.button &&
          field?.type !== fieldTypes?.divider &&
          field?.type !== fieldTypes?.space && (
            <Box sx={styles?.fieldLabel}>
              <label htmlFor={field?.name}>{field?.label}</label>
            </Box>
          )}
        {field?.type === fieldTypes?.text && (
          <Box sx={styles?.fieldInput}>
            <input
              className="field-control"
              type={field?.subtype ? field?.subtype : 'text'}
              placeholder={field?.placeholder ?? ''}
            />
          </Box>
        )}
        {field?.type === fieldTypes?.textarea && (
          <Box sx={styles?.fieldInput}>
            <textarea
              className="field-control"
              placeholder={field?.placeholder ?? ''}
            />
          </Box>
        )}
        {field?.type === fieldTypes?.select && (
          <Box sx={styles?.fieldInput}>
            <select className="field-control">
              {field?.values?.map((option: any) => (
                <option
                  key={option?.value}
                  value={option?.value}
                  selected={option?.selected}
                >
                  {option?.label}
                </option>
              ))}
            </select>
          </Box>
        )}

        {field?.type === fieldTypes?.file && (
          <Box sx={styles?.fieldInput}>
            <input
              className="field-control"
              type="file"
              placeholder={field?.placeholder}
            />
          </Box>
        )}

        {field?.type === fieldTypes?.button && (
          <Box sx={styles?.fieldInput}>
            <button className="field-button" type={field?.buttonType}>
              {field?.buttonText}
            </button>
          </Box>
        )}

        {field?.type === fieldTypes?.space && (
          <Box>
            <Box
              sx={{
                fontSize: '16px',
                color: 'rgba(0,0,0,0.25)',
                textAlign: 'center',
                fontWeight: '700',
              }}
            >
              SPACE
            </Box>
          </Box>
        )}

        {field?.type === fieldTypes?.divider && (
          <Box
            component="hr"
            sx={{
              border: 'none',
              borderTop: `1px solid ${field?.dividerColor}`,
              borderWidth: `${field?.dividerWidth}px`,
            }}
          />
        )}

        <Box className="field-actions" sx={styles?.fieldActions}>
          <Box className="field-tool" onClick={handleClickOpen}>
            <EditGreyIcon />
          </Box>
          <Box className="field-tool" onClick={() => onRemove(field?._id)}>
            <DeleteIcon />
          </Box>
        </Box>
        <Box className="drag-icon" sx={styles?.dragIcon}>
          <DragSharedIcon />
        </Box>
      </Box>

      <EditDialog
        open={openEdit}
        onClose={handleClose}
        field={field}
        onChange={onChange}
        addOption={addOption}
      />
    </Box>
  );
};

export default FormField;
