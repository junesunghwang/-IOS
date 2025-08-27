// src/screens/MirrorCheckScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  MirrorCheck: undefined;
  CameraWithOverlay: undefined;
};

type Props = StackScreenProps<RootStackParamList, 'MirrorCheck'>;

export default function MirrorCheckScreen({ navigation }: Props) {
  // 안내 모달(팝업) 상태
  const [showGuide, setShowGuide] = useState(false);

  return (
    <View style={styles.container}>
      {/* 🔙 왼쪽 상단 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Image
          source={require('../../assets/images/left.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      {/* 맨 위 제목 */}
      <Text style={styles.title}>거울 유무 확인</Text>

      {/* 상단 텍스트 */}
      <Text style={styles.topText}>
        당신의 옆에 전신거울이 있다면{'\n'}(거울 클릭)
      </Text>
      <Text style={styles.arrow}>↓</Text>

      {/* 거울 아이콘 */}
      <TouchableOpacity
        style={styles.iconWrap}
        onPress={() => navigation.navigate('CameraWithOverlay')}
        activeOpacity={0.7}
      >
        <Image
          source={require('../../assets/images/mirror.png')}
          style={styles.mirrorImg}
        />
      </TouchableOpacity>

      {/* 아래 텍스트 */}
      <Text style={styles.bottomText}>
        없다면..{'\n'}(아래 클릭)
      </Text>
      <Text style={styles.arrow}>↓</Text>

      {/* X 아이콘 */}
      <TouchableOpacity
        style={styles.iconWrap}
        onPress={() => setShowGuide(true)}
      >
        <Image
          source={require('../../assets/images/mirror_x.png')}
          style={styles.xImg}
        />
      </TouchableOpacity>

      {/* 안내 모달 */}
      <Modal
        transparent
        visible={showGuide}
        animationType="fade"
        onRequestClose={() => setShowGuide(false)}
      >
        <View style={styles.modalBg}>
          <View style={styles.modalBox}>
            <Text style={styles.guideText}>
              정확한 측정을 위해{'\n'}전신 거울을 사용하는 것을 권장합니다.
            </Text>
            <View style={styles.modalBtnRow}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#aaa' }]}
                onPress={() => setShowGuide(false)}
              >
                <Text style={styles.modalBtnText}>돌아가기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#72ACFF' }]}
                onPress={() => {
                  setShowGuide(false);
                  setTimeout(() => navigation.navigate('CameraWithOverlay'), 250);
                }}
              >
                <Text style={styles.modalBtnText}>계속 진행</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
    paddingTop: 60, paddingBottom: 60, position: 'relative',
  },
  title: {
    position: 'absolute',
    top: 75,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    zIndex: 10,
  },
  topText: {
    fontSize: 21, fontWeight: 'bold', color: '#222', textAlign: 'center', marginBottom: 5, marginTop: 60,
  },
  arrow: {
    fontSize: 30, color: '#222', textAlign: 'center', marginVertical: 1,
  },
  iconWrap: {
    marginVertical: 2,
  },
  mirrorImg: {
    width: 200, height: 200, resizeMode: 'contain',
  },
  xImg: {
    width: 205, height: 205, resizeMode: 'contain',
  },
  bottomText: {
    fontSize: 19, color: '#222', textAlign: 'center', fontWeight: 'bold', marginTop: 35,
  },
  backBtn: {
    position: 'absolute',
    top: 70,
    left: 20,
    zIndex: 20,
  },
  backIcon: {
    width: 30,
    height: 30,
  },

  // 추가: 안내 모달 스타일
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 26,
    width: 300,
    alignItems: 'center',
  },
  guideText: {
    fontSize: 17,
    color: '#222',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: 'bold',
    lineHeight: 26,
  },
  modalBtnRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  modalBtn: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});