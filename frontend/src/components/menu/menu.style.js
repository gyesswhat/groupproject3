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
  border: darkgreen solid 1px;
  width: 120px;
  height: 70px;
  border-radius: 10px;
  padding: 20px 10px;
  background-color: #eee;
  font-weight: bold;

  &.selected {
    color: darkgreen;
    border: 1px solid green;
    background-color: #fff;
  }

  &:hover {
    background-color: #fff;
    color: darkgreen;
    border: 1px solid green;
  }

  & > img {
    width: 20px;
    height: 20px;
    margin-bottom: 5px;
  }
`;
