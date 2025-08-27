// src/screens/ResultScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

// 이미지 경로는 실제 파일 위치에 맞게!
const resultImg = require('../../assets/images/princess.png');  // 중요!


type ResultScreenProps = StackScreenProps<RootStackParamList, 'Result'>;

export default function ResultScreen({ navigation, route }: ResultScreenProps) {
  const score = route?.params?.score ?? 90;
  const angle = route?.params?.angle ?? 160;
  const label = route?.params.result?.label ?? '';
  const prob = route?.params.result?.prob ?? 0;
  const { result } = route.params;
  console.log('ResultScreen params:', label);
  console.log('ResultScreen params:', prob);
  // 메시지 분기
  let message = '';
  if (angle <= 90) {
    message = '관절 각도가 90° 이하로 측정되어,\n운동 및 관리가 필요합니다.';
  } else {
    message = '관절 각도가 90° 이상으로\n관절 가동성이 우수합니다!';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>평가 결과</Text>
      <Text style={styles.emoji}>💌</Text>
      <Text style={styles.letterTitle}>자세 공주가 전하는 한 줄 편지</Text>

      {/* 일러스트 */}
      <View style={styles.illustWrap}>
        <Image source={resultImg} style={styles.illustImg} resizeMode="contain" />
      </View>

      {/* 안내 메시지 박스 */}
      <View style={styles.resultMsgBox}>
        <Text style={styles.resultMsg}>{message}</Text>
        {/* 결과 라벨만 표시 */}
        <Text style={[styles.detail, { color: label === '정상' ? '#185ce4' : 'red' }]}>
          {label && `예측 결과 : ${label}`}
        </Text>
      </View>

      {/* 하단 버튼 */}
      <View style={styles.bottomBtnWrap}>
        <TouchableOpacity
          style={[styles.bottomBtn, { backgroundColor: '#72ACFF' }]}
          onPress={() => navigation.navigate('CameraWithOverlay')}
        >
          <Text style={styles.bottomBtnText}>다시 촬영하기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.bottomBtn, { backgroundColor: '#aaa' }]}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.bottomBtnText}>홈 화면으로 돌아가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', paddingTop: 54 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 50, color: '#182a49' },
  emoji: { fontSize: 100, marginBottom: 10 },
  letterTitle: { fontSize: 25, fontWeight: 'bold', color: '#182a49', marginBottom: 18 },
  illustWrap: { alignItems: 'center', marginBottom: 18 },
  illustImg: { width: 200, height: 200 },
  resultMsgBox: {
  backgroundColor: '#CFE3FF',
  borderRadius: 12,
  paddingVertical: 40,
  paddingHorizontal: 20,
  marginBottom: 30,
  width: '85%',
  alignItems: 'center',      // 좌우 중앙
  justifyContent: 'center',  // 위아래 중앙
  // flex: 1,                // (선택) 박스가 화면에서 크게 보이게 하고 싶으면 주고, 아니면 빼도 됨
},
  resultMsg: {
    fontSize: 18,
    color: '#222',
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 30,
    marginBottom: 5,
  },
  detail: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 0,
    fontWeight: 'bold',
  },
  bottomBtnWrap: {
    width: '100%',
    position: 'absolute',
    bottom: 50,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  bottomBtn: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  bottomBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});