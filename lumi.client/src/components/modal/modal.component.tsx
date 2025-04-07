import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { Icons } from '../icons/icons.component';
import { EIcons } from '../icons/icons.enum';

interface ReusableModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  width?: number | string;
  disableCloseButton?: boolean;
}

export const ReusableModal: React.FC<ReusableModalProps> = ({ open, onClose, title, children, actions, width = 500, disableCloseButton = false }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 3
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">{title}</Typography>
          {!disableCloseButton && <Icons icon={EIcons.CLOSE} color="text.secondary" onClick={onClose} />}
        </Box>

        <Box mb={2}>{children}</Box>

        {actions && (
          <Box display="flex" justifyContent="flex-end" gap={1}>
            {actions}
          </Box>
        )}
      </Box>
    </Modal>
  );
};
