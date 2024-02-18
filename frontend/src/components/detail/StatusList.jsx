import React from 'react';

export function StatusList({ status }) {
  return (
    <div id="statuslist">
      <p
        style={{
          color: status === 0 ? 'green' : status === null ? 'white' : 'black',
          fontWeight: status === 0 ? 800 : 500,
        }}>
        입금 전
      </p>
      <p
        style={{
          color: status === 1 ? 'green' : status === null ? 'white' : 'black',
          fontWeight: status === 1 ? 800 : 500,
        }}>
        입금 확인 중
      </p>
      <p
        style={{
          color: status === 2 ? 'green' : status === null ? 'white' : 'black',
          fontWeight: status === 2 ? 800 : 500,
        }}>
        입금 확인 완료
      </p>
    </div>
  );
}
