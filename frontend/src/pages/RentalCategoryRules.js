import React from "react";
import { Container, Row, Col, Card, Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const RentalCategoryRules = () => {
    const sections = [
        {
            title: "1. Phạm vi áp dụng",
            content: `Quy định này áp dụng cho danh mục "Nhà Cho Thuê" trên nền tảng Simi Việt Nam, bao gồm các loại nhà ở như nhà riêng, biệt thự, nhà phố, hoặc nhà nguyên căn được đăng cho mục đích thuê. Người đăng tin và người thuê phải tuân thủ các quy định dưới đây để đảm bảo tính minh bạch và hợp pháp.`,
        },
        {
            title: "2. Đối tượng được phép đăng tin nhà cho thuê",
            content: `- Chủ sở hữu hợp pháp của ngôi nhà hoặc người được ủy quyền hợp pháp.
- Người đăng tin phải cung cấp giấy tờ chứng minh quyền sở hữu hoặc ủy quyền (nếu được yêu cầu).
- Chịu trách nhiệm hoàn toàn về tính chính xác và hợp pháp của thông tin nhà cho thuê.`,
        },
        {
            title: "3. Yêu cầu thông tin khi đăng tin",
            content: `- **Tiêu đề**: Rõ ràng, mô tả chính xác loại nhà (ví dụ: "Nhà phố 3 tầng cho thuê tại Quận 1").
- **Mô tả chi tiết**: Diện tích, số phòng ngủ/phòng tắm, tiện ích (điều hòa, nội thất, bãi đỗ xe, v.v.), địa chỉ cụ thể, giá thuê (bao gồm hoặc không bao gồm phí dịch vụ).
- **Hình ảnh**: Tối thiểu 3 ảnh thực tế của ngôi nhà (ngoại thất, phòng khách, phòng ngủ, hoặc khu vực chính).
- **Thông tin liên hệ**: Số điện thoại, email, hoặc thông tin liên lạc khác phải chính xác và liên tục khả dụng.`,
        },
        {
            title: "4. Quy định về hình ảnh nhà cho thuê",
            content: `- Hình ảnh phải phản ánh đúng tình trạng thực tế của ngôi nhà.
- Không sử dụng ảnh chỉnh sửa quá mức, ảnh minh họa, hoặc ảnh từ nguồn không liên quan.
- Không chèn số điện thoại, logo, hoặc nội dung quảng cáo không liên quan vào ảnh.
- Hình ảnh có nội dung phản cảm, khiêu dâm hoặc vi phạm thuần phong mỹ tục sẽ bị xóa.`,
        },
        {
            title: "5. Các hành vi không được phép",
            content: `- Đăng tin trùng lặp về cùng một ngôi nhà.
- Cung cấp thông tin sai lệch về diện tích, giá cả, hoặc tình trạng nhà.
- Đăng tin nhà không tồn tại hoặc đã được cho thuê.
- Sử dụng danh mục "Nhà Cho Thuê" để quảng cáo các dịch vụ/sản phẩm không liên quan.`,
        },
        {
            title: "6. Kiểm duyệt và thời hạn tin đăng",
            content: `- Tin đăng sẽ được kiểm duyệt trong vòng 24 giờ làm việc kể từ khi gửi.
- Tin hợp lệ sẽ có hiệu lực trong 30 ngày kể từ ngày được duyệt.
- Tin vi phạm quy định sẽ bị xóa mà không cần thông báo trước.
- Người đăng có thể gia hạn tin nếu nhà vẫn chưa được cho thuê.`,
        },
        {
            title: "7. Trách nhiệm của người đăng tin",
            content: `- Cập nhật thông tin kịp thời khi có thay đổi (giá thuê, tình trạng nhà, v.v.).
- Xóa tin ngay khi ngôi nhà đã được cho thuê hoặc không còn khả dụng.
- Chịu trách nhiệm pháp lý nếu cung cấp thông tin sai lệch dẫn đến tranh chấp hoặc thiệt hại.`,
        },
        {
            title: "8. Quyền của Simi Việt Nam",
            content: `- Chỉnh sửa, ẩn hoặc xóa tin đăng không tuân thủ quy định.
- Tạm khóa hoặc chấm dứt tài khoản của người dùng vi phạm nhiều lần.
- Yêu cầu người đăng cung cấp giấy tờ xác minh quyền sở hữu/ủy quyền nếu cần.
- Hợp tác với cơ quan chức năng trong trường hợp có yêu cầu điều tra liên quan đến tin đăng.`,
        },
        {
            title: "9. Liên hệ hỗ trợ",
            content: `Mọi thắc mắc hoặc yêu cầu hỗ trợ liên quan đến quy định danh mục "Nhà Cho Thuê", vui lòng liên hệ:
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
                        Quy Định Danh Mục Nhà Cho Thuê
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

export default RentalCategoryRules;
