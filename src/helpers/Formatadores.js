
export const mascaraCnpj = (valor) => {
    valor = '00000000000000' + valor;
    return valor.slice(-14).replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"$1.$2.$3/$4-$5");
}