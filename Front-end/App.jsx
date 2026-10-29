import Cadastro from './Components/cadastro/Cadastro';
import Dashboard from './Components/dashboard/Dashboard';
import Importacao from './Components/importacao/Importacao';
import Login from './Components/login/Login';
import Analise from './Components/analise/Analise';
import Validacao from "./Components/validacao/Validacao";
import Dados from './Components/dados/Dados';
import Administracao from './Components/administracao/Administracao';
import { SafeAreaView } from 'react-native-web';
import { styles } from './Styles';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Login /> */}
      {/* <Cadastro /> */}
      {/* <Dashboard /> */}
      {/* <Importacao /> */}
      {/* <Analise /> */}
      {/* <Validacao /> */}
      {/* <Dados /> */}
      <Administracao />
    </SafeAreaView>
  );
}
