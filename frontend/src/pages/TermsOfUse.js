import React from "react";
import { Container, Row, Col, Card, Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const TermsOfUse = () => {
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
                    <h1 className="text-center mb-4">Điều Khoản Sử Dụng</h1>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        1. Chấp thuận điều khoản
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                            Bằng việc truy cập hoặc sử dụng dịch
                                            vụ của chúng tôi trên nền tảng Simi
                                            Việt Nam, bạn xác nhận rằng bạn đã
                                            đọc, hiểu và đồng ý tuân thủ các
                                            Điều khoản Sử dụng này. Nếu bạn
                                            không đồng ý với bất kỳ điều khoản
                                            nào, vui lòng ngừng sử dụng dịch vụ.
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>
                                        2. Quyền và nghĩa vụ của người dùng
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <h5>Quyền:</h5>
                                        <ul>
                                            <li>
                                                Truy cập và sử dụng các dịch vụ
                                                được cung cấp trên nền tảng theo
                                                đúng quy định.
                                            </li>
                                            <li>
                                                Nhận hỗ trợ từ đội ngũ chăm sóc
                                                khách hàng khi cần thiết.
                                            </li>
                                            <li>
                                                Đề xuất ý kiến để cải thiện chất
                                                lượng dịch vụ.
                                            </li>
                                        </ul>
                                        <h5>Nghĩa vụ:</h5>
                                        <ul>
                                            <li>
                                                Cung cấp thông tin cá nhân chính
                                                xác và đầy đủ khi đăng ký hoặc
                                                sử dụng dịch vụ.
                                            </li>
                                            <li>
                                                Không sử dụng dịch vụ cho các
                                                mục đích bất hợp pháp hoặc trái
                                                với đạo đức.
                                            </li>
                                            <li>
                                                Tuân thủ các quy định pháp luật
                                                Việt Nam và chính sách của nền
                                                tảng.
                                            </li>
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>
                                        3. Quy định về sử dụng dịch vụ
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div>Người dùng cam kết không:</div>
                                        <ul>
                                            <li>
                                                Sao chép, phân phối hoặc sửa đổi
                                                nội dung của nền tảng mà không
                                                có sự cho phép.
                                            </li>
                                            <li>
                                                Sử dụng các công cụ tự động để
                                                thu thập dữ liệu hoặc gây gián
                                                đoạn hoạt động của nền tảng.
                                            </li>
                                            <li>
                                                Tạo nhiều tài khoản giả mạo hoặc
                                                sử dụng thông tin không chính
                                                xác.
                                            </li>
                                            <li>
                                                Thực hiện các hành vi gây tổn
                                                hại đến hệ thống, bao gồm tấn
                                                công mạng hoặc phát tán mã độc.
                                            </li>
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>
                                        4. Trách nhiệm của Simi Việt Nam
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <ul>
                                            <li>
                                                Cung cấp dịch vụ ổn định, an
                                                toàn và tuân thủ các quy định
                                                pháp luật.
                                            </li>
                                            <li>
                                                Bảo vệ thông tin cá nhân của
                                                người dùng theo Chính sách Bảo
                                                mật.
                                            </li>
                                            <li>
                                                Thông báo kịp thời về các thay
                                                đổi trong dịch vụ hoặc điều
                                                khoản sử dụng.
                                            </li>
                                            <li>
                                                Không chịu trách nhiệm cho các
                                                thiệt hại phát sinh từ việc sử
                                                dụng dịch vụ trái phép hoặc
                                                không tuân thủ điều khoản.
                                            </li>
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="4">
                                    <Accordion.Header>
                                        5. Chấm dứt sử dụng dịch vụ
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                            Simi Việt Nam có quyền chấm dứt hoặc
                                            hạn chế quyền truy cập của người
                                            dùng nếu:
                                        </div>
                                        <ul>
                                            <li>
                                                Vi phạm các điều khoản sử dụng
                                                này.
                                            </li>
                                            <li>
                                                Có hành vi gian lận, lừa đảo
                                                hoặc gây hại đến nền tảng hoặc
                                                người dùng khác.
                                            </li>
                                            <li>
                                                Có yêu cầu từ cơ quan pháp luật
                                                có thẩm quyền.
                                            </li>
                                        </ul>
                                        <div>
                                            Người dùng có thể tự chấm dứt sử
                                            dụng dịch vụ bằng cách xóa tài khoản
                                            hoặc liên hệ bộ phận hỗ trợ.
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="5">
                                    <Accordion.Header>
                                        6. Thay đổi điều khoản
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                            Simi Việt Nam có quyền cập nhật hoặc
                                            sửa đổi Điều khoản Sử dụng này để
                                            phù hợp với quy định pháp luật hoặc
                                            yêu cầu vận hành. Mọi thay đổi sẽ
                                            được thông báo trên trang web hoặc
                                            qua email ít nhất 7 ngày trước khi
                                            có hiệu lực.
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="6">
                                    <Accordion.Header>
                                        7. Liên hệ
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                            Mọi thắc mắc hoặc yêu cầu hỗ trợ
                                            liên quan đến Điều khoản Sử dụng,
                                            vui lòng liên hệ:
                                        </div>
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

export default TermsOfUse;
