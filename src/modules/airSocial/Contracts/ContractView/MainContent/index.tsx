import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { styles } from './MainContent.style';
import Image from 'next/image';
import { IconDefaultAttachment, IconSigningDigitally } from '@/assets/icons';
import DocumentHistory from '../../CreateContract/components/DocumentHistory';
import { ENUM_CONTRACT_STATUS, getPartyName } from '@/utils/contracts';
import { generateImage } from '@/utils/avatarUtils';
import EditablePDF from './EditablePDF';
import dayjs from 'dayjs';

type MainContentProps = {
  contractData: any;
};

export default function MainContent({ contractData }: MainContentProps) {
  const theme = useTheme();

  const getAvatarPlaceholder = (name: string) => {
    return name
      ?.split(' ')
      ?.map((n: string) => n.charAt(0))
      ?.join('')
      ?.slice(0, 2);
  };

  const sizeMB = contractData?.attachment?.size / (1024 * 1024);

  return (
    <Grid container spacing="30px">
      <Grid item xs={12} sm={6}>
        <Box sx={styles?.contractTitle}>{contractData?.name}</Box>
      </Grid>

      <Grid item xs={12} sm={6}>
        {contractData?.logo && (
          <Box sx={styles?.contractLogo}>
            <Image
              src={generateImage(contractData?.logo?.url)}
              alt="Contract Logo"
              width={108}
              height={18}
              style={styles?.logo}
            />
          </Box>
        )}
      </Grid>

      {contractData?.parties?.map((party: any) => (
        <Grid item xs={12} sm={6} key={party?._id || party?.id}>
          <Box sx={styles?.fieldCard}>
            <Box sx={styles?.fieldCardField}>
              <Box sx={styles?.fieldCardLabel}>{'Full name'}</Box>
              <Box sx={styles?.fieldCardValue}>
                {getPartyName(party?.moduleData)}
              </Box>
            </Box>
            <Box sx={styles?.fieldCardField}>
              <Box sx={styles?.fieldCardLabel}>
                {'Hereinafter referred to as'}
              </Box>
              <Box sx={styles?.fieldCardValue}>
                {party?.referredAs ? party?.referredAs : '--'}
              </Box>
            </Box>
          </Box>
        </Grid>
      ))}

      <Grid item xs={12}></Grid>

      {contractData?.signees?.map((signee: any) => (
        <Grid item xs={12} sm={6} key={signee?._id || signee?.id}>
          <Box sx={styles?.signatureCard(theme, signee?.signatureStatus)}>
            <Box sx={styles?.signatureCardBody}>
              <Box sx={styles?.signatureCardField}>
                <Box sx={styles?.fieldCardLabel}>{'On behalf of'}</Box>
                <Box sx={styles?.fieldCardValue}>
                  {getPartyName(signee?.moduleData)}
                </Box>
              </Box>
              <Box sx={styles?.signatureCardField}>
                <Box sx={styles?.fieldCardLabel}>{'Email'}</Box>
                <Box sx={styles?.fieldCardValue}>
                  {signee?.email ? signee.email : '--'}
                </Box>
              </Box>
              <Box sx={styles?.signatureCardField}>
                <Box sx={styles?.fieldCardLabel}>{'Full name'}</Box>
                <Box sx={styles?.fieldCardValue}>
                  {signee?.name ? signee?.name : '--'}
                </Box>
              </Box>
              <Box sx={styles?.signatureCardField}>
                <Box sx={styles?.fieldCardLabel}>{'IP Address'}</Box>
                <Box sx={styles?.fieldCardValue}>{'-'}</Box>
              </Box>
            </Box>
            <Box
              sx={styles?.signatureCardFooter(theme, signee?.signatureStatus)}
            >
              <Box sx={styles?.signatureCardFooterInner}>
                <Box
                  sx={styles?.signingDigitally(theme, signee?.signatureStatus)}
                >
                  <IconSigningDigitally />
                  <Box>
                    <Typography
                      sx={{
                        color:
                          signee?.signatureStatus ===
                            ENUM_CONTRACT_STATUS?.CHANGE_REQUEST ||
                          signee?.signatureStatus ===
                            ENUM_CONTRACT_STATUS?.REJECTED
                            ? 'error.main'
                            : 'inherit',
                      }}
                    >
                      {signee?.signatureStatus ===
                        ENUM_CONTRACT_STATUS?.CHANGE_REQUEST ||
                      signee?.signatureStatus === ENUM_CONTRACT_STATUS?.REJECTED
                        ? 'Rejected'
                        : 'Signing digitally'}
                    </Typography>
                    {signee?.signatureStatus === 'SIGNED' && (
                      <Typography variant="body2">
                        {dayjs(signee?.updatedAt).format(
                          'DD MMMM YYYY [at] HH:mm:ss [GMT] Z',
                        )}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>

              <Box
                sx={styles?.signatureCardFooterStripe(
                  theme,
                  signee?.signatureStatus,
                )}
              />
            </Box>
          </Box>
        </Grid>
      ))}

      {contractData?.contractType === 'PDF' && (
        <Grid item xs={12}>
          <EditablePDF
            contractData={contractData}
            signees={contractData?.signees}
          />
        </Grid>
      )}

      {contractData?.contractType === 'BASIC' && contractData?.attachment && (
        <Grid item xs={12}>
          <Box sx={styles?.attachmentPreview}>
            <Box className="previewLabel">Default attachment</Box>
            <Box className="previewInfobar">
              <Box className="previewInfo">
                <Box className="previewFileIcon">
                  <IconDefaultAttachment />
                </Box>
                <Box>
                  <Box className="previewFileName">
                    {contractData?.attachment?.name}
                  </Box>
                  <Box className="previewFileSize">
                    {sizeMB < 1
                      ? Math.round(contractData?.attachment?.size / 1024) +
                        ' KB'
                      : Math.round(sizeMB) + ' MB'}
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box sx={styles?.embedPdf}>
              <embed
                src={generateImage(contractData?.attachment?.url)}
                type="application/pdf"
              />
            </Box>
          </Box>
        </Grid>
      )}

      {contractData?.signees?.length > 0 && (
        <Grid item xs={12}>
          <Box sx={styles?.labelWrapper}>
            <Box sx={styles.label}>Default Signatures</Box>
          </Box>
          <Stack>
            {contractData?.signees?.map((signee: any) => (
              <Box sx={styles?.fieldGroup} key={signee?._id || signee?.id}>
                <Box sx={styles?.individual}>
                  <Box sx={styles?.signees}>
                    <Avatar
                      alt={signee?.name}
                      src=""
                      sx={{
                        width: 36,
                        height: 36,
                        backgroundColor: 'primary.main',
                        fontSize: 14,
                        textTransform: 'uppercase',
                      }}
                    >
                      {getAvatarPlaceholder(signee?.name)}
                    </Avatar>

                    <Box sx={styles?.signeeName}>{signee?.name}</Box>
                  </Box>
                  <Box sx={styles?.fieldActions}>
                    <Box sx={styles?.signatureValue}>
                      {signee?.signatureType}
                    </Box>
                    <Button
                      variant="outlined"
                      color="inherit"
                      size="small"
                      className="small"
                      disabled
                    >
                      Change
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </Stack>
        </Grid>
      )}

      {contractData?.activityHistory && (
        <Grid item xs={12}>
          <DocumentHistory data={contractData?.activityHistory || []} />
        </Grid>
      )}
    </Grid>
  );
}
