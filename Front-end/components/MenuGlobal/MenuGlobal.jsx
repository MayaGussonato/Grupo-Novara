import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './MenuGlobalStyle';

const logoImage = require('../../assets/Logo (branca).png');

const MENU_TOP = [
  { key: 'dashboard', label: 'Dashboard', icon: { lib: 'ion', name: 'grid-outline' } },
  { key: 'documentos', label: 'Documentos', icon: { lib: 'ion', name: 'document-text-outline' } },
  { key: 'atendimentos', label: 'Atendimentos', icon: { lib: 'ion', name: 'headset-outline' } },
  { key: 'integracoes', label: 'Integrações', icon: { lib: 'mci', name: 'power-plug-outline' } },
];

const MENU_BOTTOM = [
  { key: 'administracao', label: 'Administração', icon: { lib: 'ion', name: 'settings-outline' } },
  { key: 'perfil', label: 'Meu perfil', icon: { lib: 'ion', name: 'person-circle-outline' } },
];

function MenuIcon({ icon }) {
  if (icon.lib === 'mci') {
    return <MaterialCommunityIcons name={icon.name} size={20} color="#FFFFFF" />;
  }
  return <Ionicons name={icon.name} size={20} color="#FFFFFF" />;
}

function MenuItem({ item, active, onNavigate }) {
  return (
    <Pressable
      onPress={() => onNavigate?.(item.key)}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      style={({ hovered }) => [
        styles.navItem,
        active && styles.navItemActive,
        hovered && !active && styles.navItemHover,
      ]}
    >
      <View style={styles.navIcon}>
        <MenuIcon icon={item.icon} />
      </View>
      <Text style={styles.navText}>{item.label}</Text>
    </Pressable>
  );
}

export default function MenuGlobal({ activeMenu = 'dashboard', onNavigate }) {
  return (
    <View style={styles.sidebar}>
      <View>
        <Image source={logoImage} resizeMode="contain" style={styles.sidebarLogo} />
        {MENU_TOP.map((item) => (
          <MenuItem
            key={item.key}
            item={item}
            active={activeMenu === item.key}
            onNavigate={onNavigate}
          />
        ))}
      </View>
      <View style={styles.sidebarBottom}>
        {MENU_BOTTOM.map((item) => (
          <MenuItem
            key={item.key}
            item={item}
            active={activeMenu === item.key}
            onNavigate={onNavigate}
          />
        ))}
      </View>
    </View>
  );
}