import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Denied() {
  return (
    <Grid
      container
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      id='denied'
      sx={{ height: '750px' }}
    >
      <Grid>
        <Typography variant='h2' align='center'>
          Access Denied (Доступ запрещен)
        </Typography>
      </Grid>
      <Grid sx={{ mt: 5 }}>
        <Typography variant='h6' align='center'>
          Вы вошли в систему, но у вас нет необходимого уровня доступа для
          просмотра этой страницы.
        </Typography>
      </Grid>
      <Grid sx={{ mt: 5 }}>
        <Link href='/'>На главную</Link>
      </Grid>
    </Grid>
  );
}
