import { SnackbarProvider } from 'notistack';

import { notifications } from '@/config';

// import Notifier from './Notifier';

function Notifications() {
  return (
    <SnackbarProvider maxSnack={notifications.maxSnack}>
    </SnackbarProvider>
  );
}

export default Notifications;
