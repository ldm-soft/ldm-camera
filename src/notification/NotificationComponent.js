import React from "react";
import styles from "./NotificationComponent.module.css";
export const  NotificationType = {
    Success:  "Success",
    Error:  "Error",
}
export interface NotificationProps{
    notificationType: NotificationType;
    title: String;
}
function NotificationComponent(props: NotificationProps) {
    const {notificationType, title} = props;
    return(
        <div className={`${styles.component} ${notificationType === NotificationType.Error ? styles.error: styles.success}`}>
            {title}
        </div>
    )
}
export default NotificationComponent;