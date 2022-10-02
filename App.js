import { Text, View } from 'react-native';
import Footer from './components/Footer';
import Header from './components/Header';
import Gameboard from './components/Gameboard';
import styles from './style/style'
import { useFonts } from 'expo-font';

export default function App() {

   const [loaded] = useFonts({
    'LatoRegular': require('./assets/fonts/Lato-Regular.ttf')
  })

  if (!loaded) {
    return null
  }


  return (
    <View style={styles.container}>
      <Header />
      <Gameboard/>
      <Footer />
    </View>
  );
}
