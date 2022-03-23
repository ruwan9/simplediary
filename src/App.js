import React from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const dummyList = [
  {
    id: 1,
    author: 'Bob',
    content: 'Bello',
    emotion: 5,
    created_date: new Date().getTime(),
  },
  {
    id: 2,
    author: 'Taylor',
    content: 'Swift',
    emotion: 3,
    created_date: new Date().getTime(),
  },
  {
    id: 3,
    author: 'Louis',
    content: 'Vuitton',
    emotion: 2,
    created_date: new Date().getTime(),
  },
];

function App() {
  return (
    <div className="App">
      <h1>일기장</h1>
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
