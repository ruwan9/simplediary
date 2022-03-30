import React from 'react';
import DiaryItem from './DiaryItem';

function DiaryList({ onRemove, diaryList }) {
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          <DiaryItem key={`diaryitem_${it.id}`} {...it} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
}

// 기본 설정값 지정
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
