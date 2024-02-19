import { MyPage } from './MyPage';
import { dummyDeliveryRecruitment } from '../posts/posts.const';
import { DeliveryItem } from '../posts/DeliveryItem';
import { Header } from '../header';

export const OrdersPage = () => {
  return (
    <div>
      <Header />
      <div id="flex-row">
        <MyPage />
        <div id="inner-wrap">
          <h3>주문 히스토리</h3>
          <div id="main-screen">
            <div id="delivery-recruitment-list">
              {dummyDeliveryRecruitment.map(
                ({ id, restaurant, menu, recruiter, recruit, recruited, timer, cost, isValid }) => (
                  <DeliveryItem
                    key={id}
                    id={id}
                    restaurant={restaurant}
                    menu={menu}
                    recruiter={recruiter}
                    recruit={recruit}
                    recruited={recruited}
                    timer={isValid === 3 ? timer : null}
                    cost={cost}
                    isValid={isValid}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
