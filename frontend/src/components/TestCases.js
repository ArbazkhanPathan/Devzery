import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './assets/styles.css';

const TestCases = () => {
    const [testCases, setTestCases] = useState([]);
    const [newTestCase, setNewTestCase] = useState({ name: '', estimate_time: '', module: '', priority: '', status: '' });
    const [editingTestCase, setEditingTestCase] = useState(null);

    useEffect(() => {
        fetchTestCases();
    }, []);

    const fetchTestCases = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/testcases');
            setTestCases(response.data);
        } catch (error) {
            console.error('There was an error fetching the test cases!', error);
        }
    };

    const handleCreate = async () => {
        try {
            await axios.post('http://127.0.0.1:5000/testcases', newTestCase);
            setNewTestCase({ name: '', estimate_time: '', module: '', priority: '', status: '' });
            fetchTestCases();
        } catch (error) {
            console.error('There was an error creating the test case!', error);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://127.0.0.1:5000/testcases/${editingTestCase.id}`, editingTestCase);
            setEditingTestCase(null);
            fetchTestCases();
        } catch (error) {
            console.error('There was an error updating the test case!', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/testcases/${id}`);
            fetchTestCases();
        } catch (error) {
            console.error('There was an error deleting the test case!', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTestCase(prevState => ({ ...prevState, [name]: value }));
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingTestCase(prevState => ({ ...prevState, [name]: value }));
    };

    const startEditing = (testCase) => {
        setEditingTestCase(testCase);
    };

    return (
        <div className="container">
            <h1>Test Cases</h1>
            <table>
                <thead>
                    <tr>
                        <th>Test Case Name</th>
                        <th>Estimate Time</th>
                        <th>Module</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {testCases.map(testCase => (
                        <tr key={testCase.id}>
                            <td>{testCase.name}</td>
                            <td>{testCase.estimate_time}</td>
                            <td>{testCase.module}</td>
                            <td>{testCase.priority}</td>
                            <td>{testCase.status}</td>
                            <td>
                                <button onClick={() => startEditing(testCase)}>Edit</button>
                                <button onClick={() => handleDelete(testCase.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editingTestCase ? (
                <div>
                    <h2>Edit Test Case</h2>
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                        <div className="form-group">
                            <input name="name" value={editingTestCase.name} onChange={handleEditChange} placeholder="Test Case Name" />
                        </div>
                        <div className="form-group">
                            <input name="estimate_time" value={editingTestCase.estimate_time} onChange={handleEditChange} placeholder="Estimate Time" />
                        </div>
                        <div className="form-group">
                            <input name="module" value={editingTestCase.module} onChange={handleEditChange} placeholder="Module" />
                        </div>
                        <div className="form-group">
                            <input name="priority" value={editingTestCase.priority} onChange={handleEditChange} placeholder="Priority" />
                        </div>
                        <div className="form-group">
                            <input name="status" value={editingTestCase.status} onChange={handleEditChange} placeholder="Status" />
                        </div>
                        <button type="submit">Update</button>
                        <button onClick={() => setEditingTestCase(null)}>Cancel</button>
                    </form>
                </div>
            ) : (
                <div>
                    <h2>Add New Test Case</h2>
                    <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
                        <div className="form-group">
                            <input name="name" value={newTestCase.name} onChange={handleChange} placeholder="Test Case Name" />
                        </div>
                        <div className="form-group">
                            <input name="estimate_time" value={newTestCase.estimate_time} onChange={handleChange} placeholder="Estimate Time" />
                        </div>
                        <div className="form-group">
                            <input name="module" value={newTestCase.module} onChange={handleChange} placeholder="Module" />
                        </div>
                        <div className="form-group">
                            <input name="priority" value={newTestCase.priority} onChange={handleChange} placeholder="Priority" />
                        </div>
                        <div className="form-group">
                            <input name="status" value={newTestCase.status} onChange={handleChange} placeholder="Status" />
                        </div>
                        <button type="submit">Add</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default TestCases;
