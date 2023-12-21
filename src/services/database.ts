import { database } from "config/firebase";
import { child, push, set, ref, serverTimestamp, onValue, limitToLast, query, remove, get } from "firebase/database";

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


export async function deleteChat(serviceId: string) {
    const chatRef = ref(database, `chats/${serviceId}`);
    const result = await remove(chatRef)
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

export async function faleConosco(texto: string, email: string) {
    const id = push(child(ref(database), 'conosco')).key
    set(ref(database, `conosco/${id}`), {
        email: email, texto: texto, timestamp: serverTimestamp()
    })
}

export async function sendNotification(userId: string, titulo: string, descricao: string, tipo: string) {
    const id = push(child(ref(database), `notifications/${userId}`)).key
    set(ref(database, `notifications/${userId}/${id}`), {
        titulo: titulo, descricao: descricao, tipo: tipo, timestamp: serverTimestamp()
    })
}

export async function getNotifications(userId: string, setNotifica: any) {
    try {
        const messagesRef = ref(database, `notifications/${userId}`);
        const limitedMessagesQuery = query(messagesRef, limitToLast(30)); // Limitando para buscar apenas as últimas 30 notificações

        const snapshot = await get(limitedMessagesQuery); // Obtém os dados uma vez

        const messagesData: any[] = [];
        snapshot.forEach((childSnapshot) => {
            messagesData.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });
        setNotifica(messagesData);
        return messagesData
    } catch (error) {
        console.error('Erro ao buscar as últimas notificações:', error);
        return []
    }
}

export async function deleteNotification(userId: string, notificationId: string) {
    const notifyRef = ref(database, `notifications/${userId}/${notificationId}`);
    const result = await remove(notifyRef)
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

