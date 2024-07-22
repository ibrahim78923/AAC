import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Avatar,
  Checkbox,
  Alert,
  useTheme,
  Tooltip,
} from '@mui/material';
import TemplateFrame from '../TemplateFrame';
import TemplateBasic from '../TemplateBasic';
import { GrayPlusIcon } from '@/assets/icons/index';
import { CrossCircleImage } from '@/assets/images';
import { styles } from './StepBuyerInfo.style';
import Image from 'next/image';
import { AlertModals } from '@/components/AlertModals';
import useUpdateQuote from '../useUpdateQuote';
import { generateImage } from '@/utils/avatarUtils';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

const StepBuyerInfo = ({
  openAddContact,
  openAddCompany,
  handleBuyerContactChange,
  selectedBuyerContactIds,
  handleCompanyChange,
  selectedCompanyIds,
}: any) => {
  const {
    dataGetQuoteById,
    BuyerInfoLoading,
    postManageLoading,
    isModalOpen,
    setIsModalOpen,
    handleDeleteSubmitBtn,
  } = useUpdateQuote();
  const contactData: any = dataGetQuoteById?.data?.deal;

  const theme = useTheme();

  return (
    <>
      <Grid container spacing={'40px'}>
        <Grid item xs={12} sm={12} md={12} lg={5}>
          {BuyerInfoLoading ? (
            <SkeletonTable />
          ) : (
            <Box>
              <Box>
                <>
                  {!selectedBuyerContactIds && !selectedCompanyIds && (
                    <Alert
                      sx={{
                        mb: '16px',
                        fontSize: '16px',
                        fontWeight: 500,
                        color: theme?.palette?.common?.white,
                      }}
                      severity="error"
                    >
                      Please select Company and Contact to continue
                    </Alert>
                  )}
                  <Box sx={styles?.rowBuyerInfo}>
                    <Typography variant="h4" sx={styles?.buyerInfoTitle}>
                      Buyer Information
                    </Typography>
                    <Button
                      variant="outlined"
                      className="small"
                      sx={styles?.btnAddMore}
                      onClick={openAddContact}
                      startIcon={<GrayPlusIcon />}
                    >
                      Add contact
                    </Button>
                  </Box>
                  <Typography variant="body1" sx={styles?.buyerInfoPara}>
                    Select the buyer contact information that you would like to
                    appear in the quote
                  </Typography>
                  <Box sx={styles?.contactsCont}>
                    <Typography variant="h6" sx={styles?.contactsHeading}>
                      Buyer’s Contact
                    </Typography>
                    <Box component="ul" sx={styles?.contactsList}>
                      {contactData &&
                        contactData[0]?.contacts?.map((item: any) => {
                          return (
                            <Box
                              component="li"
                              sx={styles?.listItem}
                              key={item?.id}
                            >
                              <Avatar
                                alt="user"
                                src={generateImage(
                                  item?.owner?.profilePicture?.url,
                                )}
                                sx={{
                                  width: 35,
                                  height: 35,
                                  background: theme?.palette?.grey[400],
                                }}
                              >
                                <Typography
                                  variant="body1"
                                  sx={{
                                    color: theme?.palette?.custom?.dim_grey,
                                  }}
                                >
                                  {item?.name?.charAt(1)}
                                  {item?.name?.charAt(item?.name?.length - 1)}
                                </Typography>
                              </Avatar>
                              <Box flex={1}>
                                <Typography sx={styles?.itemText}>
                                  {item?.name}
                                </Typography>
                                <Tooltip title={item?.email}>
                                  <Typography
                                    sx={{
                                      ...styles?.itemText,
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      width: '150px',
                                    }}
                                  >
                                    {item?.email}
                                  </Typography>
                                </Tooltip>
                                <Typography sx={styles?.itemText}>
                                  {item?.phoneNumber}
                                </Typography>
                              </Box>
                              <Box sx={{ cursor: 'pointer' }}>
                                <Image
                                  src={CrossCircleImage}
                                  alt="delIcon"
                                  onClick={() => {
                                    setIsModalOpen({
                                      ...isModalOpen,
                                      contactsModal: {
                                        isToggle: true,
                                        id: item?._id,
                                      },
                                    });
                                  }}
                                />
                              </Box>
                              <Checkbox
                                defaultChecked
                                checked={selectedBuyerContactIds === item?._id}
                                value={item?._id}
                                onChange={() =>
                                  handleBuyerContactChange(item?._id)
                                }
                              />
                            </Box>
                          );
                        })}
                    </Box>
                  </Box>
                </>
              </Box>
              <Box sx={styles?.companyInformation}>
                <Box sx={styles?.contactsCont}>
                  <Box sx={styles?.rowBuyerInfo}>
                    <Typography variant="h4" sx={styles?.buyerInfoTitle}>
                      Buyer’s Company
                    </Typography>
                    <Button
                      variant="outlined"
                      className="small"
                      sx={styles?.btnAddMore}
                      onClick={openAddCompany}
                      startIcon={<GrayPlusIcon />}
                    >
                      Add Company
                    </Button>
                  </Box>
                  <Box component="ul" sx={styles?.contactsList}>
                    {contactData &&
                      contactData[0]?.companies?.map((item: any) => {
                        return (
                          <Box
                            component="li"
                            sx={styles?.listItem}
                            key={item?.id}
                          >
                            <Box>
                              <Avatar
                                alt="user"
                                src={generateImage(
                                  item?.owner?.profilePicture?.url,
                                )}
                                sx={{
                                  width: 35,
                                  height: 35,
                                  background: theme?.palette?.grey[400],
                                }}
                              >
                                <Typography
                                  variant="body1"
                                  sx={{
                                    color: theme?.palette?.custom?.dim_grey,
                                  }}
                                >
                                  {item?.name?.charAt(1)}
                                  {item?.name?.charAt(item?.name?.length - 1)}
                                </Typography>
                              </Avatar>
                            </Box>
                            <Box flex={1}>
                              {/* <Typography sx={styles?.itemTitle}>
                                {item?.domain}
                              </Typography> */}
                              <Tooltip title={item?.domain}>
                                <Typography
                                  sx={{
                                    ...styles?.itemText,
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    width: '150px',
                                  }}
                                >
                                  {item?.domain}
                                </Typography>
                              </Tooltip>
                              <Box sx={styles?.itemText}> {item?.name}</Box>
                              <Box sx={styles?.itemText}>
                                {item?.owner?.email}
                              </Box>
                              <Box sx={styles?.itemText}>
                                {item?.owner?.phoneNumber}
                              </Box>
                            </Box>
                            <Box sx={{ cursor: 'pointer' }}>
                              <Image
                                src={CrossCircleImage}
                                alt="delIcon"
                                onClick={() => {
                                  setIsModalOpen({
                                    ...isModalOpen,
                                    companyModal: {
                                      isToggle: true,
                                      id: item?._id,
                                    },
                                  });
                                }}
                              />
                            </Box>
                            <Box>
                              <Checkbox
                                defaultChecked={
                                  selectedCompanyIds === item?._id
                                }
                                checked={selectedCompanyIds === item?._id}
                                onChange={() => handleCompanyChange(item._id)}
                              />
                            </Box>
                          </Box>
                        );
                      })}
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={12} lg={7}>
          <TemplateFrame>
            <TemplateBasic />
          </TemplateFrame>
        </Grid>
      </Grid>
      {isModalOpen?.companyModal?.isToggle && (
        <AlertModals
          message="Are you sure you want to delete this?"
          type="delete"
          open={isModalOpen?.companyModal}
          handleClose={() =>
            setIsModalOpen({
              ...isModalOpen,
              companyModal: { isToggle: false, id: '' },
            })
          }
          handleSubmitBtn={handleDeleteSubmitBtn}
          loading={postManageLoading}
        />
      )}
      {isModalOpen?.contactsModal?.isToggle && (
        <AlertModals
          message="Are you sure you want to delete this?"
          type="delete"
          open={isModalOpen?.contactsModal}
          handleClose={() =>
            setIsModalOpen({
              ...isModalOpen,
              contactsModal: { isToggle: false, id: '' },
            })
          }
          handleSubmitBtn={handleDeleteSubmitBtn}
          loading={postManageLoading}
        />
      )}
    </>
  );
};

export default StepBuyerInfo;
