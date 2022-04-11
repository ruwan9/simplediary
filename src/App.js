import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

// const dummyList = [
//   {
//     id: 1,
//     author: 'Bob',
//     content: 'Bello',
//     emotion: 5,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 2,
//     author: 'Taylor',
//     content: 'Swift',
//     emotion: 3,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 3,
//     author: 'Louis',
//     content: 'Vuitton',
//     emotion: 2,
//     created_date: new Date().getTime(),
//   },
// ];

// reducer 함수
const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }
    case 'REMOVE': {
      return state.filter((it) => it.id !== action.targetId);
    }
    case 'EDIT': {
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it,
      );
    }
    default:
      return state;
  }
};

function App() {
  // const [data, setData] = useState([]); // 최종적으로 데이터를 관리할 state
  // useState 대신 useReducer 사용
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0); // +1씩 더해지면 추가될 data id ... 0번부터 시작

  // 일기 배열에 새로운 일기를 추가하는 함수
  // useCallback를 활용해 memoization
  const onCreate = useCallback((author, content, emotion) => {
    // 함수형 업데이트
    // const created_date = new Date().getTime();
    // const newItem = {
    //   author,
    //   content,
    //   emotion,
    //   created_date,
    //   id: dataId.current,
    // };
    // dataId.current++;
    // setData((data) => [newItem, ...data]);
    dispatch({
      type: 'CREATE',
      data: { author, content, emotion, id: dataId.current },
    });
    dataId.current++;
  }, []);

  // 일기를 삭제하기 위한 함수
  const onRemove = useCallback((targetId) => {
    // const newDiaryList = data.filter((it) => it.id !== targetId); // targetId와 다른 id만 남기는 새로운 리스트를 만든다.
    // setData(newDiaryList);
    // useCallback 사용 후 최신 state를 이용하기 위해 수정해주어야하는 부분
    // setData((data) => data.filter((it) => it.id !== targetId));
    dispatch({ type: 'REMOVE', targetId });
  }, []);

  // 일기를 수정하기 위한 함수
  const onEdit = useCallback((targetId, newContent) => {
    // useCallback 사용 후 최신 state를 이용하기 위해 수정해주어야하는 부분
    // setData((data) =>
    //   data.map((it) =>
    //     it.id === targetId ? { ...it, content: newContent } : it,
    //   ),
    // );
    dispatch({ type: 'EDIT', targetId, newContent });
  }, []);

  // API 데이터 받아오기
  const getData = async () => {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments',
    ).then((res) => res.json());
    // console.log(res);

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    // 함수형 업데이트
    // setData(initData);
    dispatch({ type: 'INIT', data: initData });
  };

  useEffect(() => {
    getData();
  }, []);

  // useMemo - return을 가진 함수들을 memoization을 통해 최적화시키기 위해 사용
  // useMemo를 쓰는 순간부터 더이상 함수가 아니게 된다. (값을 return하기 때문)
  const getDiaryAnalysis = useMemo(() => {
    // console.log('일기 분석 시작');
    const goodCount = data.filter((it) => it.emotion >= 3).length; // data 중 emotion이 3 이상인 것들 추리기
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  // const { goodCount, badCount, goodRatio } = getDiaryAnalysis();
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <h1>일기장</h1>
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
