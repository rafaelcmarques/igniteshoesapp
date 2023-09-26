import { StatusBar } from 'react-native';

import { NativeBaseProvider } from 'native-base';
import  OneSignal, { OSNotification }  from 'react-native-onesignal';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';
import { tagUserInfoCreate } from './src/notifications/notificationsTag';

import { CartContextProvider } from './src/contexts/CartContext';
import { useEffect } from 'react';

OneSignal.setEmail('rafael@email.com')
OneSignal.setAppId("60077e73-96c0-44e2-8079-d0988b54dc11");

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate()

  useEffect(()=> {
    const unsubscribe = OneSignal.setNotificationOpenedHandler((response)=> {
        const { actionId } = response.action as any

        switch(actionId) {
          case  '1':
            return console.log('Ver todos')
          case '2':
            return console.log('Ver pedido')
          default:
            return console.log('Não foi clicado em nenhum botão de ação')
        }
    })
    return ()=> unsubscribe
  }, [])
      
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>

   
    </NativeBaseProvider>
  );
}