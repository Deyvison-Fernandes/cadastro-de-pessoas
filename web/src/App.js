import React from 'react';
import ListaPessoas from './components/ListaPessoas';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './App.css';

function App() {  
  return (
    <>
      <AppBar position="static" className="app-bar">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Cadastro de pessoas físicas e jurídicas
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" className="container-main">
        <ListaPessoas />
      </Container>
    </>
  );
}

export default App;
