import React from "react";
import { Container, Row, Col, Card, Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ComplaintResolution = () => {
    const sections = [
        {
            title: "1. Mục đích của quy trình giải quyết khiếu nại",
            content: `Chúng tôi cam kết xử lý mọi khiếu nại của người dùng một cách minh bạch, công bằng và nhanh chóng nhằm đảm bảo quyền lợi của khách hàng và duy trì chất lượng dịch vụ của Simi Việt Nam. Quy trình này áp dụng cho tất cả các vấn đề liên quan đến dịch vụ, giao dịch hoặc hành vi trên nền tảng.`,
        },
        {
            title: "2. Các loại khiếu nại được tiếp nhận",
            content: `- Khiếu nại về chất lượng dịch vụ (ví dụ: thông tin phòng trọ không chính xác).
- Khiếu nại về giao dịch (ví dụ: thanh toán không thành công, hoàn tiền).
- Khiếu nại về hành vi vi phạm của người dùng khác (ví dụ: lừa đảo, thông tin sai lệch).
- Khiếu nại về lỗi kỹ thuật hoặc trải nghiệm trên nền tảng.`,
        },
        {
            title: "3. Cách thức gửi khiếu nại",
            content: `- Gửi email đến: simi.contact@gmail.com với tiêu đề "Khiếu Nại" và mô tả chi tiết vấn đề.
- Liên hệ qua hotline: +84 912 380 012 (giờ làm việc: 8:00 - 17:00, Thứ Hai đến Thứ Sáu).
- Sử dụng tính năng "Báo Cáo Vấn Đề" trực tiếp trên nền tảng.
- Cung cấp thông tin đầy đủ: tên, số điện thoại, mô tả vấn đề, và bằng chứng (nếu có, như ảnh chụp màn hình, hóa đơn).`,
        },
        {
            title: "4. Quy trình xử lý khiếu nại",
            content: `- Bước 1: Tiếp nhận khiếu nại trong vòng 24 giờ làm việc.
- Bước 2: Xác minh thông tin và liên hệ với người khiếu nại để làm rõ (nếu cần) trong vòng 48 giờ.
- Bước 3: Xử lý và đưa ra giải pháp trong vòng 5-7 ngày làm việc, tùy thuộc vào mức độ phức tạp.
- Bước 4: Thông báo kết quả qua email hoặc hotline. Nếu người dùng không hài lòng, có thể yêu cầu xem xét lại.`,
        },
        {
            title: "5. Quyền và nghĩa vụ của người khiếu nại",
            content: `**Quyền:**
- Nhận phản hồi minh bạch và kịp thời từ Simi Việt Nam.
- Yêu cầu giải thích hoặc xem xét lại kết quả xử lý khiếu nại.
- Được bảo vệ thông tin cá nhân trong quá trình xử lý.

**Nghĩa vụ:**
- Cung cấp thông tin chính xác, trung thực về vấn đề khiếu nại.
- Hợp tác cung cấp thêm thông tin hoặc bằng chứng khi được yêu cầu.
- Tuân thủ các quy định của nền tảng trong quá trình xử lý.`,
        },
        {
            title: "6. Cam kết của Simi Việt Nam",
            content: `- Xử lý khiếu nại công bằng, không thiên vị.
- Bảo mật thông tin khiếu nại, chỉ sử dụng cho mục đích xử lý.
- Hỗ trợ giải quyết tranh chấp giữa các bên liên quan (người thuê, người cho thuê).
- Tuân thủ các quy định pháp luật Việt Nam trong quá trình xử lý khiếu nại.`,
        },
        {
            title: "7. Liên hệ hỗ trợ",
            content: `Mọi thắc mắc hoặc hỗ trợ liên quan đến quy trình giải quyết khiếu nại, vui lòng liên hệ:
- **Tổ chức:** Simi Việt Nam
- **Địa chỉ:** Số 123, Đường ABC, Phường DEF, Quận GHI, TP. Hồ Chí Minh
- **Email:** simi.contact@gmail.com
- **Hotline:** +84 912 380 012`,
        },
    ];

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
                    <h1 className="text-center mb-4">
                        Quy Trình Giải Quyết Khiếu Nại
                    </h1>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Accordion defaultActiveKey="0">
                                {sections.map((section, idx) => (
                                    <Accordion.Item
                                        eventKey={idx.toString()}
                                        key={idx}
                                    >
                                        <Accordion.Header>
                                            {section.title}
                                        </Accordion.Header>
                                        <Accordion.Body
                                            style={{ whiteSpace: "pre-line" }}
                                        >
                                            {section.content}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </Accordion>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ComplaintResolution;
