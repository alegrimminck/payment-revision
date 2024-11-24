import { useState } from 'react';

export default function ResultsCard({ people, movements }) {
    const [aiResult, setAiResult] = useState('');
    const [loading, setLoading] = useState(false);

    const processPayments = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/process-payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ people, movements }),
            });

            const data = await response.json();
            setAiResult(data.result);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Results</h2>

            <button
                onClick={processPayments}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                disabled={loading}
            >
                {loading ? 'Processing...' : 'Process Payments'}
            </button>

            {aiResult && (
                <div className="prose">
                    <div dangerouslySetInnerHTML={{ __html: aiResult }} />
                </div>
            )}
        </div>
    );
} 