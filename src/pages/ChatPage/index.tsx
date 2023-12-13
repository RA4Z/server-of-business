import { useState, useEffect } from 'react';
import 'firebase/firestore';
import { getChat, sendChatMessage } from 'services/firestore';
import styles from './ChatPage.module.scss';
import { User_Interface } from 'types/User';

function ChatPage(usuarioLogado: User_Interface) {
    const [chatAtual, setChatAtual] = useState('')
    const [messages, setMessages] = useState([{ id: '', text: '', chat: '', sendBy: '' }]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        async function buscarDados() {
            await getChat(setMessages)
        }
        buscarDados()
    }, []);

    const sendMessage = async () => {
        if (newMessage.trim() !== '') {
            await sendChatMessage(newMessage, setNewMessage, chatAtual, usuarioLogado.email)
        }
    };

    return (
        <>
            {chatAtual === '' ?
                ''
                :
                <div className={styles.chatContainer}>
                    <h1 className={styles.chatHeader}>Chat Room</h1>
                    <div className={styles.messageContainer}>
                        {messages.map(message => (
                            <div key={message.id} className={styles.message}>
                                <p>{message.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className={styles.inputContainer}>
                        <input
                            className={styles.messageInput}
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                        />
                        <button className={styles.sendButton} onClick={sendMessage}>Enviar</button>
                    </div>
                </div>}
        </>
    );
};

export default ChatPage;
