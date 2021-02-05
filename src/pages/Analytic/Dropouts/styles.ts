import styled from 'styled-components';

export const Wrapper = styled.div`
  border: 1px solid ${(props) => props.theme.palette.common.borderColor};
  box-sizing: border-box;
  box-shadow: 0px 0px 4px ${(props) => props.theme.palette.common.white},
    0px 0px 8px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  background: ${(props) => props.theme.palette.common.white};
  width: 590px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 960px) {
    width: 100%;
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
  width: 100%;
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

  @media screen and (max-width: 960px) {
    width: 100%;
    display: ${(props) => (props.type === 'title' ? 'none' : 'flex')};
  }
`;

interface Props {
  type?: string;
  align?: string;
  display?: string;
}

export const Subtitle = styled.div<Props>`
  width: ${(props) => (props.type === 'title' ? '250px' : '100%')};
  text-align: ${(props) => (props.align === 'left' ? 'left' : 'center')};
  font-size: 14px;
  text-transform: capitalize !important;

  .percentage {
    font-weight: 100;
  }

  @media screen and (max-width: 960px) {
    display: ${(props) => (props.display === 'none' ? 'none' : 'flex')};
    justify-content: ${(props) =>
      props.type === 'end' ? 'flex-end' : 'flex-start'};
    font-size: 16px;

    .bold {
      font-weight: 700;
    }

    .light {
      font-weight: normal;
    }

    p {
      margin-top: 11px;
      font-size: 14px;
    }
  }

  @media screen and (max-width: 410px) {
    font-size: 14px;
  }
`;

export const Mobile = styled.div`
  display: none;

  @media screen and (max-width: 960px) {
    display: flex;
    flex-direction: column;
  }
`;
