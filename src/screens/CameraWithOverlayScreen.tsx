// src/screens/CameraWithOverlayScreen.tsx
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import UserAxios from '../axiosInstance/UserAxios';

// 파일 uri 항상 file:// prefix 보장
const getFileUri = (uri: string) => {
  if (!uri.startsWith('file://')) return 'file://' + uri;
  return uri;
};

export default function CameraWithOverlayScreen({ navigation }: any) {
  const [hasPermission, setHasPermission] = useState(false);
  const [permissionChecked, setPermissionChecked] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [previewUri, setPreviewUri] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back');

  useEffect(() => {
    (async () => {
      const newStatus = await Camera.requestCameraPermission();
      setHasPermission(newStatus === 'granted');
      setPermissionChecked(true);
    })();
    const timer = setTimeout(() => setShowOverlay(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!permissionChecked) {
    return (
      <View style={styles.loading}>
        <Text style={{ color: '#fff' }}>카메라 권한 확인 중...</Text>
      </View>
    );
  }
  if (device == null) {
    return (
      <View style={styles.loading}>
        <Text style={{ color: '#fff' }}>카메라 장치를 찾을 수 없습니다.</Text>
      </View>
    );
  }
  if (!hasPermission) {
    return (
      <View style={styles.loading}>
        <Text style={{ color: '#fff', padding: 20, textAlign: 'center' }}>
          ❌ 카메라 권한이 허용되지 않았습니다.{'\n'}
          설정에서 카메라 접근 권한을 허용해주세요.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 카메라 미리보기 */}
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={previewUri == null}
        photo={true}
      />

      {/* 오버레이 안내 */}
      {showOverlay && (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>
            📢 거울을 보며 동작을 시작하세요!{'\n'}
            끝에서 2초간 멈춰주세요.
          </Text>
        </View>
      )}

      {/* 하단 버튼 (재촬영 / 사진 사용) */}
      {previewUri && (
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={[styles.bottomButton, styles.retakeButton]}
            onPress={() => setPreviewUri(null)}
          >
            <Text style={styles.bottomButtonText}>재촬영</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottomButton, styles.usePhotoButton]}
            onPress={async () => {
              if (previewUri) {
                try {
                  // (선택) 앨범에 저장
                  await CameraRoll.save(getFileUri(previewUri), { type: 'photo' });

                  // ⭐️ 서버로 전송
                  const result = await UserAxios.uploadImage(getFileUri(previewUri));
                  console.log('서버 응답:', result);
                  
                  // 결과 화면 이동 (결과값을 route 파라미터로 넘김)
                  navigation.navigate('Result', {
                    result, // result 객체 전체를 params로 전달
                  });
                } catch (error: any) {
                  Alert.alert('오류', error?.message || String(error));
                }
              }
            }}
          >
            <Text style={styles.bottomButtonText}>해당 사진 사용</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 촬영 버튼 (미리보기 중에는 숨김) */}
      {!previewUri && (
        <TouchableOpacity
          style={styles.captureButton}
          disabled={isCapturing}
          onPress={async () => {
            if (isCapturing) return;
            setIsCapturing(true);
            try {
              if (camera.current) {
                const photo = await camera.current.takePhoto({
                  flash: 'off',
                  enableShutterSound: false,
                });
                setPreviewUri(photo.path);
              } else {
                Alert.alert('에러', '카메라가 준비되지 않았습니다.');
              }
            } catch (error) {
              Alert.alert(
                '촬영 중 오류 발생',
                (error && typeof error === 'object' && 'message' in error)
                  ? (error as any).message
                  : String(error)
              );
            }
            setIsCapturing(false);
          }}
        >
          <Text style={styles.captureText}>촬영</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  loading: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', paddingHorizontal: 30,
  },
  overlay: {
    position: 'absolute', top: 100, alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.6)', padding: 20, borderRadius: 10,
  },
  overlayText: { color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 26 },
  previewBox: {
    position: 'absolute',
    top: 90, left: 20, right: 20,
    alignItems: 'center',
    zIndex: 3,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 16,
    borderRadius: 16,
  },
  previewImg: { width: 140, height: 200, borderRadius: 12, backgroundColor: '#222' },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    zIndex: 4,
  },
  bottomButton: {
    paddingHorizontal: 24,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  retakeButton: {
    backgroundColor: '#555',
  },
  usePhotoButton: {
    backgroundColor: '#72ACFF',
  },
  bottomButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  captureButton: {
    position: 'absolute', bottom: 60, alignSelf: 'center', backgroundColor: '#fff',
    paddingHorizontal: 50, paddingVertical: 15, borderRadius: 30,
  },
  captureText: { color: '#000', fontSize: 18, fontWeight: 'bold' },
});