
import React, {useContext, useEffect, useState} from 'react'
import {Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Map from "./src/components/Map";
import Search from "./src/components/Search";
import SearchProvider from "./src/context/SearchContext";
import Menu from "./src/components/Menu";
import Login from "./src/components/Login";
import {getColor} from 'tailwind-rn';
import UserProvider, {UserContext} from "./src/context/UserContext";
import Register from './src/components/Register';
import AddSubscriptionScreen from './src/components/AddSubscriptionScreen';
import Profile from './src/components/Profile';
import ProfileUpdate from './src/components/ProfileUpdate';
import AsyncStorage from '@react-native-community/async-storage';
import BecomeDriver from './src/components/BecomeDriver';
import AdminMenu from './src/components/AdminMenu';
import DriverValidation from './src/components/DriverValidation';
import ValidateAccount from './src/components/ValidateAccount';
import messaging from '@react-native-firebase/messaging';
import Offer from "./src/components/Offer";
import PaymentFormView from './src/components/PaymentFormView';
import ForgotPassword from './src/components/ForgotPassword';
import NewPassword from './src/components/NewPassword';

function HomeScreen({ navigation }) {

  const {user} = useContext(UserContext);

  const [mode, setMode] = useState('');

  useEffect(() => {
    async function getMode() {
      setMode(await AsyncStorage.getItem('changeMode'));
    }

    getMode();
  }, []);


  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const {type} = remoteMessage.data;
      console.log(remoteMessage);
      if (type === "OFFER_CREATE") {
        const offer = JSON.parse(remoteMessage.data.offer);
        navigation.navigate('Offer', { offer })
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Text> Mode {mode}</Text>
      <Text>Bonjour {user.user.firstname}</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Go to Map"
        onPress={() => navigation.navigate('Map')}
      />
      <Button
        title="Go to Search"
        onPress={() => navigation.navigate('Search')}
      />
      <Button
        title="Go to Menu"
        onPress={() => navigation.navigate('Menu')}
      />
    </View>
  );
}


function DetailsScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <UserProvider>
      <SearchProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerStyle: {
                backgroundColor: getColor('indigo-500'),
              },
              headerTintColor: getColor('gray-100'),
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Accueil'}}/>
            <Stack.Screen name="Details" component={DetailsScreen}/>
            <Stack.Screen name="Map" component={Map} options={{headerShown: false}}/>
            <Stack.Screen name="Search" component={Search} options={{title: 'Itinéraire'}}/>
            <Stack.Screen name="Menu" component={Menu} options={{title: 'Paramètres'}}/>
            <Stack.Screen name="Register" component={Register} options={{title: 'Inscription'}}/>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="PaymentFormView" component={PaymentFormView} options={{title: 'Moyen de paiement'}}/>
            <Stack.Screen name="Profile" component={Profile} options={{title: 'Profil'}}/>
            <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} options={{title: 'Modifier mon Profil'}}/>
            <Stack.Screen name="BecomeDriver" component={BecomeDriver} options={{title: 'Devenir chauffeur'}}/>
            <Stack.Screen name="Admin" component={AdminMenu} options={{title: 'Admin'}}/>
            <Stack.Screen name="DriverValidation" component={DriverValidation} options={{title: 'Comptes a valider'}}/>
            <Stack.Screen name="ValidateAccount" component={ValidateAccount} options={{title: 'Validation'}}/>
            <Stack.Screen name="Offer" component={Offer} options={{headerShown: false}}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{title: 'Mot de passe oublié'}}/>
            <Stack.Screen name="NewPassword" component={NewPassword} options={{title: 'Nouveau mot de passe'}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </SearchProvider>
    </UserProvider>
  );
}

export default App;
