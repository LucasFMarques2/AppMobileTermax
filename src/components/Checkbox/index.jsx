import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { style } from './style'; 

export default function CustomCheckbox({ checked, onCheckboxToggle }) {
  return (
    <View style={style.checkboxContainer}>
      <TouchableOpacity 
        onPress={() => onCheckboxToggle(!checked)} 
        style={style.checkbox}
      >
        {checked ? (
          <MaterialIcons name="check-box" size={24} color="#4CAF50" />
        ) : (
          <MaterialIcons name="check-box-outline-blank" size={24} color="#B0B0B0" />
        )}
      </TouchableOpacity>
      <Text style={style.checkboxLabel}>Lembrar e-mail</Text>
    </View>
  );
}
