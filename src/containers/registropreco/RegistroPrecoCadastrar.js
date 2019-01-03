import React, { Component } from 'react';

import RegistroPrecoReduxForm from '../../components/registropreco/RegistroPrecoReduxForm'

export default class RegistroPrecoCadastrar extends Component {

    submit = values => {
        console.log(values);
    }

    render() {
        return (

            <div className="container-fluid">
                <div className="row">
                    <h3 className="titulo">Cadastrar Registro de Preço</h3>
                </div>
                 <div className="row justify-content-md-center">
                    <div className="col-md-8 order-md-2 mb-4">
                        <RegistroPrecoReduxForm onSubmit={this.submit} />
                    </div>
                 </div>
            </div>
        )
    }
}