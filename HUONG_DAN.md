# THỊ THÀNH'S ENGLISH CORNER 🎀 — HƯỚNG DẪN TRIỂN KHAI

## 0. Những gì đã có sẵn

- 8 bài `TEST 1 _ G9` đến `TEST 8 _ G9` (**182 câu**) trong thư mục `data/`, được chuyển từ ZIP đã gửi.
- Câu phát âm có gạch chân, ảnh biển báo nằm trong `data/assets/`, đoạn đọc hiểu, trắc nghiệm ABCD, câu viết lại.
- Trang giáo viên tạo, sửa, xóa, ẩn/đăng bài; nhập câu từng câu hoặc Excel; nhập danh sách lớp Excel.
- Học sinh đăng nhập bằng mã và mật khẩu, được làm bài không giới hạn, nhận đáp án và giải thích.
- Firebase lưu **điểm lần đầu, điểm cao nhất, số lần làm, thời gian hoàn thành**; giáo viên lọc đã làm/chưa làm theo bài và lớp, xuất CSV.
- Nếu **chưa kết nối Firebase**, trang web hoạt động ở **chế độ xem thử**: học sinh có thể mở 8 bài, nhưng **không lưu điểm**, quản trị không khả dụng.

## 1. Xem thử trên máy tính

Trong thư mục chứa `index.html`, mở terminal và chạy:

```bash
python -m http.server 8000
```

Vào `http://localhost:8000`. **Không mở `index.html` bằng cách nhấp đúp vào file** vì trình duyệt có thể chặn tải JSON khi chạy qua `file://`.

## 2. Tạo dự án Firebase miễn phí

1. Vào **https://console.firebase.google.com/** → **Create a project**. Chọn gói **Spark** (không cần kích hoạt thanh toán).
2. Vào **Build → Authentication → Sign-in method** → bật **Email/Password** (không cần bật Email link).
3. Vào **Build → Firestore Database → Create database** → chọn bản **Standard**, tạo database `(default)` ở khu vực gần người dùng; **không dùng Test mode để vận hành thật**.
4. Trong **Firestore Database → Rules**, dán toàn bộ nội dung file `firestore.rules`, nhấn **Publish**.
5. Trong **Project settings → Your apps** tạo **Web app** (biểu tượng `</>`), lấy `firebaseConfig`.
6. Mở `firebase-config.js` và thay 4 trường `apiKey`, `authDomain`, `projectId`, `appId` bằng giá trị chính xác Firebase cung cấp. `apiKey` của Web app là thông số cấu hình công khai, không phải mật khẩu quản trị; **bảo mật phải được thực hiện bằng Authentication và Firestore Rules**.

## 3. Tạo quyền giáo viên quản trị (rất quan trọng)

1. Firebase → **Authentication → Users → Add user**.
2. Tạo email và mật khẩu riêng của giáo viên (email thật để dễ quản lý). Ghi lại **User UID** của tài khoản vừa tạo.
3. Firebase → **Firestore Database → Data** → **Start collection**:
   - Collection ID: `admins`
   - Document ID: **UID vừa tạo ở bước 2 (đúng từng ký tự)**
   - Thêm field `role` kiểu string = `teacher`
4. Dùng email và mật khẩu giáo viên đăng nhập ở website → chọn **Giáo viên**.
5. **Không tạo admin bằng thao tác từ website**: quyền này chỉ cấp từ Firebase Console. Firestore Rules đã chặn tạo/sửa/xóa document admin qua trình duyệt.

## 4. Đưa website lên GitHub Pages

1. Vào GitHub → tạo **repository** mới; để **Public** nếu dùng GitHub Pages miễn phí trên tài khoản GitHub Free.
2. Upload **toàn bộ các file và thư mục ở cấp ngoài cùng** (`index.html`, `styles.css`, `app.js`, `firebase-config.js`, `firestore.rules`, `data/`, `mau-cau-hoi.csv`) trực tiếp vào thư mục gốc của repository. Thư mục `source/` chỉ để đối chiếu ZIP gốc; có thể bỏ qua khi upload.
3. Vào repository → **Settings → Pages → Build and deployment → Deploy from a branch → main → /(root) → Save**.
4. Website có địa chỉ dạng `https://TEN-GITHUB.github.io/TEN-REPOSITORY/`.
5. Firebase Console → Authentication → Settings → **Authorized domains** → thêm `TEN-GITHUB.github.io` nếu cần đăng nhập bằng domain đó.
6. Mở website, đăng nhập giáo viên và thực hiện các bước bên dưới.

**Sau khi website đã online, thêm/sửa bài kiểm tra qua Admin sẽ lưu thẳng vào Firestore; không cần đụng vào GitHub.** Chỉ khi muốn đổi chức năng hay giao diện mới cập nhật mã nguồn.

