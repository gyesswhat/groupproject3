import styled from 'styled-components';

export const DeliveryItem = styled.div`
  width: 410px;
  height: 80px;
  padding: 15px;
  margin: 5px 10px 5px 10px;
  border: #ddd 1px solid;
  border-radius: 10px;
  color: black;
  display: flex;
  justify-content: center;
  flex-direction: column;

  & > h4 {
    width: 100%;
    height: fit-content;
    margin-top: 10px;
    margin-bottom: 5px;
  }

  &:hover {
    border: 1px solid darkgreen;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PriceWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  height: fit-content;
`;

export const Price = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;

  & > h4 {
    margin: 5px;
  }
`;
