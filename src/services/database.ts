import { database } from "config/firebase";
import { child, push, set, ref, serverTimestamp, query, get, DataSnapshot } from "firebase/database";

export async function sendMessage(serviceId: string, message: string, user: string) {
    const id = push(child(ref(database), 'chats')).key
    set(ref(database, `chats/${serviceId}/${id}`), {
        enviadoPor: user, mensagem: message, timestamp: serverTimestamp()
    })
}

export async function getMessages(dbRef: string, setHistorico: any, setBackup: any) {
    try {
        const messagesRef = ref(database, dbRef);
        const messagesSnapshot = await get(query(messagesRef));
        const messagesData: any[] = [];

        if (messagesSnapshot.exists()) {
            messagesSnapshot.forEach((childSnapshot: DataSnapshot) => {
                messagesData.push({ id: childSnapshot.key, ...childSnapshot.val() });
            });
            setBackup(messagesData)
            setHistorico(messagesData);
            return messagesData;
        } else {
            return 'Nenhum dado encontrado';
        }
    } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
        return 'Erro ao buscar mensagens';
    }
}
