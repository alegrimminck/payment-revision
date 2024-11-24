import { useState } from 'react';

export default function Chat() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const userMessage = { role: 'user', content: input };

        console.log('Attempting to send message:', {
            messages: [...messages, userMessage]
        });

        try {
            const res = await fetch('/api/claude', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [...messages, userMessage]
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(`API error: ${data.error || data.message || 'Unknown error'}`);
            }

            const assistantMessage = { role: 'assistant', content: data.content };
            setMessages([...messages, userMessage, assistantMessage]);
            setInput('');
        } catch (error) {
            console.error('Detailed error:', {
                message: error.message,
                type: typeof error,
                name: error.name,
                stack: error.stack
            });
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <div className="mb-4 space-y-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`p-4 rounded ${message.role === 'user'
                            ? 'bg-blue-100 ml-12'
                            : 'bg-gray-100 mr-12'
                            }`}
                    >
                        <p className="font-bold">{message.role === 'user' ? 'You' : 'Claude'}:</p>
                        <p>{message.content}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full p-2 border rounded"
                    rows="4"
                    placeholder="Type your message here..."
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                    {loading ? 'Sending...' : 'Send'}
                </button>
            </form>
        </div>
    );
}