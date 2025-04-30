import { ENUM_CONTRACT_STATUS } from '@/utils/contracts';
import { Theme } from '@mui/material';

export const styles = {
  contractTitle: (theme: Theme) => ({
    fontSize: '18px',
    lineHeight: '1.25',
    color: theme?.palette?.slateBlue?.main,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  }),
  contractLogo: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  logo: {
    maxWidth: '100%',
    height: 'auto',
    width: 'auto',
    maxHeight: '160px',
  },
  fieldCard: (theme: Theme) => ({
    backgroundColor: theme?.palette?.custom?.pale_grayish_blue,
    padding: '20px',
    border: `1px solid ${theme?.palette?.custom?.border_grayish_blue}`,
    borderRadius: '6px',
    height: '100%',
  }),
  fieldCardField: {
    mt: '18px',
    '&:first-child': {
      mt: 0,
    },
  },
  fieldCardLabel: (theme: Theme) => ({
    fontSize: '11px',
    lineHeight: '1.25',
    color: theme?.palette?.custom?.light,
  }),
  fieldCardValue: (theme: Theme) => ({
    fontSize: '14px',
    lineHeight: '1.25',
    color: theme?.palette?.slateBlue?.main,
  }),
  signatureCard: (theme: Theme, status: string) => ({
    backgroundColor: theme?.palette?.custom?.pale_grayish_blue,
    border: `1px solid ${
      status === ENUM_CONTRACT_STATUS?.SIGNED
        ? 'rgba(202, 244, 243, 0.75)'
        : status === ENUM_CONTRACT_STATUS?.CHANGE_REQUEST ||
            status === ENUM_CONTRACT_STATUS?.REJECTED
          ? '#fff0ee'
          : theme?.palette?.custom?.border_grayish_blue
    }`,
    borderRadius: '6px',
    height: '100%',
    overflow: 'hidden',
  }),
  signatureCardBody: {
    padding: '15px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  signatureCardField: {
    flex: '0 0 auto',
    width: '50%',
    padding: '9px',
  },
  signatureCardFooter: (theme: Theme, status: string) => ({
    borderTop: `1px solid ${theme?.palette?.custom?.border_grayish_blue}`,
    backgroundColor: `${
      status === ENUM_CONTRACT_STATUS?.SIGNED
        ? 'rgba(202, 244, 243, 0.75)'
        : status === ENUM_CONTRACT_STATUS?.CHANGE_REQUEST ||
            status === ENUM_CONTRACT_STATUS?.REJECTED
          ? '#fff0ee'
          : theme?.palette?.custom?.pale_grayish_blue
    }
    `,
  }),
  signatureCardFooterInner: {
    padding: '12px 24px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
  },
  signingDigitally: (theme: Theme, status: string) => {
    const isRejected =
      status === ENUM_CONTRACT_STATUS?.CHANGE_REQUEST ||
      status === ENUM_CONTRACT_STATUS?.REJECTED;
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '18px',
      fontSize: '12px',
      color: isRejected ? 'error.main' : theme?.palette?.custom?.light,
    };
  },
  signatureCardFooterStripe: (theme: Theme, status: string) => {
    const isSigned = status === ENUM_CONTRACT_STATUS?.SIGNED;
    const isRejected =
      status === ENUM_CONTRACT_STATUS?.CHANGE_REQUEST ||
      status === ENUM_CONTRACT_STATUS?.REJECTED;

    return {
      borderTop: `2px solid ${
        isSigned
          ? '#38CAB5'
          : isRejected
            ? theme?.palette.error.main
            : '#344054'
      }`,
      height: '9px',
      background: `repeating-linear-gradient(
        -55deg,
        ${
          isSigned
            ? '#38CAB5'
            : isRejected
              ? theme?.palette.error.main
              : '#344054'
        },
        ${
          isSigned
            ? '#38CAB5'
            : isRejected
              ? theme?.palette.error.main
              : '#344054'
        } 48px,
        #ffffff 48px,
        #ffffff 54px
      )`,
    };
  },

  attachmentPreview: (theme: Theme) => ({
    '& .previewLabel': {
      color: theme?.palette?.grey[600],
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '22px',
      marginBottom: '6px',
    },
    '& .previewInfobar': {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      backgroundColor: theme?.palette?.custom?.pale_grayish_blue,
      border: `1px solid ${theme?.palette?.custom?.border_grayish_blue}`,
      borderRadius: '6px',
      padding: '10px',

      '& .previewInfo': {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',

        '& .previewFileIcon': {
          height: '30px',
          width: '30px',
        },
        '& .previewFileName': {
          fontSize: '14px',
          lineHeight: '22px',
          color: theme?.palette?.slateBlue?.main,
        },
        '& .previewFileSize': {
          fontSize: '12px',
          lineHeight: '18px',
          color: theme?.palette?.custom?.light,
        },
      },

      '& .previewInfobarAction': {
        ml: 'auto',
      },
    },
  }),
  embedPdf: {
    height: '530px',
    position: 'relative',

    '& embed': {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
    },
  },
  labelWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  label: (theme: Theme) => ({
    flex: '1',
    color: theme?.palette?.grey[600],
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '1.57142857',
    mb: '6px',
  }),
  fieldGroup: () => ({
    border: `1px solid rgba(0,0,0,0.23)`,
    borderRadius: '4px',
    padding: '0 12px',
  }),
  individual: () => ({
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
    '& + &': {
      borderTop: '1px solid rgba(0,0,0,0.23)',
    },
  }),
  signees: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: '1',
  },
  signeeName: {
    fontSize: '14px',
  },
  signatureValue: (theme: Theme) => ({
    color: theme?.palette?.secondary?.main,
    fontSize: '13px',
    fontWeight: '600',
    backgroundColor: theme?.palette?.custom?.light_grayish_blue,
    padding: '6px 10px',
    borderRadius: '4px',
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  fieldActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
};
