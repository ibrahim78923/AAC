import React from 'react';
import { Typography, MenuItem, Box } from '@mui/material';
import DrawerComp from '../Drawer';
import { FilterIcon } from '@/assets/icons';
import { uuid } from 'uuidv4';
import { filterData } from '../Task.data';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { styles } from './Filter.style';

const Filter = () => {
  const methods = useForm({});

  return (
    <DrawerComp
      btnTitle="Filter"
      title="Filter"
      btnIcon={<FilterIcon />}
      key={'filter'}
      footer
    >
      <FormProvider methods={methods}>
        {filterData.map((obj) => (
          <Box key={uuid()} mb={'32px'}>
            <Typography
              sx={{
                color: '#4B5563',
                fontSize: '16px',
                fontWeight: 500,
                mb: '8px',
              }}
            >
              {obj.title}
            </Typography>
            <obj.component
              size={'small'}
              fullWidth
              {...styles}
              {...obj.componentProps}
            >
              {obj.componentProps.select
                ? obj.options?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                : null}
            </obj.component>
          </Box>
        ))}
      </FormProvider>
    </DrawerComp>
  );
};

export default Filter;
