# BÀI TEST TRAN QUOC VUONG - CREASIA

## Dự án sử dụng:

- [axios](https://github.com/axios/axios) for networking.
- [react-navigation](https://reactnavigation.org/) navigation library.
- [react-context]: sử dụng để lưu trữ giá trị global state
- [AsyncStorate]: Lưu trữ Token sau khi đăng nhập
- [MirageJS]: Giả lập api

## Cấu trúc thư mục

- `src`: Thư mục chứa file bài làm.
- `function`: Thư mục chứa các function dùng chung.
- `screens`: Thư mục chứa màn hình (Đăng nhập và Cập nhật thông tin profile).
- `mockData`: Thư mục chứa code api giả lập.
- `service`: Thư mục chứa code config [axios].

- `App.tsx`: Component chính chứa các logic chính.

## MockData [MirageJS]

- 2 account được tạo sẵn để sử dụng

* 001A/123456 và 002B/123123

- `function.ts`: Chứa hàm hash mật khẩu đơn giản.
- `user`: Thư mục chứa code tạo 3 api: đăng nhập, lấy thông tin người dùng và cập nhật thông tin người dùng.

- Ở api đăng nhập: Khi đăng nhập sẽ hash mật khẩu để so sánh với data có trong db. Sau đó trả về cho người dùng token (`id` người dùng) dùng để lấy dữ liệu trong quá trình get 2 api lấy thông tin và cập nhật thông tin.
