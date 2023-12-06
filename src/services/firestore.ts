import { db } from '../config/firebase';
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';

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
    setUser(usuario[0])
  } catch (error) {
    console.log(error)
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
    setSolicitado(solicitar)
  } catch (error) {
    console.log(error)
  }
}

export async function salvarInfoUser(data: any) {
  try {
    const result = await addDoc(collection(db, 'usuários'), data)
    return result.id
  } catch (error) {
    console.log('Erro add post:', error)
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
    console.log(error)
    return 'error'
  }
}

export async function visualizarUsuarios(setUsers: any, setBackup?: any) {
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
export async function visualizarSolicitados(setSolicitados: any, setBackup?: any) {
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


export async function infoUser(projetoID: any, setProjeto: any) {
  try {
    const ref = (await getDoc(doc(db, 'usuários', projetoID))).data()
    setProjeto(ref)
    return 'ok'
  }
  catch (error) {
    console.log(error)
    return 'error'
  }
}
export async function infoSolicitado(projetoID: any, setProjeto?: any, info?: any) {
  try {
    const ref = (await getDoc(doc(db, 'solicitados', projetoID))).data()
    if (setProjeto) setProjeto(ref)
    return ref
  }
  catch (error) {
    console.log(error)
    if (info) return info
    return 'error'
  }
}

export async function userInscrito(userID: string[], setProjeto: any) {
  try {
    const users: any[] = await Promise.all(userID.map(async (id) => {
      const ref = (await getDoc(doc(db, 'usuários', id))).data();
      return ref;
    }));
    setProjeto(users);
    return 'ok';
  } catch (error) {
    console.log(error);
    return 'error';
  }
}
