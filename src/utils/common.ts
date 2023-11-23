export const alteraDados = (variavel:any, valor:any, dados:any, setDados:any) => {
    setDados({
      ...dados,
      [variavel]: valor
    })
  }

export function verificaSeTemEntradaVazia(dados:any, setDados:any) {
    for(const [variavel, valor] of Object.entries(dados)){
      if(valor === '') {
        setDados({...dados, [variavel]: null})
        return true
      }
    }
    return false
  }