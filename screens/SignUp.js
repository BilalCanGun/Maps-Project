import React, {useState, Component} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import auth, {firebase} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const SignUp = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState('');

  const navigation = useNavigation();

  const createAccount = async () => {
    setIsloading(true);
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      response.user.updateProfile({displayName: name});
      setIsloading(false);
      navigation.popToTop();
    } catch (e) {
      setIsloading(false);
      alert(e.message);
    }
  };

  const SignIn = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  const SignOut = () => {
    auth()
      .signOut()
      .then(res => console.log('Çıkış yapıldı!'))
      .catch(err => console.log(err));
  };

  const chechOut = () => {
    const user = auth().currentUser;
    console.log(user);
  };

  return (
    <View style={{margin: 16}}>
      <TextInput
        style={{marginTop: 12}}
        label="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={{marginTop: 12}}
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={{marginTop: 12}}
        value={password}
        label="Password"
        onChangeText={text => setPassword(text)}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 16,
        }}>
        <Button compact="" onPress={() => navigation.navigate('SignIn')}>
          SignIn
        </Button>
        <Button mode="contained" onPress={createAccount} loading={isloading}>
          SignUp
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SignUp;
