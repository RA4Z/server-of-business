import { database } from "config/firebase";
import { child, push, set, ref, serverTimestamp } from "firebase/database";

export async function sendMessage(serviceId: string, message: string, user: string) {
    console.log(user)
    const id = push(child(ref(database), 'chats')).key
    set(ref(database, `chats/${serviceId}/${id}`), {
        enviadoPor: user, messagem: message, timestamp: serverTimestamp()
    })
}