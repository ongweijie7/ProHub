import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { getDefaultLocale } from 'react-native-calendars/src/services';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true, 
  }),
});

const timeToString = (time) => {
    
    const date = new Date(time);
    //return date.toISOString().split('T')[0];
    return date.getHours() + ":" + date.getMinutes();
  };

export default function App() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
  
    useEffect(() => {
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);
  
    return (
      null
    );
  }
  
  export async function schedulePushNotification(date, time, name, details) {
    const trigger = new Date(date);

    trigger.setMinutes(time.getMinutes());
    trigger.setSeconds(0);
    trigger.setHours(time.getHours());

    return await Notifications.scheduleNotificationAsync({
      content: {
        title: name,
        body: details
      },
      trigger,
    });
  }

  // Debugger
  export async function getNext() {
    Notifications.getAllScheduledNotificationsAsync().then(notifications => {
    notifications.forEach(notification => console.log(timeToString(notification.trigger.value)));
    //Notifications.cancelAllScheduledNotificationsAsync();
    });
}