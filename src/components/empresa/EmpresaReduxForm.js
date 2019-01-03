import React  from 'react';
import axios from 'axios';
import { Field, reduxForm } from 'redux-form';
import { createTextMask } from 'redux-form-input-masks';

import { validarCNPJ } from '../../helpers/Validacoes'

const verificarCNPJ = (values /*, dispatch */) => {
    return  axios.get(`http://www.gilogbh.des.mg.caixa/api/empresa/${values.CNPJ}`)
            .then(res => {
                const dados = res.data;
                if(dados.NO_RAZAO_SOCIAL){
                    //throw { CNPJ: 'CNPJ já está cadastrado' }
                    let errorMessage =  { CNPJ: 'CNPJ já está cadastrado' };
                    throw errorMessage;
                }
            })   
}

const cnpjMask = createTextMask({
  pattern: '99.999.999/9999-99',
});

const validacoes = values => {
    const erros = {}

    if(!values.NU_CNPJ) {
        erros.NU_CNPJ = 'Obrigatório'
    } else if(!validarCNPJ(values.NU_CNPJ)) {
        erros.NU_CNPJ = 'CNPJ inválido'
    }

     if(!values.NO_RAZAO_SOCIAL) { erros.NO_RAZAO_SOCIAL = 'Obrigatório' }
     if(!values.NO_FANTASIA) { erros.NO_FANTASIA = 'Obrigatório' }
     if(!values.DE_ENDERECO) { erros.DE_ENDERECO = 'Obrigatório' }
     if(!values.DE_TELEFONE) { erros.DE_TELEFONE = 'Obrigatório' }
     if(!values.DE_EMAIL) { erros.DE_EMAIL = 'Obrigatório' }

    return erros
}


const renderField = ({
    input,
    label,
    type,
    meta: {asyncValidating, touched, error, warning}
}) => (
    <div>
        <label className="label-caixa-form" htmlFor={input.name}>{label}</label>
        <input {...input} id={input.name} placeholder={label} type={type || 'text'} className={touched ? (error ? "form-control form-control-sm is-invalid" : "form-control form-control-sm is-valid") : " form-control form-control-sm" }/>
        {touched && error && <div className="invalid-feedback">{error}</div>}
    </div>
)

let EmpresaForm = props => {
    const { handleSubmit, pristine, reset, submitting, exibicao, modal } = props
    
    return  <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="col-md-3 mb-3">
                        <Field name="NU_CNPJ" component={renderField} {...cnpjMask} label="NU_CNPJ" type="text" />
                    </div>
                    <div className="col-md-9 mb-3">
                        <Field name="NO_RAZAO_SOCIAL" component={renderField} label="Razão Social" type="text" required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-5 mb-3">
                        <Field name="NO_FANTASIA" component={renderField}  type="text" label="Nome Fantasia" required />
                    </div>
                    <div className="col-md-7 mb-3">
                        <Field name="DE_ENDERECO" component={renderField} label="Endereço completo"  type="text" required />
                    </div>
                </div>
                 <div className="form-row">
                    <div className="col-md-4 mb-3">
                        <Field name="DE_TELEFONE" component={renderField} label="Telefone(s)" type="text" required />
                    </div>
                    <div className="col-md-8 mb-3">
                        <Field name="DE_EMAIL" component={renderField}  type="email" label="E-mail" required />
                    </div>
                </div>
                <button className="btn btn-sm btn-primary mr-3" type="submit" disabled={submitting}>Enviar</button>
                <button className="btn btn-sm btn-default mr-3" type="button" disabled={pristine || submitting} onClick={reset}>Limpar</button>
                { exibicao === 'modal' ? <button className="btn btn-sm btn-info mr-3" type="button" disabled={submitting} onClick={modal.closeModal}>Fechar</button> : '' }
            </form>
}

EmpresaForm = reduxForm({
    form: 'empresa'
    ,validate: validacoes
    ,asyncValidate: verificarCNPJ
    ,asyncBlurFields: ['NU_CNPJ']
    ,asyncChangeFields: ['NU_CNPJ']
    ,enableReinitialize: true
})(EmpresaForm)

export default EmpresaForm;