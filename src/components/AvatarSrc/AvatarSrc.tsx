import React from 'react';
import { Badge, Avatar, makeStyles } from '@material-ui/core';

import defaultAvatar from '../../assets/img/defaultAvatar.svg';

const useStyles = makeStyles((theme) => ({
  avatarOnline: {
    height: '16px',
    width: '16px',
    minWidth: '16px',
    borderRadius: '50%',
    backgroundColor: '#4CBE22',
    boxShadow: 'inset 0px 3px 4px rgba(0, 0, 0, 0.18)',
  },
  avatarOffilne: {
    height: '16px',
    width: '16px',
    minWidth: '16px',
    borderRadius: '50%',
    backgroundColor: '#C73228',
    boxShadow: 'inset 0px 3px 4px rgba(0, 0, 0, 0.18)',
  },
  Subheader: {
    border: '1px solid #DBE5ED',
    width: '62px',
    height: '62px',
  },
  header: {
    border: '1px solid #DBE5ED',
  },
}));

interface AvatarSrcProps {
  variant?: 'header' | 'Subheader';
  isOnline?: boolean;
  img?: string;
  alt?: string;
}

const AvatarSrc: React.FC<AvatarSrcProps> = (props: AvatarSrcProps) => {
  const { variant = 'header', img, isOnline, alt } = props;
  const styles = useStyles();
  return (
    <Badge
      classes={{
        badge: isOnline ? styles.avatarOnline : styles.avatarOffilne,
      }}
      badgeContent=' '
      overlap='circle'
      variant={variant === 'header' ? 'dot' : 'standard'}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <Avatar className={styles[variant]} alt={alt} src={img}>
        {/* Fallback do avatar */}
        <img
          style={{ height: '100%' }}
          src={defaultAvatar}
          alt='Avatar Padrão'
        />
      </Avatar>
    </Badge>
  );
};

export default AvatarSrc;
