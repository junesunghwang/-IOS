// src/screens/ListScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Start: undefined;
  Main: undefined;
  List: undefined;
  FlexionDetail: undefined; // ✅ 추가
};

type ListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'List'
>;

type Props = {
  navigation: ListScreenNavigationProp;
};

const motions = [
  { label: 'Flexion', desc: '굽힘', icon: '↑' },
  { label: 'Extention', desc: '폄', icon: '↓' },
  { label: 'Abduction', desc: '벌림', icon: '←' },
  { label: 'Adduction', desc: '모음', icon: '→' },
  { label: 'Ext.Rotation', desc: '외회전', icon: '↻' },
  { label: 'Int.Rotation', desc: '내회전', icon: '↺' },
];

export default function ListScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      {/* 🔙 뒤로가기 버튼 */}
      <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.backButton}>
        <Image
          source={require('../../assets/images/left.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      {/* 📝 상단 제목 */}
      <Text style={styles.headerText}>왼쪽 어깨 상세목록</Text>

      {/* 🔵 버튼 목록 */}
      {motions.map((motion, idx) => (
        <TouchableOpacity
          key={idx}
          style={styles.motionBox}
          onPress={() => {
            if (motion.label === 'Flexion') {
              navigation.navigate('FlexionDetail'); // ✅ Flexion 클릭 시만 이동
            }
          }}
        >
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>{motion.icon}</Text>
          </View>
          <View>
            <Text style={styles.label}>{motion.label}</Text>
            <Text style={styles.desc}>{motion.desc}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    backgroundColor: '#fff',
    alignItems: 'center',
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
  headerText: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    zIndex: 1,
  },
  motionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#72ACFF',
    padding: 15,
    borderRadius: 10,
    width: '85%',
    marginBottom: 30,
  },
  iconCircle: {
    backgroundColor: '#dbe5ff',
    borderRadius: 25,
    width: 50,
    height: 50,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 24,
    color: '#5a5a5a',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#101010',
  },
  desc: {
    fontSize: 14,
    color: '#101010',
  },
});