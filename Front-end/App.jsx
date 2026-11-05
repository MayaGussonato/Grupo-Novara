// import React, { useRef, useState } from 'react';
// import { View, Text, ActivityIndicator } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import {
//   useFonts,
//   Poppins_300Light,
//   Poppins_400Regular,
//   Poppins_500Medium,
//   Poppins_600SemiBold,
// } from '@expo-google-fonts/poppins';
// import { PreferencesProvider, usePreferences } from './context/PreferencesContext';
// import MenuGlobal from './components/MenuGlobal/MenuGlobal';
// import Login from './pages/desktop/login/Login'; 
// import Dashboard from './pages/desktop/dashboard/dashboard';
// import CentralDeDocumentos from './pages/desktop/centralDeDocumentos/centralDeDocumentos';
// import CentralDeAtendimentos from './pages/desktop/centralDeAtendimentos/centralDeAtendimentos';
// import AnaliseDeDocumentos from './pages/desktop/analiseDeDocumentos/analiseDeDocumentos';
// import ImportarDocumentos from './pages/desktop/importarDocumentos/importarDocumentos';
// import CentralDeValidacao from './pages/desktop/centralDeValidacao/centralDeValidacao';
// import Integracoes from './pages/desktop/integracoes/integracoes';
// import Administracao from './pages/desktop/administracao/administracao';
// import CadastroUsuario from './pages/desktop/cadastroUsuario/cadastroUsuario';
// import MeuPerfil from './pages/desktop/meuPerfil/meuPerfil';
// import { usuariosIniciais } from './pages/desktop/administracao/usuariosMock';

// function EmBreve({ title, activeMenu, onNavigate }) {
//   const { colors, t } = usePreferences();
//   return (
//     <View style={{ flex: 1, flexDirection: 'row', backgroundColor: colors.bg }}>
//       <MenuGlobal activeMenu={activeMenu} onNavigate={onNavigate} />
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 26, color: colors.text }}>{title}</Text>
//         <Text style={{ fontFamily: 'Poppins_300Light', fontSize: 15, color: colors.text }}>
//           {t('emBreve.subtitulo')}
//         </Text>
//       </View>
//     </View>
//   );
// }

// function AppContent() {
//   const { colors } = usePreferences();
//   const [fontsLoaded] = useFonts({
//     Poppins_300Light,
//     Poppins_400Regular,
//     Poppins_500Medium,
//     Poppins_600SemiBold,
//   });
//   const [activeMenu, setActiveMenu] = useState('dashboard');
//   const [analysisDoc, setAnalysisDoc] = useState(null);
//   const [validationDoc, setValidationDoc] = useState(null);
//   const [docOverrides, setDocOverrides] = useState({});
//   const [usuarios, setUsuarios] = useState(usuariosIniciais);
//   const [editingUser, setEditingUser] = useState(null);
//   const docsVisited = useRef(false);

//   if (!fontsLoaded) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bg }}>
//         <ActivityIndicator size="large" color={colors.accent} />
//       </View>
//     );
//   }

//   if (
//     activeMenu === 'documentos' ||
//     activeMenu === 'analise' ||
//     activeMenu === 'importar' ||
//     activeMenu === 'validacao'
//   ) {
//     docsVisited.current = true;
//   }

//   function handleNavigate(key) {
//     setActiveMenu(key);
//   }
//   function handleAddAtendimento() {
//     console.log('Adicionar atendimento');
//   }
//   function handleOpenAtendimento(atendimento) {
//     console.log('Abrir atendimento:', atendimento);
//   }
//   function handleAddDocument() {
//     setActiveMenu('importar');
//   }
//   function handleImport(arquivos, tipo) {
//     console.log('Importar documentos:', tipo, arquivos);
//     setActiveMenu('documentos');
//   }
//   function handleOpenValidation(doc) {
//     setValidationDoc(doc);
//     setActiveMenu('validacao');
//   }
//   function handleSaveValidation(doc, changes) {
//     if (doc) {
//       setDocOverrides((prev) => ({ ...prev, [doc.id]: { ...(prev[doc.id] || {}), ...changes } }));
//     }
//     setValidationDoc(null);
//     setActiveMenu('documentos');
//   }
//   function handleDeleteValidation(doc) {
//     console.log('Deletar documento:', doc);
//     setValidationDoc(null);
//     setActiveMenu('documentos');
//   }
//   function handleOpenAnalysis(doc) {
//     setAnalysisDoc(doc);
//     setActiveMenu('analise');
//   }
//   function handleSaveAnalysis(doc, changes) {
//     setDocOverrides((prev) => ({ ...prev, [doc.id]: { ...(prev[doc.id] || {}), ...changes } }));
//     setAnalysisDoc(null);
//     setActiveMenu('documentos');
//   }

