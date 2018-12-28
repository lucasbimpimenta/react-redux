import React, { Component } from 'react';

import Menu from './Menu.js';

export default class Topo extends Component {

    render() {
        return (
            <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark bg-primary bg-caixa-2017">
                <a className="navbar-brand logo_caixa" href="/">&nbsp;</a>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <Menu/>
                </div> 
            </nav>
        )
    }
}