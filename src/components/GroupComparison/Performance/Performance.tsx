import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Hidden,
  Typography,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';

import { RadarChart, RadarChartMobile } from '../RadarChart';
import BarChart from '../BarChart';
import GroupComparisonContainer from '../GroupComparisonContainer';
import ButtonMobile from '../ButtonMobile';
import ComparisonChartMobileModal from '../ComparisonChartMobileModal';
import useStyles from './styles';

interface PerformanceComparisonProps {
  groups: Array<GroupComparison.GroupData & { color?: string }>;
}

const Performance: React.FC<PerformanceComparisonProps> = (
  props: PerformanceComparisonProps
) => {
  const { groups } = props;
  const theme = useTheme();
  const styles = useStyles();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [showMobileChart, setShowMobileChart] = useState<boolean>(false);

  useEffect(() => {
    if (!mobile) setShowMobileChart(false);
  }, [mobile]);

  const [groupSortBy, setGroupSortBy] = useState<{
    key: GroupSort;
    reverse: boolean;
  }>({ key: 'name', reverse: true });
  const groupSort = (property: GroupSort, reverse: boolean) => (
    a: GroupComparison.GroupData,
    b: GroupComparison.GroupData
  ) => {
    if (property === 'name') return 0;
    if (a[property] < b[property]) {
      return reverse ? -1 : 1;
    }
    if (a[property] > b[property]) {
      return reverse ? 1 : -1;
    }
    return 0;
  };

  return (
    <Box className={styles.container}>
      <Hidden mdDown>
        <Box className={styles.charts}>
          <Box className={styles.radarChart}>
            <RadarChart
              groups={groups.sort(
                groupSort(groupSortBy.key, groupSortBy.reverse)
              )}
            />
          </Box>
          <Box className={styles.barChartOuterContainer}>
            <Box className={styles.barChartInnerContainer}>
              <Box className={styles.barChartUnit}>
                <Typography variant='body1' align='center'>
                  Acionamento Total
                </Typography>
                <Box className={styles.chart}>
                  <BarChart
                    data={groups
                      .sort(groupSort(groupSortBy.key, groupSortBy.reverse))
                      .map((g) => ({
                        id: g.name,
                        value: g.actuation / g.goal.actuation,
                      }))}
                    displayData={groups
                      .sort(groupSort(groupSortBy.key, groupSortBy.reverse))
                      .map((g) => g.actuation)}
                  />
                </Box>
              </Box>
              <Box className={styles.barChartUnit}>
                <Typography variant='body1' align='center'>
                  Acionamento Positivo
                </Typography>
                <Box className={styles.chart}>
                  <BarChart
                    data={groups
                      .sort(groupSort(groupSortBy.key, groupSortBy.reverse))
                      .map((g) => ({
                        id: g.name,
                        value: g.positiveActuation / g.goal.positiveActuation,
                      }))}
                    displayData={groups
                      .sort(groupSort(groupSortBy.key, groupSortBy.reverse))
                      .map((g) => g.positiveActuation)}
                  />
                </Box>
              </Box>
              <Box className={styles.barChartUnit}>
                <Typography variant='body1' align='center'>
                  Qtd. de Promessas
                </Typography>
                <Box className={styles.chart}>
                  <BarChart
                    data={groups
                      .sort(groupSort(groupSortBy.key, groupSortBy.reverse))
                      .map((g) => ({
                        id: g.name,
                        value: g.promises / g.goal.promises,
                      }))}
                    displayData={groups
                      .sort(groupSort(groupSortBy.key, groupSortBy.reverse))
                      .map((g) => g.promises)}
                  />
                </Box>
              </Box>
              <Box className={styles.barChartUnit}>
                <Typography variant='body1' align='center'>
                  Valor das Promessas
                </Typography>
                <Box className={styles.chart}>
                  <BarChart
                    monetary
                    data={groups
                      .sort(groupSort(groupSortBy.key, groupSortBy.reverse))
                      .map((g) => ({
                        id: g.name,
                        value: g.promisesValue / g.goal.promisesValue,
                      }))}
                    displayData={groups
                      .sort(groupSort(groupSortBy.key, groupSortBy.reverse))
                      .map((g) => g.promisesValue)}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Hidden>
      <GroupComparisonContainer
        groups={groups.sort(groupSort(groupSortBy.key, groupSortBy.reverse))}
        groupSortBy={groupSortBy}
        setGroupSortBy={setGroupSortBy}
      />
      {mobile && <ButtonMobile onClick={() => setShowMobileChart(true)} />}
      {showMobileChart && (
        <ComparisonChartMobileModal
          onClick={() => setShowMobileChart(false)}
          Chart={() => (
            <div className={styles.barChartMobile}>
              <RadarChartMobile groups={groups} />
            </div>
          )}
          groups={groups.map((g) => g.name)}
        />
      )}
    </Box>
  );
};

const mapStateToProps = (
  state: SRCWEB.ApplicationState
): PerformanceComparisonProps => ({
  groups: state.groups.groups.map((group) => ({
    name: group.groupName,
    actuation: group.groupData.values.actuation,
    positiveActuation: group.groupData.values.positiveActuation,
    promises: group.groupData.values.promises,
    promisesValue: group.groupData.values.promisesValue,
    goal: {
      name: 'Meta',
      actuation: group.groupData.goals.standard.actuation,
      positiveActuation: group.groupData.goals.standard.positiveActuation,
      promises: group.groupData.goals.standard.promises,
      promisesValue: group.groupData.goals.standard.promisesValue,
    },
  })),
});

export default connect(mapStateToProps)(Performance);
