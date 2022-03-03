export const requiredMessage = 'Campo obrigatório'
export const invalidEmailMessage = 'E-mail inválido'
export const isNumericMessage = 'Campo precisa ser um número'
export const invalidMessage = 'Valor informado inválido'
export const uniqueMessage = 'Já existe um registro com esse valor'

export const fieldSizeMessage = (min?: number | null, max?: number) => {
    if(min && max){
        return `Este campo precisa conter entre ${min} e ${max} caracteres`
    }
    if(min){
        return `Este campo precisa conter pelo menos ${min} caracteres`
    }
    if(max){
        return `Este campo pode conter até ${max} caracteres`
    }
}