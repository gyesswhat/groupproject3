export const PostContents = ({
  click,
  disabled,
  isCaptain,
  bank,
  restaurant,
  menu,
  timer,
  recruit,
  recruited,
  cost,
  building,
  account,
  content,
  isJoined,
}) => {
  return (
    <div id="postcontent">
      <div id="main-content">
        <div id="recruiter-cost">
          <h4>
            [{restaurant}] {menu}
          </h4>
          <div id="cost-recruit">
            <div id="cost">
              <p id="green">배달비 포함</p> <h4>{cost}</h4> <p>원</p>
            </div>
            {isCaptain ? null : isJoined ? (
              <button disabled>참여하기</button>
            ) : (
              <button onClick={click} disabled={disabled}>
                참여하기
              </button>
            )}
          </div>
        </div>
        <div id="info">
          <img src="/assets/timer-icon.svg" alt="timer" />
          {timer}

          <p className="dot" id="green">
            •
          </p>
          <p>모집 인원</p>
          <p id="green">
            {recruited - 1}/{recruit}
          </p>
        </div>
        <div id="where">
          <p>배달받을 장소:</p> <p id="green">{building}</p>
        </div>
        {disabled && (
          <div id="where">
            <p>계좌 정보:</p>{' '}
            <p id="green">
              {bank} {account}
            </p>
          </div>
        )}

        <p id="post-content">{content}</p>
      </div>
    </div>
  );
};
