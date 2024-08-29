import { Box, Typography } from '@mui/material';
// import useModuleCard from './useModuleCard';
import { styles } from './ModuleCard.style';
import { ModuleCardPropsI } from './ModuleCard.interface';

const ModuleCard = ({
  icon,
  title,
  description,
  onClick,
}: ModuleCardPropsI) => {
  // const { theme } = useModuleCard();

  return (
    <Box sx={styles?.moduleCard} onClick={onClick}>
      <Box className="module-card-icon">{icon}</Box>

      <Typography variant="h6" sx={styles?.moduleCardTitle}>
        {title}
      </Typography>

      <Typography variant="body4" sx={styles?.moduleCardDesc}>
        {description}
      </Typography>
    </Box>
  );
};

export default ModuleCard;
