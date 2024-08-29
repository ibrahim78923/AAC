import { DocumentIcon, FileJpgIcon } from '@/assets/icons';
import { IMG_URL } from '@/config';
import { DATE_FORMAT } from '@/constants';
import { Box, CircularProgress, Typography } from '@mui/material';
import dayjs from 'dayjs';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const groupDocumentsByDate = (data: any) => {
  const groupedDocuments: any = {};

  data?.forEach((document: any) => {
    const date = new Date(document?.updatedAt).toLocaleDateString();

    if (!groupedDocuments[date]) {
      groupedDocuments[date] = [];
    }

    if (document?.media?.length > 0) {
      groupedDocuments[date] = groupedDocuments[date]?.concat(document?.media);
    }
  });

  const result = Object?.keys(groupedDocuments)?.map((dateGroup) => ({
    dateGroup,
    documents: groupedDocuments[dateGroup],
  }));

  return result;
};

const DocumentAssets = ({ data, status, handelRefetch }: any) => {
  useEffect(() => {
    handelRefetch();
  }, []);

  const groupedDocuments = groupDocumentsByDate(data);
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
          {groupedDocuments?.length ? (
            groupedDocuments?.map((group: any) => (
              <Box key={uuidv4()}>
                <Typography variant="body3" sx={{ fontWeight: '600' }}>
                  {group?.dateGroup} {/* Display the date */}
                </Typography>
                {group?.documents?.map((document: any) => (
                  <Box
                    key={uuidv4()}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <FileJpgIcon />
                      <Box>
                        <Typography variant="body3" sx={{ fontWeight: '500' }}>
                          {document?.orignalName}
                        </Typography>
                        <Typography sx={{ fontSize: '10px' }}>
                          {dayjs(data?.createdAt).format(DATE_FORMAT?.UI)}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <Typography variant="body3" sx={{ fontWeight: '500' }}>
                        {(document?.size / 1024)?.toFixed(2)} KB
                      </Typography>
                      <Link
                        href={`${IMG_URL}${document?.url}`}
                        target={'_blank'}
                      >
                        <DocumentIcon />
                      </Link>
                    </Box>
                  </Box>
                ))}
              </Box>
            ))
          ) : (
            <>No records found</>
          )}
        </Box>
      )}

      {/* <Box>
      <Typography variant="body3" sx={{ fontWeight: '600' }}>
        June
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FileJpgIcon />
          <Box>
            <Typography variant="body3" sx={{ fontWeight: '500' }}>
              Technology concept
            </Typography>
            <Typography sx={{ fontSize: '10px' }}>14 April 2022</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Typography variant="body3" sx={{ fontWeight: '500' }}>
            1.3 MB
          </Typography>
          <DocumentIcon />
        </Box>
      </Box>
    </Box> */}
    </>
  );
};

export default DocumentAssets;
