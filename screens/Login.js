import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import auth, {firebase} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState('');

  const navigation = useNavigation();

  const SignInFunc = async () => {
    setIsloading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigation.popToTop();
    } catch (e) {
      setIsloading(false);
      alert(e.message);
    }
  };

  return (
    <View style={{margin: 16}}>
      <TextInput
        label="Email"
        style={{marginTop: 12}}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        label="Password"
        style={{marginTop: 12}}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 16,
        }}>
        <Button compact="" onPress={() => navigation.navigate('SignUp')}>
          SignUp
        </Button>
        <Button mode="contained" onPress={SignInFunc} loading={isloading}>
          SignIn
        </Button>
      </View>
    </View>
  );
};

export default Login;
