interface ResponseInterface {
    status: Boolean, 
    mensagem: String | null,
    dados: Array<any> | Object | null,
    erros: Array<any> | null
}

class ApiResponse {
    constructor(
        status: Boolean, 
        mensagem: String | null,
        dados: Array<any> | Object | null,
        erros: Array<any> | null
        )
        {
            const resposta: ResponseInterface = {status, mensagem, dados, erros};
            return resposta;
    
        }
}
export {ApiResponse}