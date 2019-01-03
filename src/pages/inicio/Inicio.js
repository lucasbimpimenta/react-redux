import React, { Component } from 'react';

import EmpresaForm from '../../components/empresa/EmpresaReduxForm'

export default class Inicio extends Component {

    submit = values => {
        console.log(values);
    }

    render() {
        return (
            <div><EmpresaForm onSubmit={this.submit}/></div>
        )
    }
}
