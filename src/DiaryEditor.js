import React, { useRef, useState } from 'react';

function DiaryEditor({ onCreate }) {
  const authorInput = useRef(); // autorInput 객체를 통해 HTML 태그에 접근할 수 있다.
  const textArea = useRef();
  const [state, setState] = useState({ author: '', content: '', emotion: 1 });

  const handleChangeState = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (state.author.length < 1) {
      authorInput.current.focus(); // authorInput.current는 현재 authorInput이 ref로 지정된 태그를 의미한다.
      return;
    }

    if (state.content.length < 5) {
      textArea.current.focus();
      return;
    }

    onCreate(state.author, state.content, state.emotion);
    alert('저장 성공');
    // 초기화
    setState({
      author: '',
      content: '',
      emotion: 1,
    });
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput}
          type="text"
          name="author"
          value={state.author}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <textarea
          ref={textArea}
          name="content"
          value={state.content}
          onChange={handleChangeState}
        ></textarea>
      </div>
      <div>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>저장</button>
      </div>
    </div>
  );
}

export default React.memo(DiaryEditor);
