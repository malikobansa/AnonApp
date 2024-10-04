import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { theme } from '../constants/theme';

const BackButton = ({router}) => {
  return (
    <Pressable onPress={() => router.back()} style={styles.button}>
        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
    </Pressable>
  )
}

export default BackButton

const styles = StyleSheet.create({
    button: {
        alignSelf:'flex-start',
        padding: 5,
        borderRadius: theme.radius.sm,
        backgroundColor:'rgba(0,0,0,0.07)', 
    }
})