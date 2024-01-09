import { auth } from "config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, AuthErrorCodes, sendPasswordResetEmail } from "firebase/auth";
import { cadastrarInfoUser } from "./firestore";


function errosFirebase(error: any) {
  let mensagem = '';
  switch (error.code) {
    case AuthErrorCodes.EMAIL_EXISTS:
      mensagem = "Esse E-mail já está em uso"
      break;
    case AuthErrorCodes.INVALID_EMAIL:
      mensagem = "E-mail inválido"
      break;
    case AuthErrorCodes.WEAK_PASSWORD:
      mensagem = "A senha precisa de no mínimo 6 caracteres"
      break;
    case AuthErrorCodes.INVALID_PASSWORD:
      mensagem = "Senha inválida"
      break;
    default:
      mensagem = error
  }
  return mensagem
}

export async function cadastrar(email: string, senha: string, data: any) {
  const resultado = await createUserWithEmailAndPassword(auth, email, senha)
    .then(async (dadosDoUsuario) => {
      const cadastrarInfo = await cadastrarInfoUser(data, dadosDoUsuario.user.uid)
      return cadastrarInfo
    })
    .catch((error) => {
      return errosFirebase(error)
    });
  return resultado;
}

export async function logar(email: string, senha: string) {
  const resultado = await signInWithEmailAndPassword(auth, email, senha)
    .then(() => {
      return "sucesso"
    })
    .catch(() => {
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