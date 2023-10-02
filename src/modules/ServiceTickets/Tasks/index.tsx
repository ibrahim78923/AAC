import TanstackTable from '@/components/Tabel/TanstackTable';
import { columns, data } from './TicketTasks.mock';
import { Button, Typography } from '@mui/material';

const TicketTasks = () => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          sx={{ fontSize: '18px', color: '#374151', fontWeight: 500 }}
        >
          Task
        </Typography>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Button
            sx={{
              px: '18px',
              color: '#6B7280',
              ':hover': { bgcolor: '#fff' },
              border: '1px solid #D1D5DB',
            }}
            endIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M8.76658 6.63672H13.4391C13.7121 6.63672 13.853 6.96865 13.6615 7.16474C13.6611 7.16509 13.6608 7.16544 13.6604 7.16579L11.2555 9.57066L9.77803 11.0482C9.35079 11.4754 8.65487 11.4754 8.22763 11.0482L4.34263 7.16317C4.14669 6.96722 4.28584 6.63672 4.55908 6.63672H8.76658Z"
                  fill="#D1D5DB"
                  stroke="#D1D5DB"
                />
              </svg>
            }
          >
            Action
          </Button>
          <Button
            sx={{
              px: '18px',
              bgcolor: '#38CAB5',
              color: '#fff',
              ':hover': { bgcolor: '#38CAB5' },
            }}
            startIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M2 9C2 5.14364 5.14364 2 9 2C12.8564 2 16 5.14364 16 9C16 12.8564 12.8564 16 9 16C5.14364 16 2 12.8564 2 9ZM10.0625 12V10.0625H12C12.5836 10.0625 13.0625 9.58364 13.0625 9C13.0625 8.41636 12.5836 7.9375 12 7.9375H10.0625V6C10.0625 5.41636 9.58364 4.9375 9 4.9375C8.41636 4.9375 7.9375 5.41636 7.9375 6V7.9375H6C5.41636 7.9375 4.9375 8.41636 4.9375 9C4.9375 9.58364 5.41636 10.0625 6 10.0625H7.9375V12C7.9375 12.5836 8.41636 13.0625 9 13.0625C9.58364 13.0625 10.0625 12.5836 10.0625 12Z"
                  fill="white"
                  stroke="white"
                />
              </svg>
            }
          >
            Add New Task
          </Button>
        </div>
      </div>
      <br />
      <TanstackTable columns={columns} data={data} />
    </div>
  );
};

export default TicketTasks;
