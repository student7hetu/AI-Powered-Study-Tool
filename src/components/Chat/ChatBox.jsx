import React, { useState } from 'react';

const ChatBox = () => {
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const studentMessage = {
      sender: 'student',
      text: input,
    };

    const teacherMessage = {
      sender: 'teacher',
      text: "Good question. We'll discuss this shortly.",
    };

    setMessage([...message, studentMessage, teacherMessage]);
    setInput('');
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '12px' }}>
      <h4>Student-Teacher Dialogue</h4>

      <div style={{ minHeight: '200px', marginBottom: '10px' }}>
        {message.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender === 'student' ? 'Student' : 'Teacher'}:</strong>{' '}
            {msg.text}
          </p>
        ))}
      </div>

      <input
        type='text'
        placeholder='Ask your doubt...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '80%' }}
      />

      <button onClick={handleSend} style={{ marginLeft: '8px' }}></button>
    </div>
  );
};

export default ChatBox;
