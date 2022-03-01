export const requiredMessage = 'Campo obrigatório'
export const invalidEmailMessage = 'E-mail inválido'
export const tamanhoMessage = (min?: number | null, max?: number) => {
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