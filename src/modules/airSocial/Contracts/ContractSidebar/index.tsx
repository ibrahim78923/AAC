import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Search from '@/components/Search';
import useContractSidebar from './useContractSidebar';
import { FolderOutlined, MoreHorizOutlined } from '@mui/icons-material';

const ContractSidebar = (props: any) => {
  const { setContractName } = props;
  const { theme, setSearchby } = useContractSidebar();

  return (
    <Box
      sx={{
        border: `0.75px solid ${theme?.palette?.custom?.off_white_three}`,
        height: '100vh',
        padding: '24px 20px',
      }}
    >
      <Search placeholder="Search Here" setSearchBy={setSearchby} />
      <Box>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              fontSize: '15px',
              color: theme?.palette?.grey[800],
              fontWeight: 500,
            }}
          >
            Contracts
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <Accordion>
              <AccordionSummary
                aria-controls="panel1d-content"
                expandIcon={<ExpandMoreIcon />}
                id="panel1d-header"
                sx={{
                  fontSize: '12px',
                  color: theme?.palette?.custom?.light,
                  fontWeight: 500,
                }}
              >
                Shared Contracts
              </AccordionSummary>
              <AccordionDetails sx={{ px: 4 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  sx={{
                    '& .svgIcon': { display: 'none' },
                    '&:hover .svgIcon': { display: 'block' },
                  }}
                  onClick={() => setContractName('Contract')}
                >
                  <Box display="flex" gap={0.5}>
                    <FolderOutlined
                      sx={{
                        fontSize: '14px',
                        color: theme?.palette?.custom?.light,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '12px',
                        color: theme?.palette?.custom?.light,
                      }}
                    >
                      Contracts
                    </Typography>
                  </Box>
                  <MoreHorizOutlined
                    className="svgIcon"
                    sx={{
                      fontSize: '18px',
                      color: theme?.palette?.custom?.light,
                      cursor: 'pointer',
                    }}
                  />
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                aria-controls="panel1d-content"
                expandIcon={<ExpandMoreIcon />}
                id="panel1d-header"
                sx={{
                  fontSize: '12px',
                  color: theme?.palette?.custom?.light,
                  fontWeight: 500,
                }}
              >
                Shared Contracts
              </AccordionSummary>
              <AccordionDetails sx={{ px: 4 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  sx={{
                    '& .svgIcon': { display: 'none' },
                    '&:hover .svgIcon': { display: 'block' },
                  }}
                  onClick={() => setContractName('Test File')}
                >
                  <Box display="flex" gap={0.5}>
                    <FolderOutlined
                      sx={{
                        fontSize: '14px',
                        color: theme?.palette?.custom?.light,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '12px',
                        color: theme?.palette?.custom?.light,
                      }}
                    >
                      Test File
                    </Typography>
                  </Box>
                  <MoreHorizOutlined
                    className="svgIcon"
                    sx={{
                      fontSize: '18px',
                      color: theme?.palette?.custom?.light,
                      cursor: 'pointer',
                    }}
                  />
                </Box>
              </AccordionDetails>
            </Accordion>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default ContractSidebar;