//   function handleAddUser() {
//     setEditingUser(null);
//     setActiveMenu('cadastroUsuario');
//   }
//   function handleEditUser(usuario) {
//     setEditingUser(usuario);
//     setActiveMenu('cadastroUsuario');
//   }
//   function handleSaveUser(dados) {
//     if (editingUser) {
//       setUsuarios((prev) =>
//         prev.map((u) => (u.id === editingUser.id ? { ...u, ...dados } : u))
//       );
//     } else {
//       setUsuarios((prev) => [{ id: Date.now(), ativo: true, ...dados }, ...prev]);
//     }
//     setEditingUser(null);
//     setActiveMenu('administracao');
//   }
//   function handleCancelUser() {
//     setEditingUser(null);
//     setActiveMenu('administracao');
//   }
//   function handleDeleteUser(id) {
//     setUsuarios((prev) => prev.filter((u) => u.id !== id));
//   }

//   // Sair da conta: limpa o estado da sessão e volta para o login
//   function handleLogout() {
//     docsVisited.current = false;
//     setAnalysisDoc(null);
//     setValidationDoc(null);
//     setEditingUser(null);
//     setActiveMenu('login');
//   }
//   function handleLogin() {
//     setActiveMenu('dashboard');
//   }

//   function renderScreen() {
//     const common = { activeMenu, onNavigate: handleNavigate };

//     switch (activeMenu) {
//       case 'login':
//         return <Login onLogin={handleLogin} />;
//       case 'validacao':
//         return (
//           <CentralDeValidacao
//             key={validationDoc ? validationDoc.id : 'sem-documento'}
//             activeMenu="documentos"
//             onNavigate={handleNavigate}
//             doc={validationDoc}
//             onBack={() => handleNavigate('documentos')}
//             onSave={handleSaveValidation}
//             onDelete={handleDeleteValidation}
//           />
//         );
//       case 'importar':
//         return (
//           <ImportarDocumentos
//             activeMenu="documentos"
//             onNavigate={handleNavigate}
//             onBack={() => handleNavigate('documentos')}
//             onImport={handleImport}
//           />
//         );
//       case 'analise':
//         return (
//           <AnaliseDeDocumentos
//             key={analysisDoc ? analysisDoc.id : 'sem-documento'}
//             activeMenu="documentos"
//             onNavigate={handleNavigate}
//             doc={analysisDoc}
//             onBack={() => handleNavigate('documentos')}
//             onSaveAnalysis={handleSaveAnalysis}
//           />
//         );
//       case 'atendimentos':
//         return (
//           <CentralDeAtendimentos
//             {...common}
//             onAddAtendimento={handleAddAtendimento}
//             onOpenAtendimento={handleOpenAtendimento}
//           />
//         );
//       case 'integracoes':
//         return <Integracoes {...common} />;
//       case 'administracao':
//         return (
//           <Administracao
//             {...common}
//             usuarios={usuarios}
//             onAddUser={handleAddUser}
//             onEditUser={handleEditUser}
//             onDeleteUser={handleDeleteUser}
//           />
//         );
//       case 'cadastroUsuario':
//         return (
//           <CadastroUsuario
//             key={editingUser ? editingUser.id : 'novo-usuario'}
//             usuario={editingUser}
//             onSubmit={handleSaveUser}
//             onCancel={handleCancelUser}
//           />
//         );
//       case 'perfil':
//         return <MeuPerfil {...common} onLogout={handleLogout} />;
//       case 'dashboard':
//       default:
//         return (
//           <Dashboard
//             {...common}
//             onSeeAllActivities={() => handleNavigate('documentos')}
//             onOpenProfile={() => handleNavigate('perfil')}
//           />
//         );
//     }
//   }

//   return (
//     <>
//       <StatusBar style={colors.statusBar} />
//       {docsVisited.current && (
//         <View style={{ flex: 1, display: activeMenu === 'documentos' ? 'flex' : 'none' }}>
//           <CentralDeDocumentos
//             activeMenu="documentos"
//             onNavigate={handleNavigate}
//             onAddDocument={handleAddDocument}
//             onOpenValidation={handleOpenValidation}
//             onOpenAnalysis={handleOpenAnalysis}
//             overrides={docOverrides}
//           />
//         </View>
//       )}
//       {activeMenu !== 'documentos' && renderScreen()}
//     </>
//   );
// }

// export default function App() {
//   return (
//     <PreferencesProvider>
//       <AppContent />
//     </PreferencesProvider>
//   );
// }
import Cadastro from './Components/cadastro/Cadastro';
import Dashboard from './Components/dashboard/Dashboard';
import Importacao from './Components/importacao/Importacao';
import Login from './Components/login/Login';
import Analise from './Components/analise/Analise';
import Validacao from "./Components/validacao/Validacao";
import Dados from './Components/dados/Dados';
import Administracao from './Components/administracao/Administracao';
import { SafeAreaView } from 'react-native-web';
import styles from './Styles';
import Perfil from './Components/perfil/Perfil';
import Atendimento from './Components/atendimento/Atendimento';
import Integracoes from './Components/integracoes/Integracoes';
import { TemaProvider } from './Components/tema/TemaContext';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <TemaProvider>
        {/* <Login /> */}
        {/* <Cadastro /> */}
        {/* <Dashboard /> */}
        {/* <Importacao /> */}
        {/* <Analise /> */}
        {/* <Validacao /> */}
        {/* <Dados /> */}
        {/* <Administracao /> */}
        <Perfil />
        {/* <Atendimento /> */}
        {/* <Integracoes /> */}
      </TemaProvider>
    </SafeAreaView>
  );
}
