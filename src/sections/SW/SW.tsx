import { useCallback, useEffect, useRef } from 'react';

import type { SnackbarKey } from 'notistack';
import { useRegisterSW } from 'virtual:pwa-register/react';


// TODO (Suren): this should be a custom hook :)
function SW() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const close = useCallback(() => {
    setOfflineReady(false);
    setNeedRefresh(false);
  }, [setOfflineReady, setNeedRefresh]);

  useEffect(() => {
    if (offlineReady) {
     alert('App is ready to work offline');
    } else if (needRefresh) {
     alert('New content is available, please refresh');
    }
  }, [close, needRefresh, offlineReady, updateServiceWorker]);

  return null;
}

export default SW;
