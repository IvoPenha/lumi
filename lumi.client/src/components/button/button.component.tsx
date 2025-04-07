import { Button as ButtonBase, CircularProgress } from '@mui/material';

type ButtonProps = {
  children?: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
};

export const ButtonComponent: React.FC<ButtonProps> = ({ children, onClick, disabled = false, loading = false, variant = 'primary' }) => {
  return (
    <ButtonBase
      variant="contained"
      onClick={onClick}
      disabled={disabled || loading}
      sx={{
        backgroundColor: variant === 'primary' ? 'success.main' : variant === 'secondary' ? 'info.main' : '#dc3545',
        color: '#fff',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: variant === 'primary' ? 'success.main' : variant === 'secondary' ? 'info.main' : '#dc3545'
        }
      }}
    >
      {loading ? <CircularProgress /> : children}
    </ButtonBase>
  );
};
