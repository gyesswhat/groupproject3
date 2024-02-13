import styled from 'styled-components';

export const DeliveryItem = styled.div`
  width: 38.9vw; /*480px*/
  height: 97px;
  padding: 10px;
  margin: 5px 10px 5px 10px;
  border: #ddd 1px solid;
  border-radius: 10px;
  color: black;

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
  margin-bottom: 10px;
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
