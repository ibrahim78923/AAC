import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Popover,
  Typography,
} from '@mui/material';
import { FilterSharedIcon } from '@/assets/icons';
import useFilters from './useFilters';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { pxToRem } from '@/utils/getFontValue';
import { FormProvider, RHFRadioGroup } from '@/components/ReactHookForm';

export const Filters = ({ setFilter, methods, setFilterByTypeState }: any) => {
  const {
    id,
    handleClick,
    open,
    anchorEl,
    handleClose,
    handleSubmit,
    onSubmitModuleTypeFiler,
    reset,
  } = useFilters({
    methods,
    setFilterByTypeState,
  });

  return (
    <>
      <Button
        variant={'outlined'}
        color={'inherit'}
        aria-describedby={id}
        onClick={handleClick}
        startIcon={<FilterSharedIcon />}
        className={'small'}
      >
        Filters
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box width={250}>
          <Accordion
            sx={{
              '& .MuiAccordionSummary-root': {
                color: 'custom.mulled_wine',
                fontSize: pxToRem(14),
                fontWeight: 500,
                backgroundColor: 'transparent',
              },
              '& .MuiAccordionSummary-content': {
                alignItems: 'center',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              sx={{ flexDirection: 'row-reverse', pl: 1 }}
            >
              Filter by type
            </AccordionSummary>
            <AccordionDetails sx={{ pl: 3, pt: 0 }}>
              <FormProvider
                methods={methods}
                onSubmit={handleSubmit(onSubmitModuleTypeFiler)}
              >
                <RHFRadioGroup
                  name={'filterModuleType'}
                  options={[
                    { label: 'All', value: 'ALL' },
                    { label: 'Tasks', value: 'TASKS' },
                    { label: 'Tickets', value: 'TICKETS' },
                  ]}
                  row={false}
                />

                <Box display={'flex'} justifyContent={'flex-end'} gap={1}>
                  <Button
                    variant={'outlined'}
                    className={'small'}
                    color={'inherit'}
                    disableElevation
                    onClick={() => {
                      reset();
                      setFilterByTypeState('ALL');
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    variant={'contained'}
                    className={'small'}
                    type={'submit'}
                    disableElevation
                  >
                    Apply
                  </Button>
                </Box>
              </FormProvider>
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{
              '& .MuiAccordionSummary-root': {
                color: 'custom.mulled_wine',
                fontSize: pxToRem(14),
                fontWeight: 500,
                backgroundColor: 'transparent',
              },
              '& .MuiAccordionSummary-content': {
                alignItems: 'center',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              sx={{ flexDirection: 'row-reverse', pl: 1 }}
            >
              Workload Count
            </AccordionSummary>
            <AccordionDetails sx={{ pl: 3, pt: 0 }}>
              <Typography
                variant={'body2'}
                color={'secondary.main'}
                fontWeight={500}
                sx={{ cursor: 'pointer' }}
                onClick={() =>
                  setFilter({
                    countDayWise: undefined,
                    countDayWiseHours: undefined,
                    countDayWiseHoursAverage: undefined,
                  })
                }
              >
                None
              </Typography>
              <Typography
                variant={'body2'}
                color={'secondary.main'}
                fontWeight={500}
                my={2}
                sx={{ cursor: 'pointer' }}
                onClick={() =>
                  setFilter({
                    countDayWise: true,
                    countDayWiseHours: undefined,
                    countDayWiseHoursAverage: undefined,
                  })
                }
              >
                Workload count
              </Typography>
              <Typography
                variant={'body2'}
                color={'secondary.main'}
                fontWeight={500}
                sx={{ cursor: 'pointer' }}
                onClick={() =>
                  setFilter({
                    countDayWise: undefined,
                    countDayWiseHours: true,
                    countDayWiseHoursAverage: undefined,
                  })
                }
              >
                Workload hours
              </Typography>
              <Typography
                variant={'body2'}
                color={'secondary.main'}
                fontWeight={500}
                mt={2}
                sx={{ cursor: 'pointer' }}
                onClick={() =>
                  setFilter({
                    countDayWise: undefined,
                    countDayWiseHours: undefined,
                    countDayWiseHoursAverage: true,
                  })
                }
              >
                Workload hours as %
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Popover>
    </>
  );
};
