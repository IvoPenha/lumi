import { IconButton } from '@mui/material';
import React from 'react';
import {
  MdAdd,
  MdBarChart,
  MdBolt,
  MdClose,
  MdCompareArrows,
  MdDelete,
  MdEdit,
  MdFilter,
  MdHome,
  MdLineAxis,
  MdLogout,
  MdMoveDown,
  MdOutlineUnfoldMore,
  MdPerson,
  MdPieChart,
  MdRefresh,
  MdSearch,
  MdSettings,
  MdTrendingDown,
  MdTrendingUp,
  MdUpcoming,
  MdViewColumn,
  MdWallet
} from 'react-icons/md';
import { EIcons } from './icons.enum';

const iconsMap: {
  [key in EIcons]: React.ReactNode;
} = {
  [EIcons.EDIT]: <MdEdit />,
  [EIcons.DELETE]: <MdDelete />,
  [EIcons.ADD]: <MdAdd />,
  [EIcons.SEARCH]: <MdSearch />,
  [EIcons.FILTER]: <MdFilter />,
  [EIcons.REFRESH]: <MdRefresh />,
  [EIcons.WALLET]: <MdWallet />,
  [EIcons.USER]: <MdPerson />,
  [EIcons.SETTINGS]: <MdSettings />,
  [EIcons.HOME]: <MdHome />,
  [EIcons.UP]: <MdUpcoming />,
  [EIcons.ORDER]: <MdOutlineUnfoldMore />,
  [EIcons.LOGOUT]: <MdLogout />,
  [EIcons.DOWN]: <MdMoveDown />,
  [EIcons.TRENDING_UP]: <MdTrendingUp />,
  [EIcons.TRENDING_DOWN]: <MdTrendingDown />,
  [EIcons.BOLT]: <MdBolt />,
  [EIcons.COMPARE]: <MdCompareArrows />,
  [EIcons.PIE]: <MdPieChart />,
  [EIcons.COLUMN]: <MdViewColumn />,
  [EIcons.BAR]: <MdBarChart />,
  [EIcons.ROW]: <MdLineAxis />,
  [EIcons.CLOSE]: <MdClose />
};

type IconsProps = { icon: EIcons; onClick?: () => void; color?: string; bgColor?: string; fontSize?: string };

export const Icons: React.FC<IconsProps> = ({ icon, onClick, color, bgColor, fontSize }) => {
  const currentIcon = iconsMap?.[icon];
  if (!currentIcon) return null;
  if (!onClick) return currentIcon;

  return (
    <IconButton
      onClick={onClick}
      sx={{
        color: color || 'inherit',
        backgroundColor: bgColor || 'transparent',
        fontSize: fontSize || 'inherit',
        '&:hover': {
          backgroundColor: bgColor ? `${bgColor} !important` : 'transparent',
          opacity: 0.9
        }
      }}
    >
      {currentIcon}
    </IconButton>
  );
};
