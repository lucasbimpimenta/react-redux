import React from 'react';
import Loadable from 'react-loadable'

function Loading() {
  return <div>Carregando...</div>;
}

const Inicio = Loadable({
  loader: () => import('./pages/inicio/Inicio.js'),
  loading: Loading,
});

const RegistroPreco = Loadable({
  loader: () => import('./pages/registropreco/RegistroPreco.js'),
  loading: Loading,
});

const RegistroPrecoCadastrar = Loadable({
  loader: () => import('./containers/registropreco/RegistroPrecoCadastrar.js'),
  loading: Loading,
});

const Rotas = [
    { path: '/', exact: true, name: 'Inicio', component: Inicio },
    { path: '/inicio', name: 'Início', component: Inicio },
    { 
        exact: true,
        path: '/registropreco/cadastrar',
        component: RegistroPrecoCadastrar,
        name: 'Novo Registro de Preço'
    },
    { 
        path: '/registropreco', 
        name: 'Registro de Preço', 
        component: RegistroPreco,
        routes: 
        [
            { 
                exact: true,
                path: '/registropreco/cadastrar',
                component: RegistroPrecoCadastrar,
                name: 'Novo Registro de Preço'
            }
        ]

    }
];

export default Rotas; 