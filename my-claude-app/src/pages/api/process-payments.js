import { getAIResponse } from './gemini';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { people, bankMovements } = req.body;

        // Validate the input data
        if (!people || !bankMovements) {
            return res.status(400).json({ error: 'Missing people or bank movements data' });
        }

        try {
            // Send data to the Gemini API
            const response = await fetch('https://gemini.api/endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ people, bankMovements }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to process payments');
            }

            res.status(200).json({ message: 'Payments processed successfully', data });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
} 