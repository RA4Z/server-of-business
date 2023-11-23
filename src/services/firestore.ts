import { db } from '../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export async function infoUsuario(emailUser: string) {
    try {
        let usuario: any[] = []
        const userRef = collection(db, 'usuários');
        const q = query(userRef, where("email", "==", emailUser));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let info = { id: doc.id, ...doc.data() }
            usuario.push(info)
        });
        return usuario
    } catch (error) {
        console.log(error)
        //return 'error'
    }
}
