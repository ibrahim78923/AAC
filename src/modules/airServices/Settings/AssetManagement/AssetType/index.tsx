import { Fragment } from 'react';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES } from '@/constants';
import { AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import NoData from '@/components/NoData';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { EditColoredIcon, ViewEyeIcon } from '@/assets/icons';
import ParentType from './ParentType';
import ApiErrorState from '@/components/ApiErrorState';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ChildType from './ChildType';
import useAssetType from './useAssetType';

export const AssetType = () => {
  const {
    theme,
    router,
    setParentDetails,
    isLoading,
    isFetching,
    isError,
    data,
    setHoveredAccordion,
    hoveredAccordion,
    setHoveredChild,
    hoveredChild,
    setChildDetails,
    parentDetails,
    childDetails,
    setDefaultFields,
    defaultFields,
  } = useAssetType();

  return (
    <Fragment>
      <PageTitledHeader
        title={'Asset Type & Fields'}
        canMovedBack
        moveBack={() => {
          router?.push({
            pathname: AIR_SERVICES?.ASSET_MANAGEMENT_SETTINGS,
          });
        }}
        addTitle={'New Asset Type'}
        createPermissionKey={[
          AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.ADD_ASSET_TYPES,
        ]}
        handleAction={() => setParentDetails({ open: true, parentData: null })}
        disableAddButton={isLoading || isFetching}
      />

      {isLoading || isFetching ? (
        <SkeletonTable />
      ) : isError ? (
        <ApiErrorState />
      ) : !!data?.data?.length ? (
        <Box borderRadius={3} p={2} mt={2} bgcolor={'grey.400'}>
          <Box
            mb={2}
            bgcolor={'common.white'}
            borderRadius={2}
            p={1}
            display={'flex'}
            height={55}
            alignItems={'center'}
            justifyContent={'space-between'}
            borderLeft={`4px solid ${theme?.palette?.primary?.main}`}
            onMouseEnter={() => setDefaultFields(true)}
            onMouseLeave={() => setDefaultFields(false)}
          >
            <Box display={'flex'} alignItems={'center'}>
              <Typography
                variant={'body1'}
                fontWeight={500}
                color={'custom.bluish_gray'}
                borderRight={`1px solid ${theme?.palette?.custom?.bluish_gray}`}
                px={1.5}
              >
                D
              </Typography>
              <Typography
                variant={'body1'}
                fontWeight={500}
                ml={1}
                color={'grey.600'}
              >
                Default Fields
              </Typography>
            </Box>
            {defaultFields && (
              <Box
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  router?.push({
                    pathname: AIR_SERVICES?.ASSET_TYPE_DEFAULT_FIELDS,
                  });
                }}
              >
                <ViewEyeIcon />
              </Box>
            )}
          </Box>

          {data?.data?.map((parent: any) => (
            <Accordion
              key={parent?._id}
              disableGutters
              sx={{
                '&.MuiAccordion': {
                  '&.Mui-expanded': {
                    borderRadius: 2,
                  },
                },
                '&.MuiPaper-root': {
                  borderRadius: 2,
                  backgroundColor: 'transparent',
                },
                '& .MuiAccordionSummary-root': {
                  backgroundColor: theme?.palette?.common?.white,
                  color: theme?.palette?.grey?.[600],
                  borderRadius: 2,
                  borderLeft: `4px solid ${theme?.palette?.primary?.main}`,
                  flexDirection: 'row-reverse',
                  height: 55,
                },
                '& .MuiAccordionSummary-content': {
                  ml: theme?.spacing(1),
                  borderLeft: `1px solid ${theme?.palette?.custom?.bluish_gray}`,
                },
                '& .MuiAccordionDetails-root': {
                  backgroundColor: theme?.palette?.custom?.off_white_one,
                  boxShadow: `4px 4px 4px 0px ${theme?.palette?.custom?.shadow_black} inset, -4px -4px 4px 0px ${theme?.palette?.custom?.shadow_black} inset`,
                  padding: 2,
                  my: 1,
                  borderRadius: 2,
                  pl: 6,
                },
                mb: 2,
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      backgroundColor: 'primary.main',
                      borderRadius: 2,
                      color: 'common.white',
                    }}
                  />
                }
                ria-controls={`${parent?._id}-content`}
                id={`${parent?._id}-header`}
                onMouseEnter={() => setHoveredAccordion(parent?._id)}
                onMouseLeave={() => setHoveredAccordion(null)}
              >
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  width={'100%'}
                >
                  <Typography variant={'body1'} fontWeight={500} ml={1}>
                    {parent?.name}
                  </Typography>

                  {hoveredAccordion === parent?._id && (
                    <Box
                      onClick={(event: any) => {
                        event?.stopPropagation();
                        setParentDetails({ open: true, parentData: parent });
                      }}
                      sx={{ cursor: 'pointer' }}
                    >
                      <EditColoredIcon />
                    </Box>
                  )}
                </Box>
              </AccordionSummary>

              <AccordionDetails>
                {!!parent?.childList?.length &&
                  parent?.childList?.map((child: any) => (
                    <Box
                      mb={1}
                      bgcolor={'common.white'}
                      borderRadius={2}
                      p={1}
                      display={'flex'}
                      height={55}
                      alignItems={'center'}
                      justifyContent={'space-between'}
                      key={child?._id}
                      onMouseEnter={() => setHoveredChild(child?._id)}
                      onMouseLeave={() => setHoveredChild(null)}
                    >
                      <Box display={'flex'} alignItems={'center'}>
                        <Typography
                          variant={'body1'}
                          fontWeight={500}
                          color={'custom.bluish_gray'}
                          borderRight={`1px solid ${theme?.palette?.custom?.bluish_gray}`}
                          px={1}
                        >
                          {parent?.name?.slice(0, 1)}
                        </Typography>
                        <Typography
                          variant={'body1'}
                          fontWeight={500}
                          ml={1}
                          color={'grey.600'}
                        >
                          {child?.name}
                        </Typography>
                      </Box>
                      {hoveredChild === child?._id && (
                        <Box
                          onClick={() =>
                            setChildDetails({
                              open: true,
                              parentId: parent?._id,
                              childData: child,
                            })
                          }
                          sx={{ cursor: 'pointer' }}
                        >
                          <EditColoredIcon />
                        </Box>
                      )}
                    </Box>
                  ))}
                <Button
                  variant={'outlined'}
                  color={'secondary'}
                  startIcon={
                    <AddIcon
                      sx={{
                        backgroundColor: 'secondary.main',
                        borderRadius: 1,
                        color: 'common.white',
                      }}
                    />
                  }
                  onClick={() =>
                    setChildDetails({
                      open: true,
                      parentId: parent?._id,
                      childData: null,
                    })
                  }
                >
                  Add New Service
                </Button>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      ) : (
        <NoData />
      )}

      {parentDetails?.open && (
        <ParentType
          parentDetails={parentDetails}
          setParentDetails={setParentDetails}
        />
      )}

      {childDetails?.open && (
        <ChildType
          childDetails={childDetails}
          setChildDetails={setChildDetails}
        />
      )}
    </Fragment>
  );
};
