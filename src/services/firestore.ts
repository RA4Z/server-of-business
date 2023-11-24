import { db } from '../config/firebase';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

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

export async function salvarInfoUser(data: any) {
    try {
        const result = await addDoc(collection(db, 'usuários'), data)
        return result.id
    } catch (error) {
        console.log('Erro add post:', error)
        return 'erro'
    }
}
