import React  from 'react';
import axios from 'axios';

import AsyncSelect from 'react-select/lib/Async';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { createNumberMask } from 'redux-form-input-masks';

import { mascaraCnpj } from '../../helpers/Formatadores'

import EmpresaModal from '../../containers/empresa/EmpresaModal'

import { load as carregarRP } from '../../actions/registropreco.actions'

const validacoesRP = values => {
    const erros = {}
    
    if(!values.NU_CNPJ) { erros.NU_CNPJ = 'Obrigatório' }
    if(!values.CO_PROCESSO) { erros.CO_PROCESSO = 'Obrigatório' }
    if(!values.CO_PREGAO) { erros.CO_PREGAO = 'Obrigatório' }
    if(!values.CO_ATA) { erros.CO_ATA = 'Obrigatório' }
    if(!values.DT_INICIO) { erros.DT_INICIO = 'Obrigatório' }
    if(!values.DT_TERMINO) { erros.DT_TERMINO = 'Obrigatório' }

    if(values.VR_BDI < 0 || values.VR_BDI > 100) {
        erros.VR_BDI = 'Inválido (0-100)'
    }

     if(values.VR_MOBILIZACAO < 0 || values.VR_MOBILIZACAO > 100) {
        erros.VR_MOBILIZACAO = 'Inválido (0-100)'
    }

    return erros
}

const mask100Percent = createNumberMask({
    prefix: '',
    suffix: '%',
    decimalPlaces: 0,
    multiplier: 1,
    allowEmpty: false,
    allowNegative: false,
    showPlusSign: false,
    spaceAfterSign: false,
    stringValue: false
})

const promiseOptions = inputValue => axios('http://www.gilogbh.des.mg.caixa/api/empresa/')
.then(res => {
                let empresas = res.data;
                let dados = [];
                empresas.map(empresa => dados.push({'label': mascaraCnpj(empresa.NU_CNPJ) + ' - ' + empresa.NO_RAZAO_SOCIAL, 'value': empresa.NU_CNPJ}));
                return dados;
});

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

const renderSelectEmpresa = ({
    input,
    label,
    type,
    meta: {touched, error, warning}
}) => (
    <div>
        <label className="label-caixa-form" htmlFor={input.name}>{label}</label>
        <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={promiseOptions}
            {...input} 
            placeholder={label}
            onChange={input.onChange}
            onBlur={() => input.onBlur(input.value)}
            className={error ? "is-invalid" : "is-valid" }
            //value={{value: input.value}}
            filterOption={() => (true)}
            noOptionsMessage="Nenhuma empresa carregada"
        />
        {touched && error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
)

let RegistroPrecoForm = props => {
    const { handleSubmit, load, pristine, reset, submitting } = props
    return  <form onSubmit={handleSubmit}>
                <fieldset className="form-group fieldset-caixa">
                    <legend className="legend-caixa">Dados Gerais</legend>
                    <div className="form-row">
                        <div className="col-md-11 mb-3">
                            <Field name="NU_CNPJ" component={renderSelectEmpresa} label="Empresa" type="select" required  />
                        </div>
                        <div className="col-md-1 mb-3">
                            <label className="label-caixa-form">&nbsp;</label>
                            <EmpresaModal onSuccess={load} />
                        </div>
                        
                    </div>
                    <div className="form-row">
                        <div className="col-md-2 mb-3">
                            <Field name="CO_PROCESSO" component={renderField} label="Processo" type="text" required />
                        </div>
                        <div className="col-md-2 mb-3">
                            <Field name="CO_PREGAO" component={renderField} label="Pregão"  type="text" required />
                        </div>
                        <div className="col-md-2 mb-3">
                            <Field name="CO_ATA" component={renderField}  label="Ata" type="text" required />
                        </div>
                        <div className="col-md-2 mb-3">
                            <Field name="DT_INICIO" component={renderField} label="Início" type="date" required />
                        </div>
                        <div className="col-md-2 mb-3">
                            <Field name="DT_TERMINO" component={renderField} label="Término" type="date" required />
                        </div>
                        <div className="col-md-1 mb-3">
                            <Field name="VR_BDI" component={renderField} label="BDI" type="text" {...mask100Percent} required />
                        </div>
                        <div className="col-md-1 mb-3">
                            <Field name="VR_MOBILIZACAO" component={renderField} label="Mobilização" type="text" {...mask100Percent} required />
                        </div>
                    </div>
                </fieldset>
                 <fieldset className="form-group fieldset-caixa">
                    <legend className="legend-caixa">Região / Municípios</legend>
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label className="label-caixa-form" htmlFor="NO_SIGLA">Região</label>

                            <div className="valid-feedback">
                                Válido
                            </div>
                            <div className="invalid-feedback">
                                Inválido
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label className="label-caixa-form" htmlFor="NO_SIGLA">Município</label>

                            <div className="valid-feedback">
                                Válido
                            </div>
                            <div className="invalid-feedback">
                                Inválido
                            </div>
                        </div>
                    </div>
                </fieldset>
                <button className="btn btn-sm btn-primary mr-3" type="submit" disabled={submitting}>Enviar</button>
                <button className="btn btn-sm btn-default" type="button" disabled={pristine || submitting} onClick={reset}>Limpar</button>
            </form>
}

RegistroPrecoForm = reduxForm({
    form: 'registropreco'
    ,validate: validacoesRP
    ,enableReinitialize: true
})(RegistroPrecoForm)

RegistroPrecoForm = connect(
    state => ({
        initialValues: state.registropreco_reducer.data // pull initial values from account reducer
    }),
    { load: carregarRP } // bind account loading action creator
)(RegistroPrecoForm)

export default RegistroPrecoForm;