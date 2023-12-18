import { auth } from "config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, AuthErrorCodes, sendPasswordResetEmail } from "firebase/auth";


function errosFirebase(error: any) {
  let mensagem = '';
  switch (error.code) {
    case AuthErrorCodes.EMAIL_EXISTS:
      mensagem = "Esse E-mai já está em uso"
      break;
    case AuthErrorCodes.INVALID_EMAIL:
      mensagem = "E-mail inválido"
      break;
    case AuthErrorCodes.WEAK_PASSWORD:
      mensagem = "A senha precisa de no mínimo 6 caracteres"
      break;
    default:
      mensagem = "Erro desconhecido"
  }
  return mensagem
}

export async function cadastrar(email: string, senha: string) {
  const resultado = await createUserWithEmailAndPassword(auth, email, senha)
    .then((dadosDoUsuario) => {
      console.log(dadosDoUsuario)
      return "sucesso"
    })
    .catch((error) => {
      console.log(error)
      return errosFirebase(error)
    });
  return resultado;
}

export async function logar(email: string, senha: string) {
  const resultado = await signInWithEmailAndPassword(auth, email, senha)
    .then((dadosDoUsuario) => {
      console.log(dadosDoUsuario)
      return "sucesso"
    })
    .catch((error) => {
      console.log(error)
      return "erro"
    });
  return resultado;
}

export async function emailRedefinirSenha(email: string) {
  const result = await sendPasswordResetEmail(auth, email)
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    });
  if (result) {
    return true
  } else {
    return false
  }
}