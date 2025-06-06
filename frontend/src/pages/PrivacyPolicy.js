import React from "react";
import { Container, Row, Col, Card, Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PrivacyPolicy = () => {
    return (
        <Container
            className="my-5"
            style={{
                fontFamily: "'Noto Sans TC', sans-serif",
                color: "#1989a8",
                userSelect: "none",
            }}
        >
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <h1 className="text-center mb-4">Chính Sách Bảo Mật</h1>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        1. Mục đích và phạm vi thu thập
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <h5>Mục đích:</h5>
                                        <ul>
                                            <li>
                                                Thực hiện và quản lý các giao
                                                dịch mua bán, thanh toán.
                                            </li>
                                            <li>
                                                Hỗ trợ khách hàng khi sử dụng
                                                dịch vụ hoặc phát sinh tranh
                                                chấp.
                                            </li>
                                            <li>
                                                Gửi thông báo về các chương
                                                trình khuyến mãi, ưu đãi đặc
                                                biệt.
                                            </li>
                                            <li>
                                                Nâng cao trải nghiệm người dùng
                                                và cải tiến sản phẩm, dịch vụ.
                                            </li>
                                        </ul>
                                        <h5>Thông tin thu thập:</h5>
                                        <ul>
                                            <li>Họ tên</li>
                                            <li>Email</li>
                                            <li>Số điện thoại</li>
                                            <li>Địa chỉ</li>
                                            <li>Thông tin tài khoản</li>
                                            <li>Lịch sử giao dịch</li>
                                            <li>
                                                Hành vi sử dụng dịch vụ trên nền
                                                tảng
                                            </li>
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>
                                        2. Phạm vi sử dụng thông tin
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <h5>Mục đích sử dụng:</h5>
                                        <ul>
                                            <li>
                                                Hỗ trợ khách hàng khi cần thiết
                                                hoặc theo yêu cầu.
                                            </li>
                                            <li>
                                                Gửi thông tin về sản phẩm mới,
                                                cập nhật dịch vụ hoặc thay đổi
                                                điều khoản.
                                            </li>
                                            <li>
                                                Phân tích dữ liệu để cải tiến
                                                sản phẩm, tối ưu trải nghiệm
                                                người dùng.
                                            </li>
                                            <li>
                                                Ngăn chặn và xử lý hành vi gian
                                                lận, vi phạm quy định của nền
                                                tảng.
                                            </li>
                                            <li>
                                                Thực hiện nghĩa vụ pháp lý khi
                                                có yêu cầu từ cơ quan chức năng.
                                            </li>
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>
                                        3. Thời gian lưu trữ thông tin
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <h5>Thời gian lưu trữ:</h5>
                                        <ul>
                                            <li>
                                                Cho đến khi người dùng yêu cầu
                                                xóa thông tin cá nhân.
                                            </li>
                                            <li>
                                                Cho đến khi thông tin không còn
                                                cần thiết cho mục đích sử dụng.
                                            </li>
                                            <li>
                                                Cho đến khi hết thời gian lưu
                                                trữ theo quy định của pháp luật
                                                Việt Nam.
                                            </li>
                                        </ul>
                                        <div>
                                            <strong>Lưu ý:</strong> Thông tin
                                            được bảo mật trong suốt quá trình
                                            lưu trữ.
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>
                                        4. Đơn vị quản lý thông tin
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                            <strong>Tổ chức:</strong> Simi Việt
                                            Nam
                                        </div>
                                        <div>
                                            <strong>Địa chỉ:</strong> Số 123,
                                            Đường ABC, Phường DEF, Quận GHI, TP.
                                            Hồ Chí Minh
                                        </div>
                                        <div>
                                            <strong>Email:</strong>{" "}
                                            simi.contact@gmail.com
                                        </div>
                                        <div>
                                            <strong>Hotline:</strong> +84 912
                                            380 012
                                        </div>
                                        <div>
                                            <strong>Hỗ trợ:</strong> Liên hệ bộ
                                            phận hỗ trợ để giải đáp thắc mắc về
                                            việc thu thập và sử dụng dữ liệu.
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="4">
                                    <Accordion.Header>
                                        5. Quyền của người dùng
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <h5>Quyền lợi:</h5>
                                        <ul>
                                            <li>
                                                Yêu cầu truy cập, kiểm tra thông
                                                tin cá nhân đã cung cấp.
                                            </li>
                                            <li>
                                                Chỉnh sửa thông tin không chính
                                                xác hoặc không đầy đủ.
                                            </li>
                                            <li>
                                                Yêu cầu ngừng sử dụng hoặc xóa
                                                dữ liệu cá nhân khỏi hệ thống.
                                            </li>
                                            <li>
                                                Rút lại sự đồng ý với chính sách
                                                bảo mật bất kỳ lúc nào.
                                            </li>
                                        </ul>
                                        <div>
                                            <strong>Quy trình:</strong> Yêu cầu
                                            có thể được thực hiện qua email đến
                                            bộ phận chăm sóc khách hàng hoặc sử
                                            dụng công cụ tự quản lý tài khoản
                                            trên nền tảng.
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="5">
                                    <Accordion.Header>
                                        6. Cam kết bảo mật
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <h5>Biện pháp:</h5>
                                        <ul>
                                            <li>
                                                Áp dụng công nghệ mã hóa dữ liệu
                                                chuẩn quốc tế.
                                            </li>
                                            <li>
                                                Thiết lập hệ thống kiểm soát
                                                truy cập nội bộ nghiêm ngặt.
                                            </li>
                                            <li>
                                                Đào tạo nhân viên về bảo mật và
                                                quyền riêng tư.
                                            </li>
                                            <li>
                                                Không chia sẻ, tiết lộ thông tin
                                                cho bên thứ ba trừ khi có yêu
                                                cầu hợp pháp từ cơ quan có thẩm
                                                quyền.
                                            </li>
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="6">
                                    <Accordion.Header>
                                        7. Sự chấp thuận và thay đổi chính sách
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                            <strong>Chấp thuận:</strong> Bằng
                                            việc sử dụng dịch vụ, người dùng xác
                                            nhận đã đọc, hiểu và đồng ý với
                                            Chính sách bảo mật này.
                                        </div>
                                        <div>
                                            <strong>Cập nhật:</strong> Chính
                                            sách có thể được cập nhật để phản
                                            ánh thay đổi về pháp luật, công nghệ
                                            hoặc hoạt động kinh doanh. Các thay
                                            đổi sẽ được thông báo công khai trên
                                            trang web.
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PrivacyPolicy;
