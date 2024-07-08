import { Avatar, Box, Typography } from '@mui/material';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { useOverview } from './useOverview';
import { isValidElement } from 'react';
import { DYNAMIC_FORM_FIELDS_TYPES } from '@/utils/dynamic-forms';
import { getImageByType } from '@/utils/avatarUtils';

export const Overview = () => {
  const { isLoading, overviewData, isFetching } = useOverview();

  if (isFetching || isLoading) return <SkeletonTable />;

  return (
    <Box bgcolor={'primary.lighter'} borderRadius={2}>
      {Object?.entries(overviewData)?.map(([key, value]: any) => (
        <Box key={key} display={'flex'}>
          <Typography
            variant={'body2'}
            fontWeight={500}
            p={2}
            color={'grey.600'}
            minWidth={'25%'}
          >
            {key}:
          </Typography>
          <Typography
            variant={'body2'}
            p={2}
            color={'grey.900'}
            fontWeight={500}
          >
            {isValidElement(value) ? (
              value
            ) : typeof value === DYNAMIC_FORM_FIELDS_TYPES?.OBJECT &&
              value !== null &&
              DYNAMIC_FORM_FIELDS_TYPES?.LABEL in value ? (
              value?.label
            ) : typeof value === DYNAMIC_FORM_FIELDS_TYPES?.OBJECT &&
              value !== null &&
              DYNAMIC_FORM_FIELDS_TYPES?.FILE_URL in value ? (
              <Avatar
                src={getImageByType(value?.fileType, value?.fileUrl)}
                alt="file-preview"
                sx={{ width: 45, height: 45 }}
                variant={'rounded'}
              />
            ) : (
              value?.toString()
            )}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
