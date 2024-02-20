import styled from 'styled-components';

export const DeliveryItem = styled.div`
  width: 470px;
  height: 86px;
  padding: 25px;
  margin: 5px 10px 5px 10px;
  border: #ddd 1px solid;
  border-radius: 16px;
  color: black;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;

  & > h4 {
    width: 80%;
    height: fit-content;
    margin-bottom: 8px;
    font-size: 18px;
    margin-top: 0;
    display: flex;
  }

  &:hover {
    border: 1px solid #087112;
  }
`;

export const Badge = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  background-color: #ef5656;
  color: white;
  width: 78px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0px 16px 0px 16px;
  font-size: 11px;
  font-weight: 700;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #83859c;

  & > img {
    display: flex;
    align-items: center;
  }
`;

export const PriceWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  height: fit-content;
  & > p {
    margin-bottom: 0;
    color: #83859c;
  }
`;

export const Price = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;

  & > h4 {
    margin: 5px;
    font-size: 20px;
    margin-bottom: 0;
  }

  & > p {
    margin-bottom: 0;
  }
`;
