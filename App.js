
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/pages/Login';
import { AuthProvider } from './src/hooks/auth';
import Routes from './src/routes/index.routes';

export default function App() {
  return (
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({

});
