import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
});
