import React from "react";
import { Container, Row, Col, Card, Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const UserAgreement = () => {
    const sections = [
        {
            title: "1. Chấp thuận thỏa thuận",
            content: `Bằng việc đăng ký, truy cập hoặc sử dụng dịch vụ của Simi Việt Nam, bạn đồng ý tuân thủ các điều khoản trong Thỏa Thuận Người Dùng này. Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng không sử dụng dịch vụ. Thỏa thuận này áp dụng cho tất cả người dùng, bao gồm người thuê, người cho thuê và khách truy cập nền tảng.`,
        },
        {
            title: "2. Điều kiện sử dụng dịch vụ",
            content: `- Người dùng phải từ 18 tuổi trở lên hoặc có sự đồng ý của người giám hộ hợp pháp.
- Tài khoản người dùng phải được đăng ký bằng thông tin chính xác (họ tên, email, số điện thoại).
- Mỗi người dùng chỉ được phép tạo và sử dụng một tài khoản duy nhất.
- Không sử dụng dịch vụ cho các mục đích bất hợp pháp, lừa đảo hoặc gây hại đến người khác.`,
        },
        {
            title: "3. Quyền của người dùng",
            content: `- Truy cập và sử dụng các tính năng của nền tảng theo quy định.
- Nhận hỗ trợ từ đội ngũ chăm sóc khách hàng khi gặp vấn đề.
- Đề xuất ý kiến để cải thiện dịch vụ.
- Yêu cầu chỉnh sửa hoặc xóa thông tin cá nhân theo Chính sách Bảo mật.`,
        },
        {
            title: "4. Nghĩa vụ của người dùng",
            content: `- Cung cấp thông tin chính xác, trung thực khi đăng ký và sử dụng dịch vụ.
- Tuân thủ các quy định pháp luật Việt Nam và chính sách của Simi Việt Nam.
- Không chia sẻ thông tin tài khoản hoặc cho phép người khác sử dụng tài khoản của mình.
- Thông báo ngay cho Simi Việt Nam nếu phát hiện hành vi vi phạm hoặc sử dụng trái phép tài khoản.`,
        },
        {
            title: "5. Trách nhiệm của Simi Việt Nam",
            content: `- Cung cấp dịch vụ ổn định, an toàn và tuân thủ quy định pháp luật.
- Bảo vệ thông tin cá nhân của người dùng theo Chính sách Bảo mật.
- Thông báo kịp thời về các thay đổi trong dịch vụ, điều khoản hoặc chính sách.
- Không chịu trách nhiệm cho thiệt hại phát sinh từ việc người dùng vi phạm thỏa thuận này.`,
        },
        {
            title: "6. Hạn chế trách nhiệm",
            content: `- Simi Việt Nam không chịu trách nhiệm cho các tranh chấp giữa người dùng (người thuê và người cho thuê) trừ khi được yêu cầu hỗ trợ theo quy trình giải quyết khiếu nại.
- Nền tảng không đảm bảo tính chính xác 100% của thông tin do người dùng cung cấp.
- Simi Việt Nam không chịu trách nhiệm cho thiệt hại gián tiếp hoặc ngẫu nhiên từ việc sử dụng dịch vụ.`,
        },
        {
            title: "7. Chấm dứt thỏa thuận",
            content: `Simi Việt Nam có quyền chấm dứt hoặc hạn chế quyền truy cập của người dùng nếu:
- Vi phạm các điều khoản trong thỏa thuận này.
- Có hành vi gian lận, lừa đảo hoặc gây hại đến nền tảng hoặc người dùng khác.
- Có yêu cầu từ cơ quan pháp luật có thẩm quyền.
Người dùng có thể chấm dứt thỏa thuận bằng cách xóa tài khoản hoặc liên hệ bộ phận hỗ trợ qua email simi.contact@gmail.com.`,
        },
        {
            title: "8. Sửa đổi thỏa thuận",
            content: `Simi Việt Nam có quyền cập nhật hoặc sửa đổi Thỏa Thuận Người Dùng này để phù hợp với quy định pháp luật hoặc yêu cầu vận hành. Mọi thay đổi sẽ được thông báo trên trang web hoặc qua email ít nhất 7 ngày trước khi có hiệu lực.`,
        },
        {
            title: "9. Liên hệ",
            content: `Mọi thắc mắc hoặc yêu cầu hỗ trợ liên quan đến Thỏa Thuận Người Dùng, vui lòng liên hệ:
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
                    <h1 className="text-center mb-4">Thỏa Thuận Người Dùng</h1>
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

export default UserAgreement;
