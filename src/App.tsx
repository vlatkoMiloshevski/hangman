import { Grid } from '@mui/material';
import './App.less';
import Hangman from './hangman/hangman';

function App() {
  return (
    <Grid container item xs={12}>
      <Hangman></Hangman>
    </Grid>
  );
}

export default App;
