import { ReusableModal } from '@/components/modal/modal.component';
import { BillFileInput } from './bill.file.input';
import { toastSuccess } from '@/hooks';
import { useUpdateFetch } from '@/hooks/query-params/use-update-table';

type BillAddModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function BillAddModal({ isOpen, onClose }: BillAddModalProps) {
  const updateFetch = useUpdateFetch();

  function handleSuccess() {
    toastSuccess('Arquivo enviado com sucesso');
    updateFetch();
    onClose();
  }

  return (
    <ReusableModal onClose={onClose} open={isOpen}>
      <BillFileInput onSuccess={handleSuccess} />
    </ReusableModal>
  );
}
