import {
  BeginnerAwardImage,
  ExpertAwardImage,
  IntermediateAwardImage,
  MasterAwardImage,
  ProfessionalAwardImage,
} from '@/assets/images';
import { AGENT_LEVELS } from './strings';

export const AGENT_LEVELS_IMAGES = {
  [AGENT_LEVELS?.BEGINNER]: BeginnerAwardImage,
  [AGENT_LEVELS?.EXPERT]: ExpertAwardImage,
  [AGENT_LEVELS?.INTERMEDIATE]: IntermediateAwardImage,
  [AGENT_LEVELS?.MASTER]: MasterAwardImage,
  [AGENT_LEVELS?.PROFESSIONAL]: ProfessionalAwardImage,
};
