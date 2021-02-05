import styled from 'styled-components';

export const Wrapper = styled.div`
  border: 1px solid ${(props) => props.theme.palette.common.borderColor};
  box-sizing: border-box;
  box-shadow: 0px 0px 4px ${(props) => props.theme.palette.common.white},
    0px 0px 8px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  background: ${(props) => props.theme.palette.common.white};
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 960px) {
    margin-top: 20px;
    margin-left: 0;
  }
`;

export const Content = styled.div`
  padding: 20px;
  flex: 1;
`;

export const Title = styled.h2`
  font-size: 18px;
  line-height: 21px;
  margin-bottom: 8px;
  font-weight: 700;
  color: ${(props) => props.theme.palette.common.darkBlue};

  @media screen and (max-width: 960px) {
    margin-bottom: 12px;
  }
`;

export const Detail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  border-top: ${(props) =>
    `1px solid ${props.theme.palette.common.borderColor}`};

  .detail {
    color: ${(props) => props.theme.palette.common.aqua};
    cursor: pointer;
  }

  .select {
    cursor: pointer;
  }
`;

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;

  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

export const TableRow = styled.div<{ type?: string; line: number }>`
  display: flex;
  justify-content: space-between;
  width: 347px;
  font-weight: ${(props) => (props.type === 'title' ? 700 : 400)};
  font-size: 14px;
  padding: 9px 16px;
  background: ${(props) =>
    props.line % 2 === 0
      ? props.theme.palette.common.white
      : props.theme.palette.common.darkWhite};
  border-top: ${(props) =>
    props.type !== 'title' &&
    `1px solid ${props.theme.palette.common.borderColor}`};

  .subtitle {
    font-weight: normal;
    margin-right: 30px;
  }

  @media screen and (max-width: 960px) {
    width: 100%;
    display: ${(props) => (props.type === 'title' ? 'none' : 'flex')};

    .subtitle {
      font-weight: 700;
      margin-right: 16px;
    }
  }
`;
