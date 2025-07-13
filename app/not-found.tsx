import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const NotFound = () => {
  return (
    <Grid
      container
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      id='not-found'
      sx={{ height: '750px' }}
    >
      <Grid>
        <Typography variant='h2' align='center'>
          Не найдено!
        </Typography>
      </Grid>
      <Grid sx={{ mt: 5 }}>
        <Typography variant='h6' align='center'>
          Не возможно найти запрашиваемый ресурс!!
        </Typography>
      </Grid>
      <Grid sx={{ mt: 5 }}>
        <Link href='/'>На главную</Link>
      </Grid>
    </Grid>
  );
};

export default NotFound;
