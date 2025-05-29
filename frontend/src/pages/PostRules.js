import React from "react";
import { Container, Row, Col, Card, Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PostRules = () => {
    const rules = [
        {
            title: "1. Đối tượng được phép đăng tin",
            content:
                "Chỉ những cá nhân, tổ chức có quyền sử dụng hợp pháp căn phòng hoặc bất động sản cho thuê mới được phép đăng tin. Người đăng tin phải chịu trách nhiệm hoàn toàn về tính xác thực của thông tin cung cấp.",
        },
        {
            title: "2. Thông tin bắt buộc khi đăng tin",
            content: `- Tiêu đề rõ ràng, phản ánh đúng nội dung tin.
- Mô tả chi tiết: diện tích, giá thuê, địa chỉ cụ thể, tiện ích đi kèm.
- Hình ảnh thực tế của phòng trọ, không sử dụng ảnh ảo, ảnh minh họa.
- Thông tin liên hệ chính xác: số điện thoại, email hoặc Facebook nếu có.`,
        },
        {
            title: "3. Quy định về hình ảnh",
            content: `- Hình ảnh phải rõ ràng, đúng căn phòng cho thuê.
- Không chèn số điện thoại hoặc chữ gây phản cảm vào ảnh.
- Không sử dụng ảnh có nội dung khiêu dâm, phản cảm hoặc chứa logo của đối thủ.`,
        },
        {
            title: "4. Không được phép đăng",
            content: `- Tin trùng lặp cùng nội dung.
- Tin giả, không có thật hoặc mang tính lừa đảo.
- Tin vi phạm pháp luật, đạo đức hoặc thuần phong mỹ tục Việt Nam.`,
        },
        {
            title: "5. Thời hạn và kiểm duyệt tin",
            content: `- Mỗi tin đăng có hiệu lực trong 30 ngày kể từ ngày được duyệt.
- Tin sẽ được kiểm duyệt trong vòng 24h làm việc.
- Tin vi phạm sẽ bị xoá mà không cần báo trước.`,
        },
        {
            title: "6. Trách nhiệm của người đăng tin",
            content: `- Cập nhật lại tin khi có thay đổi (giá, tình trạng phòng,...).
- Xóa tin khi phòng đã được cho thuê.
- Chịu trách nhiệm pháp lý nếu thông tin sai lệch gây hậu quả nghiêm trọng.`,
        },
        {
            title: "7. Quyền của nền tảng",
            content: `- Có quyền chỉnh sửa, ẩn, xóa tin vi phạm.
- Ngừng tài khoản của người dùng đăng tin vi phạm nhiều lần.
- Hợp tác với cơ quan chức năng khi có yêu cầu về điều tra thông tin người đăng.`,
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
                        Quy Định Đăng Tin Phòng Trọ
                    </h1>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Accordion defaultActiveKey="0">
                                {rules.map((rule, idx) => (
                                    <Accordion.Item
                                        eventKey={idx.toString()}
                                        key={idx}
                                    >
                                        <Accordion.Header>
                                            {rule.title}
                                        </Accordion.Header>
                                        <Accordion.Body
                                            style={{ whiteSpace: "pre-line" }}
                                        >
                                            {rule.content}
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

export default PostRules;
