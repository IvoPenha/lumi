import { FileInput } from '@/components/forms';
import { createBill } from '@/services';
import { useState } from 'react';

export const BillFileInput: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [file, setFile] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (!selectedFile) return;

    setFile(selectedFile);
  };

  const handleFileUpload = async () => {
    if (!file) return;

    try {
      setIsLoading(true);
      const response = await createBill(file);
      if (response?.success) {
        onSuccess();
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <FileInput
        label="Adicione aqui um arquivo de uma fatura"
        onChange={e => {
          handleFileChange(e);
        }}
        loading={isLoading}
        accept={{
          extensions: ['pdf'],
          title: 'Apenas PDF',
          maxFileSize: 2 * 1024 * 1024 // 2MB
        }}
        onClick={handleFileUpload}
      />
    </div>
  );
};
