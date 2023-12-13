import { useState, useEffect } from 'react';
import 'firebase/firestore';
import { getChat, sendChatMessage } from 'services/firestore';

const ChatPage = () => {
    const [messages, setMessages] = useState([{ id: '', text: '' }]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Assumindo que você tem uma coleção 'messages' no Firestore
        async function buscarDados() {
            await getChat(setMessages)
        }
        buscarDados()
    }, []);

    const sendMessage = async () => {
        if (newMessage.trim() !== '') {
            await sendChatMessage(newMessage, setNewMessage)
        }
    };

    return (
        <div>
            <h1>Chat Room</h1>
            <div>
                {messages.map(message => (
                    <div key={message.id}>
                        <p>{message.text}</p>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatPage;
