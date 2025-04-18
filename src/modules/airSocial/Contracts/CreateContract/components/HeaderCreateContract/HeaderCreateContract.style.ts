// import { Theme } from '@mui/material';
import { ENUM_CONTRACT_STATUS } from '@/utils/contracts';
export const styles = {
  toolbar: () => ({
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  }),

  left: () => ({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  }),

  headerTitle: () => ({
    fontSize: '15px',
    fontWeight: '400',
    lineHeight: '1.25',
    color: '#1D2939',
  }),

  backButton: () => ({
    cursor: 'pointer',
    display: 'flex',
  }),

  statusBadge: (status: string) => ({
    fontSize: '11px',
    fontWeight: '500',
    lineHeight: '1.33',
    padding: '2px 8px',
    borderRadius: '4px',
    backgroundColor:
      status === ENUM_CONTRACT_STATUS?.SIGNED
        ? '#D1FADF'
        : status === ENUM_CONTRACT_STATUS?.PENDING
          ? '#FEF0C7'
          : status === ENUM_CONTRACT_STATUS?.DRAFT
            ? '#EBE9FE'
            : status === ENUM_CONTRACT_STATUS?.REJECTED
              ? '#FEE4E2'
              : '#EBE9FE',
    color:
      status === ENUM_CONTRACT_STATUS?.SIGNED
        ? '#05603A'
        : status === ENUM_CONTRACT_STATUS?.PENDING
          ? '#93370D'
          : status === ENUM_CONTRACT_STATUS?.DRAFT
            ? '#4A1FB8'
            : status === ENUM_CONTRACT_STATUS?.REJECTED
              ? '#912018'
              : '#4A1FB8',
  }),

  right: () => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  }),
};
