import { useState } from 'react';
import { askTeacher } from '../../services/aiService';
import chapterContent from '../../data/chapterContent';
import videoSummaries from '../../data/videoSummaries';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const videoContext = videoSummaries
    .map((video) => `${video.title}: ${video.summary}`)
    .join('\n');

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    setMessages((prev) => [...prev, { sender: 'student', text: input }]);
    setInput('');
    setIsLoading(true);

    try {
      const teacherReply = await askTeacher(
        input,
        chapterContent,
        videoContext,
        messages
      );
      setMessages((prev) => [
        ...prev,
        { sender: 'teacher', text: teacherReply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: 'teacher', text: 'Sorry, I couldn’t answer that right now.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='space-y-4'>
      <h4 className='text-lg font-semibold text-slate-100'>
        Student–Teacher Conversation
      </h4>

      <div className='bg-slate-900 border border-slate-700 rounded-md p-4 h-60 overflow-y-auto space-y-2'>
        {messages.map((msg, i) => (
          <p key={i} className='text-sm text-slate-300'>
            <span className='font-medium text-teal-300'>
              {msg.sender === 'student' ? 'Student' : 'Teacher'}:
            </span>{' '}
            {msg.text}
          </p>
        ))}

        {isLoading && (
          <p className='text-sm text-slate-400'>
            <span className='font-medium text-teal-300'>Teacher:</span>{' '}
            Thinking...
          </p>
        )}
      </div>

      <div className='flex gap-2'>
        <input
          type='text'
          placeholder='Ask your doubt...'
          value={input}
          disabled={isLoading}
          onChange={(e) => setInput(e.target.value)}
          className='flex-1 bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-400'
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className='bg-teal-500 hover:bg-teal-400 disabled:bg-teal-700 text-slate-900 font-medium px-4 py-2 rounded-md transition'
        >
          {isLoading ? 'Thinking...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
