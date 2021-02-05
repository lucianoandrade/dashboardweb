import styled from 'styled-components';
import { ReactComponent as DesktopIcon } from '../../../assets/img/desktop.svg';
import { ReactComponent as MobileIcon } from '../../../assets/img/mobile.svg';
import { ReactComponent as TabletIcon } from '../../../assets/img/tablet.svg';

export const Wrapper = styled.div`
  min-height: 420px;
  width: 100%;
  max-width: 387px;
  min-width: 320px;
  border: 1px solid ${(props) => props.theme.palette.common.borderColor};
  box-sizing: border-box;
  box-shadow: 0px 0px 4px ${(props) => props.theme.palette.common.white},
    0px 0px 8px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  background: ${(props) => props.theme.palette.common.white};
  position: relative;
  margin-left: 20px;

  @media screen and (max-width: 960px) {
    margin-top: 20px;
    margin-left: 0;
  }
`;

export const Content = styled.div`
  padding: 20px;
`;

export const Title = styled.h2`
  font-size: 18px;
  line-height: 21px;
  margin-bottom: 70px;
  font-weight: 700;
  color: ${(props) => props.theme.palette.common.darkBlue};
`;

export const Graphic = styled.div`
  height: 170px;
  width: 170px;
  margin: 0 auto 65px;
`;

export const LabelsGraphic = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 70px;
  div {
    flex-direction: column;
    p {
      font-size: 12px;
      line-height: 11px;
      display: flex;
      align-items: center;
      color: ${(props) => props.theme.palette.common.lightGray};
    }
    .info {
      color: ${(props) => props.theme.palette.common.darkBlue};
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      display: flex;
    }

    .green {
      color: ${(props) => props.theme.palette.common.green};
    }

    .red {
      color: ${(props) => props.theme.palette.common.validationRed};
    }
  }
  .labelLeft {
    width: 67px;
  }
  .labelCenter {
    width: 48px;
    margin: 0 48px;
  }
  .labelRight {
    width: 47px;
  }
`;

export const Detail = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  padding: 0px 20px;
  border-top: ${(props) =>
    `1px solid ${props.theme.palette.common.borderColor}`};

  .detail {
    color: ${(props) => props.theme.palette.common.aqua};
    cursor: pointer;
  }
`;

export const IconDesktop = styled(DesktopIcon)`
  height: 20px;
  width: 20px;
`;
export const IconMobile = styled(MobileIcon)`
  height: 20px;
  width: 20px;
`;
export const IconTablet = styled(TabletIcon)`
  height: 20px;
  width: 20px;
`;