## 5. Nhập 8 đề của bạn

1. Đăng nhập giáo viên → **Quản trị → Quản lý đề**.
2. Nhấn **🎁 Nhập 8 bài TEST từ ZIP**.
3. Website sẽ tải 8 bài đã chuẩn hóa trong `data/test-1-g9.json` … `data/test-8-g9.json` lên Firebase, **chỉ nhập các bài chưa tồn tại**, không ghi đè đề đã chỉnh sửa.
4. Kiểm tra Test 1–3 (ảnh, gạch chân), Test 5–7 (đoạn văn), Test 8 (viết lại câu) trước khi cấp cho học sinh.
5. Với đề mới: **Tạo bài mới** hoặc **Nhập bài từ Excel**. Trong file Excel, các cột đề xuất là `question, A, B, C, D, answer, explanation, type, passage, image, prompt, answer_text`. Tải `mau-cau-hoi.csv` (mở bằng Excel) để tham khảo.

Lưu ý:
- Trong file Excel, cột `answer` dùng A/B/C/D cho câu trắc nghiệm; với câu viết lại, dùng `answer_text` để chứa đáp án mẫu (có thể để `answer` trống).
- Phần gạch chân: gõ `<u>đoạn cần gạch chân</u>` trong ô nội dung hoặc phương án.
- Đường dẫn ảnh cho đề gốc được kèm trong `data/assets/`. Nếu thêm hình mới, đưa ảnh lên kho lưu trữ HTTPS đáng tin cậy rồi dùng URL trong cột `image`. Phiên bản hiện tại **chưa hỗ trợ tải hình mới trực tiếp lên Firebase Storage** để tránh chi phí.
- Không đặt bảng Excel có mật khẩu vào kho GitHub công khai.

## 6. Nhập học sinh từ Excel — biết chính xác ai đã làm/chưa làm

Giáo viên → **Danh sách lớp → Tải file Excel mẫu** (được tải dưới dạng CSV, có thể mở bằng Excel).

Tên cột chuẩn:

| code | name | className | password |
|---|---|---|---|
| TT9A1-001 | Nguyễn Văn A | 9A1 | *(để trống)* |
| TT9A1-002 | Trần Thị B | 9A1 | *(để trống)* |

- `code` bắt buộc **không dấu, không khoảng trắng**, chỉ chữ, số, dấu `-`; **không trùng giữa các học sinh**. Mỗi em có mã cố định (ví dụ `TT9A1-001`).
- `password` nếu để trống sẽ được hệ thống tạo ngẫu nhiên.
- Nhấn **Nhập danh sách Excel** và chọn file `.xlsx`, `.xls` hoặc `.csv`.
- Sau quá trình tạo, trình duyệt tải về `tai-khoan-hoc-sinh.csv` gồm mã, tên, lớp, mật khẩu, trạng thái tạo. **Lưu file ở nơi riêng tư**, không phát toàn bộ danh sách cho học sinh; giáo viên cấp thông tin từng em.
- Mã được chuyển đổi nội bộ thành tài khoản email giả phục vụ Firebase Auth; học sinh chỉ cần nhập mã và mật khẩu.
- Nếu tạo 500 tài khoản cùng lúc, có thể gặp hạn mức tạo tài khoản Firebase theo địa chỉ IP: hãy chia lô và xem những dòng lỗi trong CSV; không nhập lại nguyên cả lô mà không kiểm tra.
- **Mất mật khẩu:** bản hiện tại chưa có tính năng tự đặt lại mật khẩu học sinh trong Admin (Firebase Web SDK không được quyền đổi mật khẩu tài khoản khác). Giáo viên cần hỗ trợ qua Firebase Console hoặc nâng cấp backend có phân quyền để reset an toàn.

## 7. Theo dõi và xuất điểm

- Giáo viên → **Đã làm / Chưa làm** → chọn TEST → chọn lớp. Có bảng tất cả học sinh đã nhập, kể cả các em **chưa từng đăng nhập hoặc chưa làm bài**.
- Theo dõi **trạng thái, số lần làm, điểm lần đầu, điểm cao nhất, thời gian của lần đạt điểm cao nhất**.
- **Xuất CSV** để mở bằng Excel.
- **Lịch sử điểm** xem tối đa 200 lượt nộp gần nhất mỗi lần, lọc theo bài.
- Bảng xếp hạng **Top 50** theo điểm tốt nhất rồi tới thời gian nhanh nhất. Để bảo vệ học sinh, trang công khai chỉ dùng **mã học sinh**, không hiển thị họ tên đầy đủ.
- Lưu ý: hiện tại giáo viên có thể đổi tên/lớp trong Firebase Console nhưng website chưa hỗ trợ sửa lớp/họ tên hay đặt lại mật khẩu ngay trên Admin.

