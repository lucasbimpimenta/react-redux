/*
import someAPI from '../services/someAPI';
export const GET_CUSTOMER = 'GET_CUSTOMER';
export const getCustomer = customerId => ({
type: GET_CUSTOMERS,
payload: someAPI.get(`customers/${customerId}`)
});
*/

import empresas from '../services/EmpresaApi';

export const GET_EMPRESA = 'GET_EMPRESA';

export const getEmpresa = empresa_cpj => ({
    type: GET_EMPRESA,
    payload: empresas.get(empresa_cpj)
});