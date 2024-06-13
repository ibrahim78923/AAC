import { Box, Checkbox, Grid, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import useTaskCardView from './useTaskCardView';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';

const TaskViewCard = ({ data, loading, selectedRec, setSelectedRec }: any) => {
  const { theme, taskCardData, statusConstants, handleSelectTaskById } =
    useTaskCardView({ data, selectedRec, setSelectedRec });
  return (
    <>
      <Grid container spacing={2}>
        {taskCardData?.map((column) =>
          loading ? (
            <SkeletonForm key={uuidv4()} />
          ) : (
            <Grid item xl={3} lg={4} md={6} xs={12} key={uuidv4()}>
              <Box
                sx={{
                  border: `1px solid ${theme?.palette?.grey[700]}`,
                  background: `${theme?.palette?.grey[100]}`,
                  borderRadius: '10px',
                  maxHeight: '550px',
                  overflowY: 'scroll',
                }}
              >
                <Box
                  sx={{
                    background: `${theme?.palette?.common?.white}`,
                    boxShadow: '0px 3px 6px 0px #6B72801A',
                    borderRadius: '10px 10px 0px 0px',
                    padding: '8px',
                    position: 'sticky',
                    top: '0',
                    zIndex: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: `${theme?.palette?.blue?.main}`,
                      fontWeight: 600,
                    }}
                  >
                    {column?.mainTitle}
                  </Typography>
                </Box>
                {column?.cardData?.map((items: any) => (
                  <Box key={uuidv4()}>
                    <Box
                      sx={{
                        border: `1px solid ${theme?.palette?.grey[700]}`,
                        padding: '10px',
                        borderRadius: '8px',
                        margin: '16px',
                        background: `${theme?.palette?.common?.white}`,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              color: `${theme?.palette?.slateBlue?.main}`,
                              fontWeight: 700,
                            }}
                          >
                            {items?.subTitle}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: `${theme?.palette?.grey[900]}`,
                              fontWeight: 400,
                            }}
                          >
                            {items?.date}
                          </Typography>
                        </Box>
                        {/* <Checkbox /> */}
                        {column?.mainTitle !== 'All' && (
                          <Checkbox
                            checked={selectedRec?.includes(items?.id)}
                            onChange={({ target }) => {
                              handleSelectTaskById(target.checked, items?.id);
                            }}
                          />
                        )}
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: `${theme?.palette?.custom?.main}`,
                            fontWeight: 400,
                          }}
                        >
                          Linked Company
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: `${theme?.palette?.blue?.main}`,
                            fontWeight: 600,
                          }}
                        >
                          {items?.linkdCompany}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: `${theme?.palette?.custom?.main}`,
                            fontWeight: 400,
                          }}
                        >
                          Assigned User
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: `${theme?.palette?.blue?.main}`,
                            fontWeight: 600,
                          }}
                        >
                          {items?.assignUser}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: `${theme?.palette?.custom?.main}`,
                            fontWeight: 400,
                          }}
                        >
                          Task Status
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color:
                              items?.status === statusConstants?.Inprogress
                                ? `${theme?.palette?.warning?.main}`
                                : items?.status === statusConstants?.Pending
                                ? `${theme?.palette?.error?.main}`
                                : items?.status === statusConstants?.Complete
                                ? `${theme?.palette?.success?.main}`
                                : '',
                            fontWeight: 600,
                          }}
                        >
                          {items?.status}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>
          ),
        )}
      </Grid>
    </>
  );
};

export default TaskViewCard;
