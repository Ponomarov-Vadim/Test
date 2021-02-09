/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';

import messaging from '@react-native-firebase/messaging';
import * as firebase from 'firebase';
import 'firebase/auth';

import PushNotification from 'react-native-push-notification';

var firebaseConfig = {
  apiKey: "AIzaSyCv8KZlHAqfGDEfUqMADU0SYrzB9rXXD5o",
  authDomain: "test-3709a.firebaseapp.com",
  databaseURL: "https://test-3709a-default-rtdb.firebaseio.com",
  projectId: "test-3709a",
  storageBucket: "test-3709a.appspot.com",
  messagingSenderId: "545953624513",
  appId: "1:545953624513:web:3e7ce140937716477e7f40",
  measurementId: "G-3S6DEY41E6"
};
  // Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function TabOneScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const auth = async () => {
    try {
      console.log('Email', email);
      console.log('pass', password);     
      
      const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
      console.log(user);      
    } catch (error) {
      console.log(error);      
    }
  };


  const out = async () => {
    try { 
      await firebase.auth().signOut();
      console.log('out');      
    } catch (error) {
      console.log('error',error);
    }
  };

  const login = async () => {
    try {
      console.log('Email', email);
      console.log('pass', password);     
      
      const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
      console.log(user);   
    } catch (error) {
      console.log('error',error);
    }
  };

const App: () => React$Node = () => {
  
  const getPushData = async (message) => {
    PushNotification.localNotification({
      message: message.notification.body,
      title: message.notification.title,
    });
    console.log(message);
  }

  messaging().setBackgroundMessageHendler(getPushData);

  const getToken = async() => {
    const token = await messaging().getToken();
    console.log(token);
  }

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(getPushData);

    return unsubscribe;
  }, []);

  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

export default App;
