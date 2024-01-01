import Image from 'next/image';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Tooltip,
  Typography,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import {
  CompanyLogoImage,
  EmailImage,
  MobileImage,
  NoteImage,
  ActivitesTimeImage,
  NoteAddImage,
} from '@/assets/images';

import CommonDrawer from '@/components/CommonDrawer';

import { accordionData } from '@/mock/modules/SocialComponents/Companies';
import usePreviewDrawer from './usePreviewDrawer';
import { v4 as uuidv4 } from 'uuid';

const PreviewDrawer = ({ isPreview, setIsPreview, checkedRows }: any) => {
  const { theme, companyDetailsArray, companyDetails } =
    usePreviewDrawer(checkedRows);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isPreview}
        onClose={() => {
          setIsPreview({ ...isPreview, previewDrawer: false });
        }}
        okText="Apply"
        isOk={true}
        footer={false}
      >
        <Box sx={{ paddingY: '1rem' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              paddingBottom: '1rem',
              position: 'absolute',
              top: 12,
            }}
          >
            <Image src={CompanyLogoImage} alt="logo" />
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: `${theme?.palette?.blue?.dull_blue}`,
                }}
              >
                {companyDetails?.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: '15px',
                  fontWeight: 400,
                  color: `${theme?.palette?.custom?.light}`,
                }}
              >
                {companyDetails?.domain}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              paddingY: '1rem',
            }}
          >
            <Box sx={{ cursor: 'pointer' }}>
              <Tooltip title="Email" placement="top">
                <Image src={EmailImage} alt="Icon" />
              </Tooltip>
            </Box>

            <Divider
              sx={{
                border: ` 1px solid ${theme?.palette?.grey[400]}`,
                height: '16px',
                marginX: '5px',
              }}
            />
            <Box sx={{ cursor: 'pointer' }}>
              <Tooltip title="Call" placement="top">
                <Image src={MobileImage} alt="Icon" />
              </Tooltip>
            </Box>
            <Divider
              sx={{
                border: ` 1px solid ${theme?.palette?.grey[400]}`,
                height: '16px',
                marginX: '5px',
              }}
            />
            <Box sx={{ cursor: 'pointer' }}>
              <Tooltip title="Notes" placement="top">
                <Image src={NoteImage} alt="Icon" />
              </Tooltip>
            </Box>
            <Divider
              sx={{
                border: ` 1px solid ${theme?.palette?.grey[400]}`,
                height: '16px',
                marginX: '5px',
              }}
            />
            <Box sx={{ cursor: 'pointer' }}>
              <Tooltip title="Meeting" placement="top">
                <Image src={NoteAddImage} alt="Icon" />
              </Tooltip>
            </Box>
            <Divider
              sx={{
                border: ` 1px solid ${theme?.palette?.grey[400]}`,
                height: '16px',
                marginX: '5px',
              }}
            />
            <Box sx={{ cursor: 'pointer' }}>
              <Tooltip title="Task" placement="top">
                <Image src={ActivitesTimeImage} alt="Icon" />
              </Tooltip>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            boxShadow: ` 0px 0px 4px 0px ${theme?.palette?.grey[700]}`,
            padding: '1rem',
            borderRadius: '8px',
          }}
        >
          {companyDetailsArray?.map((item: any) => {
            return (
              <Box
                key={uuidv4()}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 400,
                    color: `${theme?.palette?.custom?.main}`,
                  }}
                >
                  {item?.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: `${theme?.palette?.slateBlue?.main}`,
                  }}
                >
                  {item?.value}
                </Typography>
              </Box>
            );
          })}
        </Box>
        {accordionData?.map((item) => {
          return (
            <>
              <Box sx={{ marginTop: '1rem' }}>
                <Accordion
                  sx={{
                    boxShadow: ` 0px 0px 4px 0px ${theme?.palette?.grey[700]}`,
                    borderRadius: '6px',
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ArrowDropDownIcon
                        sx={{
                          fontSize: '36px',
                          color: `${theme?.palette?.slateBlue?.main}`,
                        }}
                      />
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                      }}
                    >
                      <Box
                        sx={{
                          bgcolor: `${theme?.palette?.secondary?.main}`,
                          color: `${theme?.palette?.common?.white}`,
                          borderRadius: '4px',
                          padding: '6px',
                          fontWeight: 500,
                          fontSize: '12px',
                        }}
                      >
                        {item.empNo}
                      </Box>

                      <Typography
                        variant="h6"
                        sx={{ color: `${theme?.palette?.slateBlue?.main}` }}
                      >
                        {item.mainHeading}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        {item.img ? (
                          <Image
                            src={item?.img}
                            alt="Image"
                            width={48}
                            height={48}
                          />
                        ) : (
                          ''
                        )}

                        <Box>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: `${theme?.palette?.blue?.dull_blue}`,
                              fontWeight: 500,
                            }}
                          >
                            {item?.name}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: `${theme?.palette?.custom?.light}`,
                              fontWeight: 500,
                            }}
                          >
                            {item?.email}
                          </Typography>
                        </Box>
                      </Box>

                      <Box>
                        {item?.stage ? (
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: `${theme?.palette?.custom?.light}`,
                              fontWeight: 500,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            Stage:
                            <Typography
                              variant="subtitle2"
                              sx={{
                                color: `${theme?.palette?.blue?.dull_blue}`,
                                fontWeight: 600,
                              }}
                            >
                              {item.stage}
                            </Typography>
                          </Typography>
                        ) : item?.phoneNumber ? (
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: `${theme?.palette?.custom?.light}`,
                              fontWeight: 500,
                            }}
                          >
                            {item?.phoneNumber}
                          </Typography>
                        ) : (
                          <Box sx={{ display: 'flex', justifyItems: 'start' }}>
                            <Typography
                              variant="h6"
                              sx={{
                                color: `${theme?.palette?.blue?.dull_blue}`,
                              }}
                            >
                              {item?.description}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </>
          );
        })}
      </CommonDrawer>
    </>
  );
};

export default PreviewDrawer;
