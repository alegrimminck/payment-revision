import { useState } from 'react';

export default function AddPeopleCard() {
    const [people, setPeople] = useState([]);
    const [newPerson, setNewPerson] = useState({ name: '', info: '' });

    const handleAddPerson = () => {
        if (newPerson.name && newPerson.info) {
            setPeople([...people, newPerson]);
            setNewPerson({ name: '', info: '' }); // Reset form
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Assuming you have a state variable for people
        const response = await fetch('/api/process-payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                people: people, // your people array/object
                movements: movements // your movements array/object
            }),
        });

        const data = await response.json();
        // Handle the response...
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Add People</h2>

            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={newPerson.name}
                    onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
                    className="border rounded p-2"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newPerson.info}
                    onChange={(e) => setNewPerson({ ...newPerson, info: e.target.value })}
                    className="border rounded p-2 flex-1"
                />
                <button
                    onClick={handleAddPerson}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Person
                </button>
            </div>

            <div className="space-y-2">
                {people.map((person, index) => (
                    <div key={index} className="flex justify-between border-b py-2">
                        <span className="font-medium">{person.name}</span>
                        <span className="text-gray-600">{person.info}</span>
                    </div>
                ))}
            </div>
        </div>
    );
} 