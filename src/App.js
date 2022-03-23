import React, { useRef, useState } from 'react';
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
  const [data, setData] = useState([]); // 최종적으로 데이터를 관리할 state
  const dataId = useRef(0); // +1씩 더해지면 추가될 data id ... 0번부터 시작

  // 일기 배열에 새로운 일기를 추가하는 함수
  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current++;
    setData([newItem, ...data]);
  };

  return (
    <div className="App">
      <h1>일기장</h1>
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} />
    </div>
  );
}

export default App;
