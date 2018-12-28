import React, { Component } from 'react';
import LayoutPrimario from './layouts/Primario'

import './App.css';
import './css/bootstrap/dist/bootstrap.min.css';
import './css/bootstrap/dist/themes/cosmo.css';
import './css/bootstrap/dist/themes/novo-condensed.css';
import './css/index.css';

class App extends Component {
  render() {
    return (
      <LayoutPrimario/>
    );
  }
}

export default App;
