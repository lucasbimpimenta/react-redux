import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import Rotas from '../Rotas';

import Topo from '../components/basicos/Topo.js';
import Breadcrumb from '../components/basicos/Breadcrumb.js';

class LayoutPrimario extends Component {

    render() {
        return (
            <div className="App">
                <Topo/>
                <div className="app-body">
                    <main className="main">
                        <Breadcrumb/>   
                        <Switch>       
                            {Rotas.map((route, idx) => {
                                /*
                                console.log(route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                                    <route.component {...props} />
                                )} />)
                                : (null));
                                */
                                return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                                    <route.component {...props} />
                                )} />)
                                : (null);
                            },
                            )}
                            <Redirect from="/" to="/inicio" />   
                        </Switch>
                    </main>
                </div>
            </div>
        )
    }
}

export default LayoutPrimario;