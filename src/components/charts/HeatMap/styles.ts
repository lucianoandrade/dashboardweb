import styled from 'styled-components';

export const Legend = styled.div<{ level: number }>`
  height: 12px;
  width: 50px;
  background: ${props => `rgba(26, 117, 186,${props.level})`};
  margin: 16px 2px 8px 0;
`;

export const Compare = styled.div`
  padding:13px 20px;
  border-top:1px solid #DBE5ED;
`;