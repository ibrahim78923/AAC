import React from 'react';

import { Box, CircularProgress, Typography } from '@mui/material';

import { v4 as uuidv4 } from 'uuid';

import { LinkBoldIcon } from '@/assets/icons';

const LinksAssets = ({ data, status }: any) => {
  return (
    <>
      {status === 'pending' ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        </>
      ) : (
        <Box>
          {/* <Typography variant="body3" sx={{ fontWeight: '600' }}>
            June
          </Typography> */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {data?.length ? (
              data?.map((item: any) => (
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                  key={uuidv4()}
                >
                  <LinkBoldIcon />
                  <Box>
                    <a href={item?.content}>
                      <Typography variant="body3" sx={{ fontWeight: '500' }}>
                        {item?.content}
                      </Typography>
                    </a>
                  </Box>
                </Box>
              ))
            ) : (
              <>No records found</>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default LinksAssets;
