// src/screens/StartScreen.tsx
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// 네비게이션 경로 정의
type RootStackParamList = {
  Start: undefined;
  Main: undefined;
};

// 현재 화면에서 사용되는 네비게이션 prop 타입 정의
type StartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Start'>;

// 컴포넌트 props 타입
type Props = {
  navigation: StartScreenNavigationProp;
};

export default function StartScreen({ navigation }: Props) {
  const goToMain = () => navigation.navigate('Main');

  return (
    <Pressable style={styles.container} onPress={goToMain}>
      <SafeAreaView style={styles.safeArea}>
        <Image
          source={require('../../assets/images/main.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </SafeAreaView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 500,
    height: 500,
  },
});
