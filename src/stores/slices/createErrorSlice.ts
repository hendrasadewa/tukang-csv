import { toast } from 'sonner';
import type { ErrorState } from '../contracts';

export const createErrorSlice: ErrorState = () => ({
  onShowErrorToast(error) {
    let message = 'Unhandled error occurred!';

    if (error instanceof Error) {
      message = error.message;
    }

    toast.error(message);
  },
});
