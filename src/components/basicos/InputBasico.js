import React, { Component } from 'react';

export default class InputBasico extends Component {

    render() {
        return (
            <div>
                <label className="label-caixa-form" htmlFor={this.props.id}>{this.props.label}</label>
                <input type={this.props.type || 'text'} {...this.props} className="form-control form-control-sm"/>
                <div className="valid-feedback">
                    Válido
                </div>
                <div className="invalid-feedback">
                    Inválido
                </div>
            </div>
        )
    }
}