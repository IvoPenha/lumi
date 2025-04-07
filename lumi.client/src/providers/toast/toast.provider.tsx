import { Toaster } from 'sonner';

const ToastProvider = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};

export default ToastProvider;
