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
import {
  AvatarCompanyImage,
  AvatarContactImage,
  CrossCircleImage,
} from '@/assets/images';
import { styles } from './StepBuyerInfo.style';
import Image from 'next/image';
import { AlertModals } from '@/components/AlertModals';
import useUpdateQuote from '../useUpdateQuote';

const StepBuyerInfo = ({
  openAddContact,
  openAddCompany,
  handleBuyerContactChange,
  selectedBuyerContactIds,
  handleCompanyChange,
  selectedCompanyIds,
}: any) => {
  const {
    handleDeleteCompanies,
    dataGetQuoteById,
    handleDeleteModal,
    deleteModalId,
    isCompanyDeleteLoading,
    isContactDeleteLoading,
    handleContactDeleteModal,
    deleteContactModalId,
    handleDeleteContacts,
  } = useUpdateQuote();
  const contactData: any = dataGetQuoteById?.data?.deal;
  const theme = useTheme();

  return (
    <>
      <Grid container spacing={'40px'}>
        <Grid item xs={5}>
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
                    contactData[0]?.contacts?.map((item: any) => (
                      <Box component="li" sx={styles?.listItem} key={item?.id}>
                        <Avatar
                          src={AvatarContactImage?.src}
                          sx={styles?.itemAvatar}
                        />
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
                        <Image
                          src={CrossCircleImage}
                          alt="delIcon"
                          onClick={() => handleContactDeleteModal(item?._id)}
                        />
                        <Checkbox
                          defaultChecked
                          checked={selectedBuyerContactIds === item?._id}
                          value={item?._id}
                          onChange={() => handleBuyerContactChange(item?._id)}
                        />
                      </Box>
                    ))}
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
                  contactData[0]?.companies?.map((item: any) => (
                    <Box component="li" sx={styles?.listItem} key={item?.id}>
                      <Box>
                        <Avatar
                          src={AvatarCompanyImage?.src}
                          sx={styles?.itemAvatar}
                        />
                      </Box>
                      <Box flex={1}>
                        <Typography sx={styles?.itemTitle}>
                          {item?.domain}
                        </Typography>
                        <Box sx={styles?.itemText}> {item?.name}</Box>
                        <Box sx={styles?.itemText}>{item?.owner?.email}</Box>
                        <Box sx={styles?.itemText}>
                          {item?.owner?.phoneNumber}
                        </Box>
                      </Box>
                      <Image
                        src={CrossCircleImage}
                        alt="delIcon"
                        onClick={() => handleDeleteModal(item?._id)}
                      />
                      <Checkbox
                        defaultChecked
                        checked={selectedCompanyIds === item?._id}
                        onChange={() => handleCompanyChange(item._id)}
                      />
                    </Box>
                  ))}
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={7}>
          <TemplateFrame>
            <TemplateBasic />
            {/* <TemplatePlaceholder /> */}
          </TemplateFrame>
        </Grid>
      </Grid>
      {deleteModalId && (
        <AlertModals
          message="Are you sure you want to delete this?"
          type="delete"
          open={Boolean(deleteModalId)}
          handleClose={() => handleDeleteModal(null)}
          handleSubmitBtn={handleDeleteCompanies}
          loading={isCompanyDeleteLoading}
        />
      )}
      {deleteContactModalId && (
        <AlertModals
          message="Are you sure you want to delete this?"
          type="delete"
          open={Boolean(deleteContactModalId)}
          handleClose={() => handleContactDeleteModal(null)}
          handleSubmitBtn={handleDeleteContacts}
          loading={isContactDeleteLoading}
        />
      )}
    </>
  );
};

export default StepBuyerInfo;
