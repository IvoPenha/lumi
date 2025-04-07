import { toast as callToast } from 'sonner';

const toast = callToast;
const toastError = (message: string) => toast.error(message);
const toastSuccess = (message: string) => toast.success(message);
const toastInfo = (message: string) => toast.info(message);
const toastWarning = (message: string) => toast.warning(message);
const toastLoading = (message: string) => toast.loading(message);
const toastDismiss = (id: string) => toast.dismiss(id);

export { toast, toastError, toastSuccess, toastInfo, toastWarning, toastLoading, toastDismiss };
