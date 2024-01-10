import { Service_Interface } from "types/User"

export const alteraDados = (variavel: any, valor: any, dados: any, setDados: any) => {
  setDados({
    ...dados,
    [variavel]: valor
  })
}

export function regexTest(recebido: any, filtro:any) {
  const regex = new RegExp(filtro, 'i');
  return regex.test(recebido);
}

export function verificaSeTemEntradaVazia(dados: any, setDados: any) {
  for (const [variavel, valor] of Object.entries(dados)) {
    if (valor === '') {
      setDados({ ...dados, [variavel]: null })
      return true
    }
  }
  return false
}

export function timeout(delay: number) {
  return new Promise(res => setTimeout(res, delay));
}

export function validateEmail(email: string) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function verificarSolicitacaoValida(dados: Service_Interface) {
  if (dados.titulo === '') return 'Título está em branco!'
  if (dados.solicitante === '') return 'Solicitante está em branco!'
  if (dados.descricao === '') return 'A descrição está vazia!'
  if (dados.diaProcurado === '') return 'Nenhum dia está sendo procurado!'
  if (dados.horarioProcurado === '') return 'Escolha algum horário válido!'
  if (dados.freelancer === false && dados.autonomo === false) return 'Selecione pelo menos um tipo de especialista!'
  if (dados.cidade === '' || dados.estado === '' || dados.pais === '' || dados.endereco === '') return 'Endereço está inválido!'
  if (dados.cargos.length === 0) return 'Nenhuma Especialização foi passada como parâmetro!'
  return ''
}