import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RegistroPrecoLista from '../../containers/registropreco/RegistroPrecoLista';

export default class RegistroPreco extends Component {

    render() {
        return (

            <div className="container-fluid">
                <div className="row">
                    <h3 className="titulo">Registro de Preço</h3>
                </div>
                 <div className="row">
                    <div className="col-sm-2">
                        <Link to="/registropreco/cadastrar" className="btn btn-sm btn-primary">Cadastrar</Link>
                    </div>
                    <div className="col-sm-10">
                         <div className="row">

                         </div>
                         <div className="row">
                            <RegistroPrecoLista />
                         </div>
                    </div>
                 </div>
            </div>
        )
    }
}