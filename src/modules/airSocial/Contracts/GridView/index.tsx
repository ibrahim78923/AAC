import TanstackTable from '@/components/Table/TanstackTable';
import React, { useState } from 'react';
import {
  contractsColumns,
  contractsData,
  viewActivityData,
} from './GridView.data';
import CommonDrawer from '@/components/CommonDrawer';
import { Box, Typography, useTheme } from '@mui/material';
import { CustomTooltip } from '@/components/CustomTooltip';
import { SentIcon, SignedIcon, ViewedIcon } from '@/assets/icons';
import { CONTRACTS_STATUS } from '@/constants';
import { v4 as uuidv4 } from 'uuid';
import DefaultUserIcon from '@/assets/icons/shared/default-user';

const ContractsGrid = () => {
  const theme = useTheme();

  const [isViewAllActivityDrawerOpen, setIsViewAllActivityDrawerOpen] =
    useState(false);

  return (
    <div>
      <TanstackTable
        columns={contractsColumns({ setIsViewAllActivityDrawerOpen })}
        data={contractsData}
      />

      <CommonDrawer
        footer
        isDrawerOpen={isViewAllActivityDrawerOpen}
        onClose={() => setIsViewAllActivityDrawerOpen(false)}
        title="Signees"
        okText="Send Reminder"
        cancelText="cancel"
        isOk
      >
        <Box>
          {viewActivityData?.map((item: any) => (
            <Box key={item.id}>
              <Typography sx={{ fontSize: '14px', fontWeight: '600', mb: 2 }}>
                {item?.category}
              </Typography>

              {item?.activity?.map((ele: any) => (
                <Box
                  display="flex"
                  alignItems="flex-start"
                  gap="10px"
                  key={uuidv4()}
                >
                  <Box sx={{ display: 'flex', gap: '5px' }}>
                    {ele?.statuses?.map((status: string) => (
                      <Box key={uuidv4()}>
                        {status?.includes(CONTRACTS_STATUS?.SIGNED) && (
                          <CustomTooltip title="Signed">
                            <Box>
                              <SignedIcon />
                            </Box>
                          </CustomTooltip>
                        )}
                        {status?.includes(CONTRACTS_STATUS?.REJECTED) && (
                          <CustomTooltip title="Rejected">
                            <Box>
                              <SignedIcon color={theme?.palette?.error?.main} />
                            </Box>
                          </CustomTooltip>
                        )}
                        {status?.includes(CONTRACTS_STATUS?.VIEWED) && (
                          <CustomTooltip title="Viewed">
                            <Box>
                              <ViewedIcon />
                            </Box>
                          </CustomTooltip>
                        )}
                        {status?.includes(CONTRACTS_STATUS?.SENT) && (
                          <CustomTooltip title="Sent">
                            <Box>
                              <SentIcon />
                            </Box>
                          </CustomTooltip>
                        )}
                      </Box>
                    ))}
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ fontSize: '14px', fontWeight: '600' }}>
                      {ele?.company}
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <Box
                        sx={{
                          width: '35px',
                          height: '35px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                        }}
                      >
                        <DefaultUserIcon />
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ fontSize: '13.74px' }}
                        >
                          Ronald
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: '13.74px',
                            color: theme?.palette?.custom?.light,
                          }}
                        >
                          Admin
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </CommonDrawer>
    </div>
  );
};

export default ContractsGrid;
