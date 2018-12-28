import React from 'react';
import Loadable from 'react-loadable'

function Loading() {
  return <div>Carregando...</div>;
}

const Inicio = Loadable({
  loader: () => import('./pages/inicio/Inicio.js'),
  loading: Loading,
});

const Rotas = [
    { path: '/', exact: true, name: 'Inicio', component: Inicio },
    { path: '/inicio', name: 'Início', component: Inicio }
];

export default Rotas; 