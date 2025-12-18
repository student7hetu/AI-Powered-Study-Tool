import React from 'react';
import videoSummaries from '../data/videoSummaries';

const StudyPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Economics Study Tool</h1>
      <h2>Chapter: Oligopoly</h2>

      <section>
        <h3>Chapter Overview</h3>
        <p>
          This chapter explains the concept of oligopoly, its characteristics,
          and exam-oriented insights.
        </p>
      </section>

      <section>
        <h3>Video Learning</h3>
        {videoSummaries.map((video, index) => (
          <div key={index} style={{ marginBottom: '16px' }}>
            <h4>{video.title}</h4>
            <p>{video.summary}</p>
            <p>Exam Focus: {video.examFocus}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default StudyPage;
