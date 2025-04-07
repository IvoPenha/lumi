import { LinearProgress } from '@mui/material';
import { useRef, useState } from 'react';
import { ButtonComponent } from '../button/button.component';

type FileInputProps = {
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  error?: { message: string };
  accept?: {
    title: string;
    extensions: string[];
    maxFileSize?: number; 
  };
  loading?: boolean;
};

export const FileInput = ({ label, onChange, accept, loading, onClick }: FileInputProps) => {
  const [attachment, setAttachment] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <form className="bg-white shadow-[0_10px_60px_rgb(218,229,255)] relative border border-gray-400 rounded-2xl p-8 text-center text-lg max-w-sm mx-auto">
      <div className="absolute bottom-0 !overflow-hidden w-full left-0 h-3">{loading && <LinearProgress color={'success'} />}</div>
      <span className="text-black text-2xl font-medium">{label}</span>
      <p className="mt-2 text-sm text-gray-600">{accept?.title}</p>

      <label
        htmlFor="file-input"
        className="mt-9 mb-4 flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-2 border-dashed border-green-300 text-gray-700 cursor-pointer transition hover:bg-blue-100 hover:border-gray-600"
      >
        <span className="text-lg font-bold transition-colors hover:text-gray-800">Arraste e solte aqui</span>
        <span>ou</span>
        <input
          type="file"
          name="file"
          accept={accept?.extensions.join(',')}
          onChange={event => {
            const file = event.target.files?.[0] || null;
            setAttachment(file);
            onChange?.(event);
          }}
          ref={fileInputRef}
          required
          id="file-input"
          className="w-full max-w-xs text-gray-700 p-1 bg-white rounded-lg border border-green-300 file:mr-5 file:border-0 file:bg-green-700 file:px-4 file:py-2 file:rounded-lg file:text-white file:cursor-pointer file:transition file:hover:bg-green-800"
          max={accept?.maxFileSize} 
        />
      </label>
      <ButtonComponent
        variant="primary"
        onClick={e => {
          e.preventDefault();
          if (attachment) {
            onClick?.();
          }
        }}
        loading={loading}
        disabled={!attachment}
      >
        {!attachment ? 'Selecione primeiro' : 'Enviar arquivo'}
      </ButtonComponent>
    </form>
  );
};

export default FileInput;
