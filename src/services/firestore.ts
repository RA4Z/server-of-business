import { db } from '../config/firebase';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { deletarImagem } from './storage';
import { deleteChat } from './database';

export async function infoUsuario(emailUser: string, setUser: any) {
  try {
    let usuario: any[] = []
    const userRef = collection(db, 'usuários');
    const q = query(userRef, where("email", "==", emailUser));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let info = { id: doc.id, ...doc.data() }
      usuario.push(info)
    });
    if (usuario[0] === undefined) return 'error'
    setUser(usuario[0])
  } catch (error) {
    return error
  }
}

export async function infoSolicitados(emailUser: string, setSolicitado: any) {
  try {
    let solicitar: any[] = []
    const userRef = collection(db, 'solicitados');
    const q = query(userRef, where("email", "==", emailUser));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let info = { id: doc.id, ...doc.data() }
      solicitar.push(info)
    });
    solicitar.sort((a, b) => (a.diaProcurado < b.diaProcurado) ? -1 : 1)
    setSolicitado(solicitar)
  } catch (error) {
    return 'error'
  }
}

export async function infoProjetosNaoContratados(emailUser: string, setSolicitado: any) {
  try {
    let solicitar: any[] = []
    const userRef = collection(db, 'solicitados');
    const q = query(userRef, where("email", "==", emailUser), where("idContratado", "==", ''));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let info = { id: doc.id, ...doc.data() }
      solicitar.push(info)
    });
    solicitar.sort((a, b) => (a.diaProcurado < b.diaProcurado) ? -1 : 1)
    setSolicitado(solicitar)
  } catch (error) {
    return 'error'
  }
}

export async function infoProjetosContratados(idUser: string, setSolicitado: any) {
  try {
    let solicitar: any[] = []
    const userRef = collection(db, 'solicitados');
    const q = query(userRef, where("idContratado", "==", idUser));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let info = { id: doc.id, ...doc.data() }
      solicitar.push(info)
    });
    solicitar.sort((a, b) => (a.diaProcurado < b.diaProcurado) ? -1 : 1)
    setSolicitado(solicitar)
  } catch (error) {
    return 'error'
  }
}

export async function salvarInfoUser(data: any) {
  try {
    const result = await addDoc(collection(db, 'usuários'), data)
    return result.id
  } catch (error) {
    return 'erro'
  }
}
export async function cadastrarSolicitacao(data: any) {
  try {
    const result = await addDoc(collection(db, 'solicitados'), data)
    return result.id
  } catch (error) {
    return 'erro'
  }
}

export async function atualizarInfoUser(userId: string, data: any) {
  try {
    const postRef = doc(db, "usuários", userId);
    await updateDoc(postRef, data)
    return 'ok'
  }
  catch (error) {
    return error
  }
}
export async function atualizarInfoService(serviceId: string, data: any) {
  try {
    const postRef = doc(db, "solicitados", serviceId);
    await updateDoc(postRef, data)
    return 'ok'
  }
  catch (error) {
    return 'error'
  }
}

export async function visualizarUsuarios(setUsers: any, setBackup?: any, estadoUser?: string) {
  if (estadoUser !== '') {
    const ref = query(collection(db, "usuários"), where('estado', '==', estadoUser))
    onSnapshot(ref, (querySnapshot) => {
      const users: any[] = []
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() })
      })
      setUsers(users)
      if (setBackup) setBackup(users)
    })
  } else {
    const ref = query(collection(db, "usuários"))
    onSnapshot(ref, (querySnapshot) => {
      const users: any[] = []
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() })
      })
      setUsers(users)
      if (setBackup) setBackup(users)
    })
  }
}
export async function visualizarSolicitados(setSolicitados: any, setBackup?: any, estadoUser?: string) {
  if (estadoUser !== '') {
    const ref = query(collection(db, "solicitados"), where('estado', '==', estadoUser), where('idContratado', '==', ''))
    onSnapshot(ref, (querySnapshot) => {
      const users: any[] = []
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() })
      })
      setSolicitados(users)
      if (setBackup) setBackup(users)
    })
  } else {
    const ref = query(collection(db, "solicitados"))
    onSnapshot(ref, (querySnapshot) => {
      const users: any[] = []
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() })
      })
      setSolicitados(users)
      if (setBackup) setBackup(users)
    })
  }
}


export async function infoUser(projetoID: any, setProjeto: any) {
  try {
    const ref = (await getDoc(doc(db, 'usuários', projetoID))).data()
    setProjeto(ref)
    return 'ok'
  }
  catch (error) {
    return 'error'
  }
}
export async function userInscrito(userID: string[], setProjeto: any) {
  try {
    const users: any[] = await Promise.all(userID.map(async (id) => {
      const ref = (await getDoc(doc(db, 'usuários', id)));
      return { id: ref.id, ...ref.data() };
    }));
    setProjeto(users);
    return 'ok';
  } catch (error) {
    return 'error';
  }
}

export async function infoSolicitado(projetoID: any, setProjeto?: any, info?: any) {
  try {
    const ref = (await getDoc(doc(db, 'solicitados', projetoID))).data()
    if (setProjeto) setProjeto(ref)
    return ref
  }
  catch (error) {
    if (info) return info
    return 'error'
  }
}

export async function deletarSolicitacao(projetoID: string) {
  try {
    const result = await deletarImagem(`${projetoID}-serviceIMG.png`, 'services')
    const postRef = doc(db, "solicitados", projetoID);
    if (result) {
      const chat = await deleteChat(projetoID)
      if (chat) {
        await deleteDoc(postRef)
        return 'ok'
      }
    }
    return 'error'
  }
  catch (error) {
    return 'error'
  }
}
