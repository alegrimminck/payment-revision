export default function BankMovementsCard() {
    const handleProcessPayments = async () => {
        const inputText = document.getElementById('inputText').value;

        try {
            const response = await fetch('/api/process-payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: inputText }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to process payments');
            }

            alert('Payments processed successfully');
        } catch (error) {
            console.error('Error processing payments:', error);
            alert('Error processing payments');
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow w-1/3">
            <textarea
                id="inputText"
                className="w-full h-3/4 border p-2 rounded"
                placeholder="Enter your prompt here..."
            />
            <button onClick={handleProcessPayments}>Process Payments</button>
        </div>
    );
} 