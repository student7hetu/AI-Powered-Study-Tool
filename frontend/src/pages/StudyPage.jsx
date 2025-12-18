import React from 'react';
import videoSummaries from '../data/videoSummaries';
import ChatBox from '../components/chat/ChatBox';

const StudyPage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-8 text-slate-200'>
      <div className='max-w-4xl mx-auto space-y-8'>
        <div className='text-center'>
          <h1 className='text-4xl font-semibold text-teal-300'>
            An Interactive Study Tool
          </h1>
          <h2 className='mt-2 text-xl text-slate-300'>Chapter: Oligopoly</h2>
        </div>

        <div className='bg-slate-800 rounded-lg p-5 shadow'>
          <h3 className='text-xl font-medium text-teal-200 mb-2'>
            Chapter Overview
          </h3>
          <p className='text-slate-300 leading-relaxed'>
            This chapter explains the concept of oligopoly, its characteristics,
            real-world examples, and exam-oriented points.
          </p>
        </div>

        <div className='bg-slate-800 rounded-lg p-5 shadow space-y-4'>
          <h3 className='text-xl font-medium text-teal-200'>Video Learning</h3>

          {videoSummaries.map((video, index) => (
            <div key={index} className='border border-slate-700 rounded-md p-4'>
              <h4 className='text-lg font-semibold text-slate-100'>
                {video.title}
              </h4>
              <p className='text-slate-300 mt-1'>{video.summary}</p>
              <p className='text-slate-400 mt-2'>
                <span className='font-medium text-teal-300'>Exam Focus:</span>{' '}
                {video.examTips}
              </p>
            </div>
          ))}
        </div>

        <div className='bg-slate-800 rounded-lg p-5 shadow space-y-4'>
          <h3 className='text-xl font-medium text-teal-200'>Ask Your Doubts</h3>
          <p className='text-md text-red-400'>
            Note: This study tool supports only the chapter “Oligopoly”.
            Questions outside this syllabus will not be answered.
          </p>
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default StudyPage;
