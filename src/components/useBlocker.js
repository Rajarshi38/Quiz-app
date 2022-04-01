import { useContext, useEffect } from "react";
import { UNSAFE_NavigationContext as navigationContext } from "react-router-dom";
const useBlocker = (blocker, when = true) => {
  const { navigator } = useContext(navigationContext);
  useEffect(() => {
    if (!when) return;
    const unblock = navigator.block((tx) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };
      blocker(autoUnblockingTx);
    });
    return unblock;
  }, [navigator, blocker, when]);
};

export default useBlocker;
