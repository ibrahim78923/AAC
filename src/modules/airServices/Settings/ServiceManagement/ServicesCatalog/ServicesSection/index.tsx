import NoData from '@/components/NoData';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { generateImage, getInitialsSingleName } from '@/utils/avatarUtils';
import { pxToRem } from '@/utils/getFontValue';
import { Avatar, Box, Checkbox, Grid, Typography } from '@mui/material';
import { getServicesSectionDataArray } from './ServicesSection.data';
import ActionButton from './ActionButton';
import { AIR_SERVICES } from '@/constants/routes';
import { useRouter } from 'next/router';

const ServiceSection = (props: any) => {
  const {
    isLoading,
    isFetching,
    selectedCheckboxes,
    setSelectedCheckboxes,
    results,
    isAnyCheckboxSelected,
  } = props;

  const router = useRouter();
  return (
    <PermissionsGuard
      permissions={[
        AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.VIEW_DETAILS_OF_CATALOG_SERVICE,
      ]}
    >
      {isLoading || isFetching ? (
        <SkeletonForm />
      ) : (
        <Grid container spacing={2}>
          {!!results?.length ? (
            <>
              <Grid item xs={12}>
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                >
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    gap={1}
                    bgcolor={'grey.400'}
                    borderRadius={2}
                    width={300}
                  >
                    <Checkbox
                      checked={
                        selectedCheckboxes?.length !== 0 &&
                        results?.length === selectedCheckboxes?.length
                      }
                      onChange={(e: any) => {
                        e?.target?.checked
                          ? setSelectedCheckboxes(
                              results?.map((result: any) => result?._id),
                            )
                          : setSelectedCheckboxes([]);
                      }}
                      color={'primary'}
                      name={'_id'}
                    />

                    <Typography variant={'h6'}> Select All</Typography>
                  </Box>

                  <Box textAlign={'end'}>
                    {selectedCheckboxes && (
                      <ActionButton
                        selectedCheckboxes={selectedCheckboxes}
                        setSelectedCheckboxes={setSelectedCheckboxes}
                        isDisabled={!isAnyCheckboxSelected()}
                      />
                    )}
                  </Box>
                </Box>
              </Grid>
              {results?.map((result: any) => (
                <Grid item xs={12} md={6} lg={4} key={result?._id}>
                  <Box
                    height={pxToRem(200)}
                    overflow={'auto'}
                    borderRadius={2}
                    border={1}
                    borderColor={'primary.lighter'}
                    display={'flex'}
                    flexDirection={'column'}
                    gap={1}
                    p={1}
                    sx={{ cursor: 'pointer' }}
                    onClick={(e) => {
                      e?.stopPropagation();
                      router?.push({
                        pathname: AIR_SERVICES?.UPSERT_SERVICE,
                        query: {
                          serviceId: result?._id,
                          categoryId: result?.serviceCategory,
                        },
                      });
                    }}
                  >
                    <Box display={'flex'} gap={2} alignItems={'center'}>
                      <Checkbox
                        checked={
                          !!selectedCheckboxes?.find(
                            (item: any) => item === result?._id,
                          )
                        }
                        onClick={(e) => {
                          e?.stopPropagation();
                        }}
                        onChange={(e: any) => {
                          e?.stopPropagation();
                          e?.target?.checked
                            ? setSelectedCheckboxes([
                                ...selectedCheckboxes,
                                result?._id,
                              ])
                            : setSelectedCheckboxes(
                                selectedCheckboxes?.filter(
                                  (item: any) => item !== result?._id,
                                ),
                              );
                        }}
                        sx={{ p: 0 }}
                      />

                      <Avatar
                        sx={{
                          height: 50,
                          width: 50,
                          bgcolor: 'primary.main',
                        }}
                        src={generateImage(result?.attachmentDetails?.fileUrl)}
                        variant={'rounded'}
                      >
                        <Typography
                          variant={'body2'}
                          textTransform={'uppercase'}
                        >
                          {getInitialsSingleName(result?.itemName)}
                        </Typography>
                      </Avatar>
                    </Box>

                    <Typography variant={'h5'}>
                      {result?.itemName ?? '---'}
                    </Typography>

                    {Object?.entries(
                      getServicesSectionDataArray(result ?? {}),
                    )?.map(([key, value]: any) => (
                      <Typography
                        variant={'body3'}
                        color={'custom.main'}
                        textTransform={'capitalize'}
                        key={key}
                      >
                        {key}: {value}
                      </Typography>
                    ))}
                  </Box>
                </Grid>
              ))}
            </>
          ) : (
            <NoData message={'No Categories Found'} />
          )}
        </Grid>
      )}
    </PermissionsGuard>
  );
};

export default ServiceSection;
