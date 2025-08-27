import initializeAxios from "./baseInstance";

const apiInstance = initializeAxios.initializeAxios();

const getFileUri = (uri: string) => {
  if (uri.startsWith('file://')) return uri;
  return 'file://' + uri;
};

const UserAxios = {
  uploadImage: async (imageUri: string) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: getFileUri(imageUri),
        name: 'photo.jpg',
        type: 'image/jpeg',
      } as any);

      const response = await apiInstance.post('analyze/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // interceptors에서 이미 .data만 남아있음
      return response;
    } catch (error: any) {
      console.log('[이미지 업로드 오류]', error);
      if (error.response) {
        console.log('[서버 응답]', error.response);
        throw new Error('이미지 업로드 실패: ' + JSON.stringify(error.response));
      } else if (error.request) {
        console.log('[요청만 감]', error.request);
        throw new Error('이미지 업로드 실패: 서버 응답 없음');
      } else {
        throw new Error('이미지 업로드 실패: ' + String(error));
      }
    }
  },

  getUser: async (data: any) => {
    try {
      const response = await apiInstance.post('analyze/', data);
      return response;
    } catch (error) {
      throw new Error('Failed to fetch user');
    }
  },
  getTest: async (data: any) => {
    try {
      const response = await apiInstance.post('test/', data);
      return response;
    } catch (error) {
      throw new Error('Failed to fetch user');
    }
  },
};

export default UserAxios;