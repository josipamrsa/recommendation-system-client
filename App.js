import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PreporukaUpit from './screens/PreporukaUpit';

export default function App() {
  return (
    <View style={styles.container}>
      <PreporukaUpit />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
  },
});
