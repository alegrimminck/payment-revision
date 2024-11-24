export default async function handler(req, res) {
    console.log('Starting API handler');

    try {
        if (!req.method === 'POST') {
            return res.status(405).json({ error: 'Method not allowed' });
        }

        console.log('Request body:', req.body);

        const userMessage = req.body.messages[req.body.messages.length - 1];

        console.log('Processing message:', userMessage);

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: userMessage.content
                            }]
                        }]
                    })
                }
            );

            const data = await response.json();
            console.log('Response from Gemini:', data);

            if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
                throw new Error('Invalid response from Gemini API');
            }

            return res.status(200).json({
                content: data.candidates[0].content.parts[0].text
            });

        } catch (apiError) {
            console.error('Gemini API Error:', {
                message: apiError.message,
                response: apiError.response
            });

            return res.status(500).json({
                error: 'Gemini API Error',
                details: apiError.message
            });
        }

    } catch (error) {
        console.error('Server Error:', {
            message: error.message,
            stack: error.stack
        });

        return res.status(500).json({
            error: error.message || 'Internal Server Error'
        });
    }
} 