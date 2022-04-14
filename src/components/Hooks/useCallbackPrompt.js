import { useLocation, useNavigate } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import useBlocker from "./useBlocker";
const useCallbackPrompt = (when) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPrompt, setShowPrompt] = useState(false);
  const [lastLocation, setLastLocation] = useState(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);

  const cancelNavigation = useCallback(() => {
    setShowPrompt(false);
  }, []);

  //handle blocking when user click on another route prompt will be shown
  const handleBlockedNavigation = useCallback(
    (nextLocation) => {
      //checking the next location and current location are equals or not
      if (
        !confirmedNavigation &&
        nextLocation.location.pathname !== location.pathname
      ) {
        setShowPrompt(true);
        setLastLocation(nextLocation);
        return false;
      }
      return true;
    },
    [confirmedNavigation, location.pathname]
  );

  const confirmNavigation = useCallback(() => {
    setShowPrompt(false);
    setConfirmedNavigation(true);
  }, []);

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      navigate(lastLocation.location.pathname);
    }
  }, [confirmedNavigation, lastLocation, navigate]);

  useBlocker(handleBlockedNavigation, when);

  return [showPrompt, confirmNavigation, cancelNavigation];
};

export default useCallbackPrompt;
