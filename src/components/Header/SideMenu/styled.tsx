import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Drawer,
  styled,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { PropsWithChildren } from 'react';

export const MenuItem = styled('div')(
  ({ subItem, active }: { subItem?: boolean; active?: boolean }) => ({
    display: 'grid',
    gridTemplateColumns: '24px 192px auto',
    gridGap: '8px',
    height: subItem ? '36px' : '60px',
    background: active ? '#F1F4F5' : 'transparent',
    cursor: 'pointer',
    padding: '0px 20px',
    fontWeight: active ? 500 : 400,
    color: subItem ? '#1F191A' : '#57585B',
  })
);

export const MenuItemIcon = styled('div')(() => ({
  gridColumnStart: 1,
  gridColumnEnd: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& > svg': {
    fontSize: '16px',
  },
}));
export const MenuItemText = styled('p')(() => ({
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 'inherit',
  fontSize: '14px',
  lineHeight: '16px',
  color: 'inherit',
  padding: '10px',
  textAlign: 'left',
  gridColumnStart: 2,
  gridColumnEnd: 3,
  display: 'flex',
  alignItems: 'center',
  '& a': {
    color: 'inherit',
    textDecoration: 'none',
  },
}));

export const DrawerButton = withStyles((theme) => ({
  root: {
    color: 'white',
    fontWeight: 'normal',
    fontSize: '15px',
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    '& > * > svg': {
      margin: '10px',
      marginTop: '9px',
    },
    '& .buttonText:after': {
      content: '""',
      borderRight: '1px dashed #DBE5ED',
      margin: '0px 20px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '56px',
      marginLeft: '-16px',
      '& .buttonText': {
        display: 'none',
      },
    },
  },
}))(Button);

export const SideMenuDrawer = withStyles({
  root: {
    '& > *': {
      padding: '20px 0px',
    },
  },
})(Drawer);

export const Section = withStyles({
  root: {
    border: 'none',
    '&:before': {
      backgroundColor: 'transparent',
    },
    '&.Mui-expanded': {
      padding: '0px',
      margin: '0px',
    },
  },
})(Accordion);

export const SectionTitle = withStyles({
  root: {
    color: 'lightgray',
    textTransform: 'uppercase',
    fontSize: '11px',
    padding: '0px 20px',
  },
})(Typography);

export const AccordionTitle = withStyles({
  root: {
    padding: '0',
  },
  content: {
    alignItems: 'center',
    color: '#57585B',
  },
})((props: PropsWithChildren<WithStyles>) => {
  const { children, classes } = props;
  return (
    <AccordionSummary
      expandIcon={<ExpandMoreIcon style={{ width: '24px' }} />}
      classes={classes}
      aria-controls='panel1a-content'
      id='panel1a-header'
    >
      {children}
    </AccordionSummary>
  );
});

export const AccordionContent = withStyles({
  root: {
    flexDirection: 'column',
    padding: '0',
  },
})(AccordionDetails);

export const Divider = styled('div')({
  height: '1px',
  marginBottom: '8px',
  backgroundColor: '#A0AAB5',
  opacity: 0.3,
});

export const NavItem = styled('button')((theme) => ({}));
