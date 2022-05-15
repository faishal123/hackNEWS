/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import css from "./Notification.module.css";
import Text from "../Text";
import { createPortal } from "react-dom";

interface NotificationProps {
  message?: string | null;
  onClose?: () => void;
  id: string;
}

function useHideNotif(
  action: () => void,
  delay: number,
  message?: string | null
) {
  useEffect(() => {
    const handler = setTimeout(() => {
      if (!!message) {
        action();
      }
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [action, delay]);

  return null;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  onClose = () => null,
  id,
}) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  useHideNotif(onClose, 4800, message);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const RenderClose = (onClose: () => void) => {
    return (
      <div
        className={css.closeButton}
        onClick={() => onClose()}
        role="button"
        tabIndex={0}
        id={`${id}-close-button`}
        data-testid={`${id}-close-button`}
      >
        <Text id="txt-close">x</Text>
      </div>
    );
  };
  if (loaded && !!message) {
    return createPortal(
      <>
        <div
          className={css.containerNotification}
          id={`${id}`}
          data-testid={`${id}`}
        >
          <div className={css.wrapperContent}>
            <div className={css.wrapMessage}>
              <Text id="txt-notification-message" size="medium">
                {message}
              </Text>
            </div>
            {RenderClose(onClose)}
          </div>
        </div>
      </>,
      document.body
    );
  }
  return null;
};

export default Notification;
