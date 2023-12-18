import { database } from "config/firebase";
import { child, push, set, ref, serverTimestamp, onValue, limitToLast, query } from "firebase/database";

export async function sendMessage(serviceId: string, message: string, user: string) {
    const id = push(child(ref(database), 'chats')).key
    set(ref(database, `chats/${serviceId}/${id}`), {
        enviadoPor: user, mensagem: message, timestamp: serverTimestamp()
    })
}

export async function getMessages(dbRef: string, setHistorico: any) {
    try {
        const messagesRef = ref(database, dbRef);
        const limitedMessagesQuery = query(messagesRef, limitToLast(30)); // Limitando para buscar apenas as últimas 30 mensagens

        onValue(limitedMessagesQuery, (snapshot) => {
            const messagesData: any[] = [];
            snapshot.forEach((childSnapshot) => {
                messagesData.push({ id: childSnapshot.key, ...childSnapshot.val() });
            });
            setHistorico(messagesData);
        });
    } catch (error) {
        console.error('Erro ao buscar as últimas mensagens:', error);
    }
}
