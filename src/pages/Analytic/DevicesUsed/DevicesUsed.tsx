import {
  faChevronRight,
  faLongArrowAltDown,
  faLongArrowAltUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ResponsivePie } from '@nivo/pie';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AnalyticsDatePicker from '../../../components/AnalyticsDatePicker';
import { dispositivoUtilizado } from '../../../store/ducks/analytic/actions';
import {
  Content,
  Detail,
  Graphic,
  IconDesktop,
  IconMobile,
  IconTablet,
  LabelsGraphic,
  Title,
  Wrapper,
} from './styles';

interface IDevicesUsed {
  data: Array<AnalyticGQL.IDashboardDipositivosUtilizados>;
  selectPosition: IntervalTypes;
  dateInterval: DateInterval;
}
type Devices = 'DESKTOP' | 'MOBILE' | 'TABLET';

const idLabels = ['DESKTOP', 'MOBILE', 'TABLET'];
const labelsColor: { [key in Devices]: string } = {
  DESKTOP: '#1A75BA',
  MOBILE: '#14A0C1',
  TABLET: '#02CC9C',
};

const DevicesUsed: React.FC = () => {
  const { data, dateInterval, selectPosition } = useSelector<
    SRCWEB.ApplicationState,
    IDevicesUsed
  >((state) => ({
    data: state.analytic.dispositivosUtilizados,
    dateInterval: state.analytic.dateInterval,
    selectPosition: state.analytic.filterChart,
  }));
  const dispatch = useDispatch();

  const [localDateInterval, setLocalDateInterval] = React.useState<
    DateInterval
  >(dateInterval);
  const [localSelected, setLocalSelected] = React.useState<IntervalTypes>(
    selectPosition
  );
  React.useEffect(() => {
    setLocalDateInterval(dateInterval);
    setLocalSelected(selectPosition);
  }, [dateInterval, dispatch, selectPosition]);
  React.useEffect(() => {
    dispatch(dispositivoUtilizado.request(localDateInterval));
  }, [localDateInterval, dispatch]);

  const dataValid = data
    ? data.map((e) => ({
        id: `${
          idLabels.includes(e.tipoIndicador) ? e.tipoIndicador : 'OUTROS'
        }`,
        label: `${
          idLabels.includes(e.tipoIndicador) ? e.tipoIndicador : 'OUTROS'
        }`,
        value: `${e.valor}`,
        color: `${labelsColor[e.tipoIndicador as Devices] || '#000000'}`,
      }))
    : [{}];

  const valorDoDashBoard = (
    data: AnalyticGQL.IDashboardDipositivosUtilizados | undefined
  ) => {
    if (!data) return null;
    let valor = (data && data.valor ? data.valor : 0).toString();
    if (data.valor > 999) {
      valor = valor.toString();
      valor = `${valor.slice(0, -3)}k`;
    } else if (data.valor > 999999) {
      valor = valor.toString();
      valor = `${valor.slice(0, -6)}M`;
    }
    return (
      <div className='info'>
        {data && data.tipoIndicador ? `${valor}` : '0'}
        {(data?.variacao as number) >= 0 ? (
          <span className='green'>
            <FontAwesomeIcon icon={faLongArrowAltUp} />
            {`${data?.variacao?.toFixed(1)}%`}
          </span>
        ) : null}
        {(data?.variacao as number) < 0 && (
          <span className='red'>
            <FontAwesomeIcon icon={faLongArrowAltDown} />
            {`${data?.variacao?.toFixed(1)}%`}
          </span>
        )}
      </div>
    );
  };

  return (
    <Wrapper>
      <Content>
        <Title>Dispositivos utilizados</Title>
        <Graphic>
          <ResponsivePie
            data={dataValid}
            innerRadius={0.65}
            padAngle={2}
            cornerRadius={45}
            borderWidth={2}
            borderColor='inhert'
            enableSliceLabels={false}
            enableRadialLabels={false}
            radialLabelsTextXOffset={7}
            radialLabelsTextColor={{ from: 'color', modifiers: [] }}
            radialLabelsLinkOffset={10}
            radialLabelsLinkDiagonalLength={15}
            radialLabelsLinkHorizontalLength={7}
            radialLabelsLinkColor={{ from: 'color' }}
            sliceLabelsSkipAngle={10}
            sliceLabelsTextColor='#333333'
            isInteractive={false}
            defs={[
              {
                id: '1',
                type: 'patternDots',
                background: '#1A75BA',
                color: '#1A75BA',
              },
              {
                id: '2',
                type: 'patternDots',
                background: '#14A0C1',
                color: '#14A0C1',
              },
              {
                id: '3',
                type: 'patternDots',
                background: '#02CC9C',
                color: '#02CC9C',
              },
            ]}
            fill={[
              {
                match: {
                  id: 'DESKTOP',
                },
                id: '1',
              },
              {
                match: {
                  id: 'MOBILE',
                },
                id: '2',
              },
              {
                match: {
                  id: 'TABLET',
                },
                id: '3',
              },
            ]}
          />
        </Graphic>
        <LabelsGraphic>
          <div className='labelLeft'>
            <IconDesktop />
            <p>Computador</p>
            {valorDoDashBoard(data?.find((e) => e.tipoIndicador === 'DESKTOP'))}
          </div>
          <div className='labelCenter'>
            <IconMobile />
            <p>Celular</p>
            {valorDoDashBoard(data?.find((e) => e.tipoIndicador === 'MOBILE'))}
          </div>
          <div className='labelRight'>
            <IconTablet />
            <p>Tablet</p>
            {valorDoDashBoard(data?.find((e) => e.tipoIndicador === 'TABLET'))}
          </div>
        </LabelsGraphic>
      </Content>
      <Detail>
        <AnalyticsDatePicker
          selected={localSelected}
          setSelected={setLocalSelected}
          onChange={setLocalDateInterval}
          values={localDateInterval}
        />
        <Link to='/dispositivosutilizados' style={{ textDecoration: 'none' }}>
          <div className='detail'>
            {'Mais detalhes '}
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </Link>
      </Detail>
    </Wrapper>
  );
};

export default DevicesUsed;
