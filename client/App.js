import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [timer, setTimer] = useState(25 * 60); // 25 minutes
    const [isActive, setIsActive] = useState(false);
    const [isFocusTime, setIsFocusTime] = useState(true);
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        let intervalId;

        if (isActive) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }

        if (timer === 0) {
            clearInterval(intervalId);
            saveSession();
            switchTimer();
        }

        return () => clearInterval(intervalId);
    }, [isActive, timer]);

    useEffect(() => {
        fetchSessions();
    }, []);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimer(isFocusTime ? 25 * 60 : 5 * 60);
    };

    const switchTimer = () => {
        setIsFocusTime(!isFocusTime);
        setTimer(isFocusTime ? 5 * 60 : 25 * 60);
        setIsActive(false);
    };

    const fetchSessions = async () => {
        try {
            const response = await axios.get('/sessions'); // Assuming your backend is on the same origin
            setSessions(response.data);
        } catch (error) {
            console.error('Error fetching sessions:', error);
        }
    };

    const saveSession = async () => {
        try {
            await axios.post('/sessions', {
                type: isFocusTime ? 'Focus' : 'Break',
                duration: isFocusTime ? 25 : 5
            });
            fetchSessions(); // Refresh sessions after saving
        } catch (error) {
            console.error('Error saving session:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Pomodoro Timer</h1>
            <div className="mb-4">
                <span className="mr-2">Session Type:</span>
                <span className="font-semibold">{isFocusTime ? 'Focus Time' : 'Break Time'}</span>
            </div>
            <div className="text-5xl font-mono mb-6">{formatTime(timer)}</div>
            <div className="flex space-x-4 mb-8">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={resetTimer}>Reset</button>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-2">Past Sessions</h2>
                <ul>
                    {sessions.map((session) => (
                        <li key={session._id} className="mb-1">
                            {session.type} - {session.duration} minutes - {new Date(session.timestamp).toLocaleString()}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;