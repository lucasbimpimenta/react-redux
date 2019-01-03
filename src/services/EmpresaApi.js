import axios from 'axios';

import { getEmpresa } from '../actions/empresa.actions';

export default class EmpresaApi {

    static get(cnpj) {

        return dispatch => {
            axios.get(`http://www.gilogbh.des.mg.caixa/api/empresa/${cnpj}`)
            .then(res => {
                const dados = res.data;
                if(dados.NO_RAZAO_SOCIAL) {
                    dispatch(getEmpresa(dados));
                } else {
                    dispatch(getEmpresa(false));
                }
            })    
        }
    }

    static salvar(dados) {
        return axios.post(`http://www.gilogbh.des.mg.caixa/api/empresa/`, dados);
    }
}