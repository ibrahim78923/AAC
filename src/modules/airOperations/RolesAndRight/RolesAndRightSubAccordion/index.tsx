import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { ROLES_ACCORDION_DETAILS } from '@/constants/strings';
import useRolesAndRight from '../useRolesAndRight';

const RolesAndRightSubAccordion = ({ sectionData }: any) => {
  const { theme, expandedRoleAccordion, handleChangeExpandAccordion } =
    useRolesAndRight();
  const specificItem = sectionData?.data?.find(
    (item: any) => item?.componentProps?.name === ROLES_ACCORDION_DETAILS?.ALL,
  );
  return (
    <>
      <Accordion
        expanded={expandedRoleAccordion}
        onChange={handleChangeExpandAccordion}
        disableGutters
        sx={{
          '&.MuiAccordion': {
            '&.Mui-expanded': {
              boxShadow: 'theme?.customShadows?.z8',
              borderRadius: '8px',
            },
            '&.Mui-disabled': {
              backgroundColor: 'transparent',
            },
          },
          '& .MuiAccordionSummary-root': {
            backgroundColor: 'transparent',
            color: `theme?.palette?.grey?.[600]`,
            borderRadius: '8px',
          },
          mt: 1,
        }}
      >
        <AccordionSummary
          sx={{
            bg: 'transparent',
            display: 'flex',
            justifyContent: 'space-Between',
          }}
        >
          <Typography variant="h6" color={theme?.palette?.grey?.[600]}>
            {expandedRoleAccordion ? (
              <ArrowForwardIosSharpIcon
                style={{ fontSize: '0.85rem', transform: 'rotate(90deg)' }}
              />
            ) : (
              <ArrowForwardIosSharpIcon
                style={{ fontSize: '0.85rem', transform: 'rotate(0deg)' }}
              />
            )}
            <span style={{ marginRight: '0.8rem' }}></span>
            {sectionData?.title} Details
          </Typography>
          {specificItem && expandedRoleAccordion && (
            <span style={{ marginLeft: 'auto', marginTop: '-5px' }}>
              <specificItem.component {...specificItem?.componentProps} />
            </span>
          )}
        </AccordionSummary>

        <AccordionDetails>
          <Grid container>
            {sectionData?.data
              ?.filter(
                (item: any) =>
                  item?.componentProps?.name !== ROLES_ACCORDION_DETAILS?.ALL,
              )
              ?.map((item: any) => (
                <React.Fragment key={uuidv4()}>
                  <Grid item xs={12}>
                    <item.component {...item?.componentProps} />
                  </Grid>
                </React.Fragment>
              ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default RolesAndRightSubAccordion;