## 8. Giới hạn và an toàn

1. **Đây là công cụ luyện tập, không phải hệ thống thi chống gian lận.** Chấm điểm phía trình duyệt; người biết kỹ thuật có thể can thiệp điểm hoặc xem đáp án trong dữ liệu đề. Firestore Rules chỉ hạn chế quyền truy cập, **không thể xác thực một điểm số có thực sự được tính từ bài làm**. Nếu dùng cho kiểm tra chính thức, cần triển khai chấm bài phía máy chủ, ẩn đáp án và xác thực kết quả.
2. Câu viết lại (Test 8) hiện được so khớp với **đáp án mẫu** sau khi bỏ qua khác biệt dấu câu, hoa/thường, khoảng trắng. Đáp án tương đương nhưng diễn đạt khác có thể bị tính sai; **giáo viên phải kiểm tra**. Không dùng điểm chấm máy Test 8 làm điểm chính thức.
3. Chưa có tính năng tải hình trực tiếp lên website, chưa hỗ trợ chỉnh sửa mật khẩu học sinh hoặc xóa toàn bộ lịch sử kết quả qua giao diện Admin.
4. Firebase Spark có hạn mức; mỗi lần nộp tạo ~3 document writes (lịch sử, tiến độ và xếp hạng). 500 em x 5 bài/ngày ≈ 7.500 writes/ngày, chưa tính những lượt ghi khác. Đọc dữ liệu trong bảng xếp hạng, câu hỏi và lịch sử cũng tiêu tốn hạn mức; theo dõi **Firebase Console → Usage**.
5. **Không công khai thông tin cá nhân** ngoài lớp và tên hiệu mà giáo viên đã duyệt; tài khoản học sinh và thông tin đăng nhập chỉ cấp trực tiếp cho từng em.
6. Firebase Auth dùng nhà cung cấp Email/Password; việc tạo tài khoản từ trình duyệt có thể bị giới hạn bởi quota/rate limit của Firebase, và người bên ngoài có thể tự tạo tài khoản Auth nếu biết cấu hình. Tuy nhiên, Firestore Rules không cho tài khoản chưa có hồ sơ học sinh vào dữ liệu lớp. Muốn chặn hoàn toàn hành vi tạo Auth ngoài giáo viên, cần bổ sung backend/Identity Platform phù hợp.
7. Cần có các Firestore composite indexes nếu Firebase thông báo `The query requires an index`: mở link mà thông báo lỗi cung cấp để tạo chỉ mục, thường gồm `leaderboards (testId ASC, bestScore DESC)` và `attempts (testId ASC, createdAt DESC)`.

## 9. Nếu xảy ra lỗi

- **Trang không hiện bài:** mở web qua HTTP/HTTPS, kiểm tra `data/manifest.json`; giáo viên đã bấm nhập 8 đề chưa; đề có `published: true` chưa.
- **Đăng nhập báo lỗi:** kiểm tra Authentication Email/Password đã bật; mã học sinh chính xác, Auth user tồn tại, Firestore `students/{uid}` đã được tạo.
- **Giáo viên không thấy Admin:** kiểm tra collection `admins` và đúng UID từ Authentication.
- **`Missing or insufficient permissions`:** kiểm tra đã Publish `firestore.rules` đúng project/database chưa; tài khoản đã có quyền chưa.
- **`The query requires an index`:** truy cập đường dẫn tạo index trong thông báo lỗi của Firebase rồi tải lại.
- **Excel không đọc được:** cần Internet để tải thư viện SheetJS từ CDN. Sử dụng `.xlsx`, `.xls`, `.csv` chuẩn với hàng đầu là tiêu đề cột.
- **Đề quá lớn (1 MiB Firestore doc):** chia thành nhiều bài nhỏ hoặc nâng cấp cấu trúc lưu mỗi câu ở tài liệu riêng.

## 10. Cấu trúc file

```
index.html              Giao diện trang web
styles.css              Màu hồng pastel, responsive
app.js                  Toàn bộ các tính năng học sinh + Admin
firebase-config.js      Cấu hình Firebase của bạn
firestore.rules         Quy tắc phân quyền (dán vào Firebase)
mau-cau-hoi.csv         Mẫu nhập câu hỏi từ Excel
data/manifest.json      Danh sách 8 TEST
data/test-1-g9.json      Dữ liệu TEST 1
...
data/test-8-g9.json      Dữ liệu TEST 8
data/assets/            Ảnh biển báo gốc
source/                 Bộ HTML, JSON, Excel trong ZIP gốc (chỉ để đối chiếu)
```
