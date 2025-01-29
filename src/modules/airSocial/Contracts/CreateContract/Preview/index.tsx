import React from 'react';
import { Box, Grid } from '@mui/material';
import { styles } from './Preview.style';
import Image from 'next/image';
import LogoImage from './contract-logo.png';
import { IconDefaultAttachment, IconSigningDigitally } from '@/assets/icons';
import { useFormContext } from 'react-hook-form';
import DefaultSignatures from '../form-fields/DefaultSignatures';
import useCreateContract from '../useCreateContract';
import DocumentHistory from '../components/DocumentHistory';
import { getPartyName } from '@/utils/contracts';

export default function Preview() {
  const { watch } = useFormContext();
  const data = watch();
  const defaultAttachment = watch('defaultAttachment');

  const {
    // handleOpenModalManageSignature,
    signeeFields,
    signeeValues,

    isIndividualSignature,
    handleChangeIndividualSignature,
    setSelectedSigneeId,
  } = useCreateContract();

  return (
    <Grid container spacing="30px">
      <Grid item xs={12} sm={6}>
        <Box sx={styles?.contractTitle}>{data?.name}</Box>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Box sx={styles?.contractLogo}>
          <Image
            src={LogoImage}
            alt="Contract Logo"
            width={108}
            height={18}
            style={styles?.logo}
          />
        </Box>
      </Grid>
      {data?.parties?.length > 0 &&
        data?.parties?.map((party: any) => (
          <Grid item xs={12} sm={6} key={party?._id || party?.id}>
            <Box sx={styles?.fieldCard}>
              <Box sx={styles?.fieldCardField}>
                <Box sx={styles?.fieldCardLabel}>{'Full name'}</Box>
                <Box sx={styles?.fieldCardValue}>
                  {getPartyName(party?.name)}
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
      {data?.parties?.length === 0 && (
        <Grid item xs={12} sm={6}>
          <Box sx={styles?.fieldCard}>
            <Box sx={styles?.fieldCardField}>
              <Box sx={styles?.fieldCardLabel}>{'Full name'}</Box>
              <Box sx={styles?.fieldCardValue}>{'--'}</Box>
            </Box>
            <Box sx={styles?.fieldCardField}>
              <Box sx={styles?.fieldCardLabel}>
                {'Hereinafter referred to as'}
              </Box>
              <Box sx={styles?.fieldCardValue}>{'--'}</Box>
            </Box>
          </Box>
        </Grid>
      )}

      <Grid item xs={12}>
        <Box>Start adding document content here...</Box>
        <Box>Make sure that the “Full text editing” mode is switched on.</Box>
      </Grid>

      {data?.signees?.length === 0 && (
        <Grid item xs={12} sm={6}>
          <Box sx={styles?.signatureCard}>
            <Box sx={styles?.signatureCardBody}>
              <Box sx={styles?.signatureCardField}>
                <Box sx={styles?.fieldCardLabel}>{'On behalf of'}</Box>
                <Box sx={styles?.fieldCardValue}>{'--'}</Box>
              </Box>
              <Box sx={styles?.signatureCardField}>
                <Box sx={styles?.fieldCardLabel}>{'Email'}</Box>
                <Box sx={styles?.fieldCardValue}>{'--'}</Box>
              </Box>
              <Box sx={styles?.signatureCardField}>
                <Box sx={styles?.fieldCardLabel}>{'Full name'}</Box>
                <Box sx={styles?.fieldCardValue}>{'--'}</Box>
              </Box>
              <Box sx={styles?.signatureCardField}>
                <Box sx={styles?.fieldCardLabel}>{'IP Address'}</Box>
                <Box sx={styles?.fieldCardValue}>{'-'}</Box>
              </Box>
            </Box>
            <Box sx={styles?.signatureCardFooter}>
              <Box sx={styles?.signatureCardFooterInner}>
                <Box sx={styles?.signingDigitally}>
                  <IconSigningDigitally />
                  <Box>Signing digitally</Box>
                </Box>
              </Box>

              <Box sx={styles?.signatureCardFooterStripe} />
            </Box>
          </Box>
        </Grid>
      )}
      {data?.signees?.length > 0 &&
        data?.signees?.map((signee: any) => (
          <Grid item xs={12} sm={6} key={signee?._id || signee?.id}>
            <Box sx={styles?.signatureCard}>
              <Box sx={styles?.signatureCardBody}>
                <Box sx={styles?.signatureCardField}>
                  <Box sx={styles?.fieldCardLabel}>{'On behalf of'}</Box>
                  <Box sx={styles?.fieldCardValue}>
                    {signee?.onBehalfOf ?? '--'}
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
              <Box sx={styles?.signatureCardFooter}>
                <Box sx={styles?.signatureCardFooterInner}>
                  <Box sx={styles?.signingDigitally}>
                    <IconSigningDigitally />
                    <Box>Signing digitally</Box>
                  </Box>
                </Box>

                <Box sx={styles?.signatureCardFooterStripe} />
              </Box>
            </Box>
          </Grid>
        ))}

      {defaultAttachment && (
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
                    {defaultAttachment?.name}
                  </Box>
                  <Box className="previewFileSize">
                    {Math.floor(defaultAttachment?.size / 1024)} MB
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box sx={styles?.embedPdf}>
              <embed
                src={`${URL.createObjectURL(
                  new Blob([defaultAttachment], { type: 'application/pdf' }),
                )}`}
                type="application/pdf"
              />
            </Box>
          </Box>
        </Grid>
      )}

      {signeeFields?.length > 0 && (
        <Grid item xs={12}>
          <DefaultSignatures
            isIndividualSignature={isIndividualSignature}
            onChangeIndividualSignature={handleChangeIndividualSignature}
            signees={signeeValues}
            setSelectedSigneeId={setSelectedSigneeId}
            preview={true}
          />
        </Grid>
      )}

      <Grid item xs={12}>
        <DocumentHistory />
      </Grid>
    </Grid>
  );
}
