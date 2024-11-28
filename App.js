import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/pages/Login';
import { AuthProvider } from './src/hooks/auth';

export default function App() {
  return (
    <AuthProvider>
      <Login/>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({

});
