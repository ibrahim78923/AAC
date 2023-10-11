import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent,  {
  timelineOppositeContentClasses,
}  from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import BorderColorIcon from '@mui/icons-material/BorderColor';
export default function ActivityTimeline() {
  return (
    <Timeline position="alternate"   sx={{
      [`& .${timelineOppositeContentClasses.root}`]: {
        flex: 0.2,
      },
    }}>
      <TimelineItem sx={{border:'1px solid red' , display:'flex', alignItems:'center', justifyContent:'center'}}>
        <TimelineOppositeContent sx={{border:'1px solid brown'}}
        >
          <Typography sx={{fontSize:'14px',border:'1px solid brown'}} component='span'>
            10:00 am
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator sx={{border:'1px solid orange'}}>
          <TimelineDot color="primary" variant="outlined">
            <BorderColorIcon sx={{fontSize:'14px'}}/>
          </TimelineDot>
          {/* <TimelineConnector sx={{ bgcolor: 'primary.main' , height:'2rem'}}/> */}
        </TimelineSeparator>
        <TimelineContent>
          <Typography sx={{fontSize:'14px', border:'1px solid purple'}}>
            Code
          </Typography>
        </TimelineContent>
      </TimelineItem>
      
      <TimelineConnector sx={{ bgcolor: 'primary.main' , height:'2rem' }} />

      <TimelineItem sx={{border:'1px solid blue'}}>
      <TimelineOppositeContent
        >
            <Typography>
            Sleep
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          {/* <TimelineConnector sx={{ bgcolor: 'primary.main' , height:'2rem'}} /> */}
          <TimelineDot color="primary" variant="outlined">
            <BorderColorIcon />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent >
          <Typography>Because you need rest</Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}