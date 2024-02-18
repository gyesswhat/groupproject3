import styled from 'styled-components';

export const Menu = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px auto;
`;

export const FoodTypeItem = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: darkgreen solid 1.5px;
  width: 160px;
  height: 72px;
  border-radius: 14px;
  padding: 10px 10px;
  background-color: #eee;
  font-weight: bold;
  justify-content: center;
  color: #545563;
  font-weight: 700;

  &.selected {
    color: darkgreen;
    border: 2px solid green;
    background-color: #fff;
  }

  &:hover {
    background-color: #fff;
    color: darkgreen;
    border: 2px solid green;
  }

  & > img {
    width: 24px;
    height: 24px;
    margin-bottom: 9px;
  }

  & > p {
    margin: 0;
  }
`;
