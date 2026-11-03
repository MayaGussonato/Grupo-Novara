
import { Platform, StyleSheet } from 'react-native';
const web = (style) => Platform.select({ web: style, default: {} });
export const styles = StyleSheet.create({
  sidebar: {
    width: 250,
    backgroundColor: '#1B4D49',
    paddingTop: 20,
    paddingBottom: 28,
    paddingHorizontal: 22,
    justifyContent: 'space-between',
  },
  sidebarLogo: {
    width: 200,
    height: 54,
    marginBottom: 52,
    marginLeft: 0,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 46,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#5E8B86',
    ...web({ cursor: 'pointer' }),
  },
  navItemActive: {  
    backgroundColor: '#2A6F68',
    borderTopWidth: 1,
    borderTopColor: '#5E8B86',
  },
  navItemHover: {
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  navIcon: {
    width: 28,
    alignItems: 'center',
    marginRight: 8,
  },
  navText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '400',
  },
  sidebarBottom: {
    marginTop: 24,
  },
});
