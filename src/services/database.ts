import { database } from "config/firebase";
import { child, push, set, ref, serverTimestamp, onValue } from "firebase/database";

export async function sendMessage(serviceId: string, message: string, user: string) {
    const id = push(child(ref(database), 'chats')).key
    set(ref(database, `chats/${serviceId}/${id}`), {
        enviadoPor: user, mensagem: message, timestamp: serverTimestamp()
    })
}

export async function getMessages(dbRef: string, setHistorico: any, setBackup: any) {
    const messagesRef = ref(database, dbRef);
    onValue(messagesRef, (snapshot) => {
        const messagesData: any[] = [];
        snapshot.forEach((childSnapshot) => {
            messagesData.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });
        setHistorico(messagesData);
    }, {
        // A opção 'onlyOnce: false' faz com que o ouvinte continue ativo após a primeira execução
        onlyOnce: false
    });
}
