import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 590px;
  /* height: 618px; */
  border: 1px solid ${(props) => props.theme.palette.common.borderColor};
  box-sizing: border-box;
  box-shadow: 0px 0px 4px ${(props) => props.theme.palette.common.white},
    0px 0px 8px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  margin-bottom: 20px;

  @media screen and (max-width: 960px) {
    width: 100%;
  }
  display: flex;
  flex-direction: column;
`;

export const Tabs = styled.div`
  display: flex;
  border: ${(props) => `1px solid ${props.theme.palette.common.borderColor}`};

  @media screen and (max-width: 960px) {
    overflow-x: scroll;

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const Tab = styled.div<{ selected: boolean }>`
  padding: 9px 4px;
  width: 98px;
  height: 77px;
  display: flex;
  flex-direction: column;
  border-bottom: ${(props) =>
    props.selected && `3px solid ${props.theme.palette.primary.main}`};
  cursor: pointer;

  .title {
    font-size: 12px;
    font-weight: ${(props) => (props.selected ? 700 : 400)};
    color: ${(props) =>
      props.selected
        ? props.theme.palette.common.gray
        : props.theme.palette.common.lightGray};
    margin-bottom: 6px;
  }

  .info {
    color: ${(props) => props.theme.palette.common.darkBlue};
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
  }

  .green {
    color: ${(props) => props.theme.palette.common.green};
    margin-left: 4px;
  }

  .red {
    color: ${(props) => props.theme.palette.common.validationRed};
    margin-left: 4px;
  }

  @media screen and (max-width: 960px) {
    height: 85px;
    min-width: 100px;
  }
`;

export const ChartContainer = styled.div`
  padding: 30px;
  height: calc(618px - 77px - 58px);
  flex: 1;
`;

export const ButtonsContainer = styled.div`
  padding: 16px 0;
  display: flex;
  justify-content: center;
`;

export const Button = styled.button<{ selected: boolean }>`
  outline: none;
  border: 1px solid ${(props) => props.theme.palette.primary.main};
  background: ${(props) =>
    props.selected
      ? props.theme.palette.primary.main
      : props.theme.palette.common.white};
  color: ${(props) =>
    props.selected
      ? props.theme.palette.common.white
      : props.theme.palette.primary.main};
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  padding: 2px 16px;
  height: 24px;
`;

export const DetailInfo = styled.div`
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

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`;
