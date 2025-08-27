// src/screens/MainScreen.tsx
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Start: undefined;
  Main: undefined;
  List: undefined;
  List2: undefined;
};

type MainScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Main'
>;

type Props = {
  navigation: MainScreenNavigationProp;
};

export default function MainScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      {/* 🔙 StartScreen으로 이동하는 버튼으로 변경 */}
      <TouchableOpacity onPress={() => navigation.navigate('Start')} style={styles.backButton}>
        <Image
          source={require('../../assets/images/left.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      {/* 🔐 Login 텍스트 */}
      <Text style={styles.loginText}>Login</Text>

      {/* 🦴 해골 이미지 */}
      <Image
        source={require('../../assets/images/skeleton.png')}
        style={styles.image}
        resizeMode="contain"
      />

      {/* 🔵🔴 관절 포인트 */}
      {/* 어깨 */}
      <TouchableOpacity onPress={() => navigation.navigate('List')} style={[styles.point, styles.blue, { top: 280, left: 105 }]} />
      <TouchableOpacity onPress={() => navigation.navigate('List2')} style={[styles.point, styles.red, { top: 280, right: 105 }]} />
      {/* 팔꿈치 */}
      <View style={[styles.point, styles.blue, { top: 390, left: 85 }]} />
      <View style={[styles.point, styles.red, { top: 390, right: 85 }]} />
      {/* 손목 */}
      <View style={[styles.point, styles.blue, { top: 475, left: 65 }]} />
      <View style={[styles.point, styles.red, { top: 475, right: 65 }]} />
      {/* 골반 */}
      <View style={[styles.point, styles.blue, { top: 480, left: 135 }]} />
      <View style={[styles.point, styles.red, { top: 480, right: 135 }]} />
      {/* 무릎 */}
      <View style={[styles.point, styles.blue, { top: 600, left: 145 }]} />
      <View style={[styles.point, styles.red, { top: 600, right: 145 }]} />
      {/* 발목 */}
      <View style={[styles.point, styles.blue, { top: 720, left: 145 }]} />
      <View style={[styles.point, styles.red, { top: 720, right: 145 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 65,
    left: 20,
    zIndex: 2,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  loginText: {
    position: 'absolute',
    top: 70,
    right: 20,
    fontSize: 18,
    color: '#000',
    zIndex: 2,
  },
  image: {
    width: 700,
    height: 700,
    marginTop: 50,
  },
  point: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    zIndex: 3,
  },
  red: {
    backgroundColor: '#fba1a1',
  },
  blue: {
    backgroundColor: '#aacbff',
  },
});