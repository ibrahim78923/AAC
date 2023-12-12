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
import useRoleAndRight from '@/modules/airSales/SettingSales/TabsData/RolesAndRight/useRoleAndRight';
import { ROLES_ACCORDION_DETAILS } from '@/constants/strings';

const RolesAndRightSubAccordion = ({ sectionData }: any) => {
  const { theme, expandedRoleAccordion, handleChangeExpandAccordion } =
    useRoleAndRight();
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
          sx={{ bg: 'transparent', display: 'flex', alignItems: 'center' }}
        >
          <Typography variant="h6" color={theme?.palette?.grey?.[600]}>
            {expandedRoleAccordion ? (
              <ArrowForwardIosSharpIcon
                style={{ fontSize: '1rem', transform: 'rotate(90deg)' }}
              />
            ) : (
              <ArrowForwardIosSharpIcon style={{ fontSize: '1rem' }} />
            )}
            <span style={{ marginRight: '8px' }}></span>
            {sectionData?.title} Details
          </Typography>
        </AccordionSummary>

        {specificItem && (
          <Grid item xs={12}>
            <specificItem.component {...specificItem?.componentProps} />
          </Grid>
        )}

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
