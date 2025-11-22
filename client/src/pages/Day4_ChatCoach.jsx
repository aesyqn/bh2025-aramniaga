import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { aiAPI, userAPI } from '../utils/api';
import Header from '../components/Header';
import ChatBubble from '../components/ChatBubble';
import Button from '../components/Button';
import { Send } from 'lucide-react';

const Day4_ChatCoach = () => {
    const { user, updateUser } = useAuth();
    const [messages, setMessages] = useState([
        { text: "Barang saya rosak! Saya nak refund sekarang!!! 😡", isUser: false }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
        setInput('');
        setLoading(true);

        try {
            const response = await aiAPI.chatCoach({
                message: userMessage,
                scenario: "angry_customer_refund"
            });

            setFeedback(response.data);
            setMessages(prev => [...prev, {
                text: `[AI Feedback]: Grade ${response.data.grade}. ${response.data.feedback}`,
                isUser: false
            }]);

            await userAPI.updateProgress(4);
            updateUser({ progress: Math.max(user.progress, 5) });
        } catch (error) {
            console.error('Error getting coaching:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <Header title="Hari 4: Chat Coach" showBack />

            <div className="flex-1 overflow-y-auto p-4 pb-20">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-sm text-yellow-800">
                    <strong>Situasi:</strong> Pelanggan marah sebab barang rosak. Cuba balas dengan tenang dan profesional.
                </div>

                {messages.map((msg, index) => (
                    <ChatBubble key={index} message={msg.text} isUser={msg.isUser} />
                ))}

                {loading && (
                    <div className="flex justify-start mb-4">
                        <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-gray-500 text-sm italic animate-pulse">
                            AI sedang menyemak jawapan anda...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe">
                <form onSubmit={handleSend} className="flex gap-2 max-w-[480px] mx-auto">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Tulis balasan anda..."
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-teal-500 outline-none"
                        disabled={loading || feedback}
                    />
                    <Button type="submit" disabled={loading || !input.trim() || feedback} size="sm" className="px-4">
                        <Send size={20} />
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Day4_ChatCoach;
