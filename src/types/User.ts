export interface User_Interface {
    id: any,
    email: string,
    nome: string,
    estrelas: number,
    cargos: string[],
    estado: string,
    avatar: string,
    pais: string,
    descricao: string,
    telefone: string,
    autonomo: boolean,
    freelancer: boolean
    setInfoUser: any
}
export interface Service_Interface {
    id: any,
    titulo: string,
    solicitante: string,
    descricao: string,
    premium: boolean,
    imagem: string,
    idContratado: any,
    horarioProcurado: string,
    diaProcurado: string,
    data: string,
    email: string,
    cidade: string,
    freelancer: boolean,
    autonomo: boolean,
    inscritos: string[],
    cargos: string[]
}