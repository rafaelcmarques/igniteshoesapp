import { useTheme } from 'native-base';
import { useEffect, useState } from 'react';
import { DefaultTheme, NavigationContainer, useNavigation } from '@react-navigation/native';
import  OneSignal, {NotificationReceivedEvent,OSNotification}  from 'react-native-onesignal';


import { Notification } from '../components/Notification';

import { AppRoutes } from './app.routes';

const linking = {
  prefixes: ['igniteshoesapp://', 'com.rocketseat.igniteshoes://', 'exp+igniteshoesapp://'],
  config: {
    screens: {
      details: {
        path: 'details/:productId',
        parse: {
          productId: (productId:string) => productId
        }
      },
      cart: {
        path: 'cart'
      }
    }
  }
}

export function Routes() {
  const [notificantion, setNotificantion] = useState<OSNotification>()
  const { colors } = useTheme();


  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];



  useEffect(()=> {
    const unsubscribe = OneSignal
    .setNotificationWillShowInForegroundHandler((notificationReceivedEvent: NotificationReceivedEvent) => {
      const response = notificationReceivedEvent.getNotification()
      setNotificantion(response)
     
    })

    return () => unsubscribe;
  }, [])

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />
      {
        notificantion?.title &&
        <Notification data={notificantion} onClose={ () => setNotificantion(undefined) }/>
      }
    </NavigationContainer>
  );
}