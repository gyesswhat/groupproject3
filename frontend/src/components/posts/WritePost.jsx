import { useState } from 'react';
import { PlaceDropdownW } from './PlaceDropdownW';
import { MenuDropdownW } from './MenuDropdown';
import { Header } from '../header';

export function PostForm() {
  const [inputs, setInputs] = useState({
    restaurant: '',
    menu: '',
    recruit: '',
    location: '',
    cost: '',
    content: '',
  });

  const { restaurant, menu, recruit, location, category, cost, content } = inputs;

  const handleInputChange = e => {
    const { name, value } = e.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(inputs);
  };

  return (
    <>
      <Header />
      <div id="wrap">
        <div id="inner-wrap">
          <div id="register">
            <h3>배달팟 모집을 위한 게시글을 작성할게요.</h3>
            <form onSubmit={handleSubmit} id="recruit-form">
              <div id="flex-row">
                <div id="flex-col">
                  <label>배달받을 장소</label>
                  <PlaceDropdownW value={location} />
                </div>
                <div id="flex-col">
                  <label id="green">카테고리 선택</label>
                  <MenuDropdownW value={category} />
                </div>
              </div>
              <div id="flex-row">
                <div id="flex-col">
                  <label>주문할 식당</label>
                  <input id="id" type="text" name="restaurant" value={restaurant} onChange={handleInputChange} />
                </div>

                <div id="flex-col">
                  <label id="green">메뉴 이름</label>
                  <input id="id" type="text" name="menu" value={menu} onChange={handleInputChange} />
                </div>
              </div>
              <div id="flex-row">
                <div id="flex-col">
                  <label>모집 인원</label>
                  <input id="id" type="number" name="recruit" value={recruit} onChange={handleInputChange} />
                </div>

                <div id="flex-col">
                  <label id="green">배달비 포함 가격</label>
                  <input id="id" type="text" name="cost" value={cost} onChange={handleInputChange} />
                </div>
              </div>
              <div id="margin-top">
                <h3>게시될 내용을 작성해주세요.</h3>
                <textarea id="write-content" name="content" value={content} onChange={handleInputChange} />
              </div>
              <div id="write-bottom">
                <p>※ 게시된 글은 수정이 불가합니다.</p>
                <button type="submit">완료</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
