// Điền các giá trị trong Firebase Console → Project settings → Your apps → Web app.
// Để nguyên khi chỉ muốn xem bản demo không lưu dữ liệu.
export const firebaseConfig = {
  apiKey: "REPLACE_ME",
  authDomain: "REPLACE_ME",
  projectId: "REPLACE_ME",
  appId: "REPLACE_ME"
};
export const configured = firebaseConfig.apiKey !== 'REPLACE_ME' && firebaseConfig.projectId !== 'REPLACE_ME';
