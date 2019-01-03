
export const validarCNPJ = (cnpj) => {

    cnpj = cnpj.replace(/[^\d]+/g,'');

    if(cnpj === '') return false;
    
    if (cnpj.length !== 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    
    if (cnpj === "00000000000000" || 
        cnpj === "11111111111111" || 
        cnpj === "22222222222222" || 
        cnpj === "33333333333333" || 
        cnpj === "44444444444444" || 
        cnpj === "55555555555555" || 
        cnpj === "66666666666666" || 
        cnpj === "77777777777777" || 
        cnpj === "88888888888888" || 
        cnpj === "99999999999999")
        return false;
    

    let valida = [6,5,4,3,2,9,8,7,6,5,4,3,2];
    let dig1 = 0;
    let dig2 = 0;

    let digito1 = cnpj.charAt(12);
    let digito2 = cnpj.charAt(13);

    for(let i = 0; i<valida.length; i++){
        dig1 += (i>0? (cnpj.charAt(i-1)*valida[i]):0);
        dig2 += cnpj.charAt(i)*valida[i];
    }

    dig1 = (((dig1%11)<2)? 0:(11-(dig1%11)));
    dig2 = (((dig2%11)<2)? 0:(11-(dig2%11)));

    if(parseInt(digito1) !== parseInt(dig1) || parseInt(digito2) !== parseInt(dig2))
        return false;

    return true;
}