import { toast } from 'sonner';

export function asyncErrorHandler(error: unknown) {
  if (!(error instanceof Error)) {
    toast.error('Unhandled error');
    return;
  }
  toast.error(error.message);
}
