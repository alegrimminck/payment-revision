import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();
      if (data.content) {
        setResult(data.content);
      } else {
        throw new Error('No content in response');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error processing your request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto ">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-4 border rounded text-black min-h-[250px] bg-blue-100"
          placeholder="Enter your prompt here..."
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Processing...' : 'Send to Gemini'}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow">
          <h2 className="font-bold mb-2 text-black">AI Response:</h2>
          <div className="prose max-w-none whitespace-pre-wrap text-black">{result}</div>
        </div>
      )}
    </div>
  );
}
