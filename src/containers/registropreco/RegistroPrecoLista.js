import React, { Component } from 'react';
import RegistroPrecoLinha from '../../components/registropreco/RegistroPrecoLinha';

export default class RegistroPrecoLista extends Component {

    constructor() {
        super();
        this.state = {registrosPreco:[]};
    }

    componentDidMount(){

        fetch('http://www.gilogbh.des.mg.caixa/api/registroPreco/')
        .then(response => response.json())
        .then(registrosPreco => {
            this.setState({registrosPreco:registrosPreco});
        });
    }

    render() {
        return (
            <div className="col-sm-12">
                <div className="list-group">
                    { this.state.registrosPreco.map(rp => <RegistroPrecoLinha key={rp.NU_ID} rp={rp}/>) }
                </div>
            </div>
        )
    }
}