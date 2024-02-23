import { Link } from 'react-router-dom';
import * as S from '../main/main.style';

export const DeliveryItem = ({ id, restaurant, menu, timer, recruit, recruited, cost, recruiter, isValid }) => (
  <Link to={isValid !== 3 ? `/post/${id}/order-failed` : `/post/${id}`}>
    <S.DeliveryItem>
      {timer <= 5 && timer > 0 && isValid !== 0 && isValid !== 1 && <S.Badge>마감 임박</S.Badge>}
      {isValid === 4 && timer > 0 && <S.Badge>진행 중</S.Badge>}
      <h4>
        [{restaurant}] {menu}
      </h4>

      <S.Info>
        <img src="/assets/timer-icon.svg" alt="timer" />
        <p id="green">{timer}분</p>
        <p> 뒤 주문 예정</p>
        <p className="dot" id="green">
          •
        </p>
        <p>모집 인원</p>
        <p id="green">
          {recruited - 1}/{recruit}
        </p>
      </S.Info>
      <S.PriceWrap>
        <p>{recruiter}</p>
        <S.Price>
          <p id="green">배달비 포함</p> <h4>{cost}</h4> <p>원</p>
        </S.Price>
      </S.PriceWrap>
    </S.DeliveryItem>
  </Link>
);
