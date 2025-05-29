import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Policy = () => {
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
                    <h2
                        className="text-center mb-4"
                        style={{ color: "#1989a8", userSelect: "none" }}
                    >
                        Chính Sách
                    </h2>
                    <div style={{ color: "#222222" }}>
                        <Card.Body style={{ whiteSpace: "pre-line" }}>
                            <h3 className="mt-4">I. Chính Sách Bảo Mật</h3>
                            <h4>1. Mục đích và phạm vi thu thập</h4>
                            <h4>Mục đích:</h4>- Thực hiện và quản lý các giao
                            dịch mua bán, thanh toán. - Hỗ trợ khách hàng khi sử
                            dụng dịch vụ hoặc phát sinh tranh chấp. - Gửi thông
                            báo về các chương trình khuyến mãi, ưu đãi đặc biệt.
                            - Nâng cao trải nghiệm người dùng và cải tiến sản
                            phẩm, dịch vụ.
                            <h4>Thông tin thu thập:</h4>- Họ tên - Email - Số
                            điện thoại - Địa chỉ - Thông tin tài khoản - Lịch sử
                            giao dịch - Hành vi sử dụng dịch vụ trên nền tảng
                            <h4>2. Phạm vi sử dụng thông tin</h4>
                            <h4>Mục đích sử dụng:</h4>- Hỗ trợ khách hàng khi
                            cần thiết hoặc theo yêu cầu. - Gửi thông tin về sản
                            phẩm mới, cập nhật dịch vụ hoặc thay đổi điều khoản.
                            - Phân tích dữ liệu để cải tiến sản phẩm, tối ưu
                            trải nghiệm người dùng. - Ngăn chặn và xử lý hành vi
                            gian lận, vi phạm quy định của nền tảng. - Thực hiện
                            nghĩa vụ pháp lý khi có yêu cầu từ cơ quan chức
                            năng.
                            <h4>3. Thời gian lưu trữ thông tin</h4>
                            <h4>Thời gian lưu trữ:</h4>- Cho đến khi người dùng
                            yêu cầu xóa thông tin cá nhân. - Cho đến khi thông
                            tin không còn cần thiết cho mục đích sử dụng. - Cho
                            đến khi hết thời gian lưu trữ theo quy định của pháp
                            luật Việt Nam.
                            <div>
                                <strong>Lưu ý:</strong> Thông tin được bảo mật
                                trong suốt quá trình lưu trữ.
                            </div>
                            <h4>4. Đơn vị quản lý thông tin</h4>-{" "}
                            <strong>Tổ chức:</strong> Simi Việt Nam -{" "}
                            <strong>Địa chỉ:</strong> Số 123, Đường ABC, Phường
                            DEF, Quận GHI, TP. Hồ Chí Minh -{" "}
                            <strong>Email:</strong> simi.contact@gmail.com -{" "}
                            <strong>Hotline:</strong> +84 912 380 012 -{" "}
                            <strong>Hỗ trợ:</strong> Liên hệ bộ phận hỗ trợ để
                            giải đáp thắc mắc về việc thu thập và sử dụng dữ
                            liệu.
                            <h4>5. Quyền của người dùng</h4>
                            <h4>Quyền lợi:</h4>- Yêu cầu truy cập, kiểm tra
                            thông tin cá nhân đã cung cấp. - Chỉnh sửa thông tin
                            không chính xác hoặc không đầy đủ. - Yêu cầu ngừng
                            sử dụng hoặc xóa dữ liệu cá nhân khỏi hệ thống. -
                            Rút lại sự đồng ý với chính sách bảo mật bất kỳ lúc
                            nào.
                            <div>
                                <strong>Quy trình:</strong> Yêu cầu có thể được
                                thực hiện qua email đến bộ phận chăm sóc khách
                                hàng hoặc sử dụng công cụ tự quản lý tài khoản
                                trên nền tảng.
                            </div>
                            <h4>6. Cam kết bảo mật</h4>
                            <h4>Biện pháp:</h4>- Áp dụng công nghệ mã hóa dữ
                            liệu chuẩn quốc tế. - Thiết lập hệ thống kiểm soát
                            truy cập nội bộ nghiêm ngặt. - Đào tạo nhân viên về
                            bảo mật và quyền riêng tư. - Không chia sẻ, tiết lộ
                            thông tin cho bên thứ ba trừ khi có yêu cầu hợp pháp
                            từ cơ quan có thẩm quyền.
                            <h4>7. Sự chấp thuận và thay đổi chính sách</h4>
                            <div>
                                <strong>Chấp thuận:</strong> Bằng việc sử dụng
                                dịch vụ, người dùng xác nhận đã đọc, hiểu và
                                đồng ý với Chính sách bảo mật này.
                            </div>
                            <div>
                                <strong>Cập nhật:</strong> Chính sách có thể
                                được cập nhật để phản ánh thay đổi về pháp luật,
                                công nghệ hoặc hoạt động kinh doanh. Các thay
                                đổi sẽ được thông báo công khai trên trang web.
                            </div>
                            <h3 className="mt-5">II. Điều Khoản Sử Dụng</h3>
                            <h4>1. Chấp thuận điều khoản</h4>
                            Bằng việc truy cập hoặc sử dụng dịch vụ của chúng
                            tôi trên nền tảng Simi Việt Nam, bạn xác nhận rằng
                            bạn đã đọc, hiểu và đồng ý tuân thủ các Điều khoản
                            Sử dụng này. Nếu bạn không đồng ý với bất kỳ điều
                            khoản nào, vui lòng ngừng sử dụng dịch vụ.
                            <h4>2. Quyền và nghĩa vụ của người dùng</h4>
                            <h4>Quyền:</h4>- Truy cập và sử dụng các dịch vụ
                            được cung cấp trên nền tảng theo đúng quy định. -
                            Nhận hỗ trợ từ đội ngũ chăm sóc khách hàng khi cần
                            thiết. - Đề xuất ý kiến để cải thiện chất lượng dịch
                            vụ.
                            <h4>Nghĩa vụ:</h4>- Cung cấp thông tin cá nhân chính
                            xác và đầy đủ khi đăng ký hoặc sử dụng dịch vụ. -
                            Không sử dụng dịch vụ cho các mục đích bất hợp pháp
                            hoặc trái với đạo đức. - Tuân thủ các quy định pháp
                            luật Việt Nam và chính sách của nền tảng.
                            <h4>3. Quy định về sử dụng dịch vụ</h4>
                            <div>Người dùng cam kết không:</div>- Sao chép, phân
                            phối hoặc sửa đổi nội dung của nền tảng mà không có
                            sự cho phép. - Sử dụng các công cụ tự động để thu
                            thập dữ liệu hoặc gây gián đoạn hoạt động của nền
                            tảng. - Tạo nhiều tài khoản giả mạo hoặc sử dụng
                            thông tin không chính xác. - Thực hiện các hành vi
                            gây tổn hại đến hệ thống, bao gồm tấn công mạng hoặc
                            phát tán mã độc.
                            <h4>4. Trách nhiệm của Simi Việt Nam</h4>- Cung cấp
                            dịch vụ ổn định, an toàn và tuân thủ các quy định
                            pháp luật. - Bảo vệ thông tin cá nhân của người dùng
                            theo Chính sách Bảo mật. - Thông báo kịp thời về các
                            thay đổi trong dịch vụ hoặc điều khoản sử dụng. -
                            Không chịu trách nhiệm cho các thiệt hại phát sinh
                            từ việc sử dụng dịch vụ trái phép hoặc không tuân
                            thủ điều khoản.
                            <h4>5. Chấm dứt sử dụng dịch vụ</h4>
                            <div>
                                Simi Việt Nam có quyền chấm dứt hoặc hạn chế
                                quyền truy cập của người dùng nếu:
                            </div>
                            - Vi phạm các điều khoản sử dụng này. - Có hành vi
                            gian lận, lừa đảo hoặc gây hại đến nền tảng hoặc
                            người dùng khác. - Có yêu cầu từ cơ quan pháp luật
                            có thẩm quyền.
                            <div>
                                Người dùng có thể tự chấm dứt sử dụng dịch vụ
                                bằng cách xóa tài khoản hoặc liên hệ bộ phận hỗ
                                trợ.
                            </div>
                            <h4>6. Thay đổi điều khoản</h4>
                            Simi Việt Nam có quyền cập nhật hoặc sửa đổi Điều
                            khoản Sử dụng này để phù hợp với quy định pháp luật
                            hoặc yêu cầu vận hành. Mọi thay đổi sẽ được thông
                            báo trên trang web hoặc qua email ít nhất 7 ngày
                            trước khi có hiệu lực.
                            <h4>7. Liên hệ</h4>
                            <div>
                                Mọi thắc mắc hoặc yêu cầu hỗ trợ liên quan đến
                                Điều khoản Sử dụng, vui lòng liên hệ:
                            </div>
                            - <strong>Tổ chức:</strong> Simi Việt Nam -{" "}
                            <strong>Địa chỉ:</strong> Số 123, Đường ABC, Phường
                            DEF, Quận GHI, TP. Hồ Chí Minh -{" "}
                            <strong>Email:</strong> simi.contact@gmail.com -{" "}
                            <strong>Hotline:</strong> +84 912 380 012
                            <h3 className="mt-5">III. Quy Định Đăng Tin</h3>
                            <h4>1. Đối tượng được phép đăng tin</h4>
                            Chỉ những cá nhân, tổ chức có quyền sử dụng hợp pháp
                            căn phòng hoặc bất động sản cho thuê mới được phép
                            đăng tin. Người đăng tin phải chịu trách nhiệm hoàn
                            toàn về tính xác thực của thông tin cung cấp.
                            <h4>2. Thông tin bắt buộc khi đăng tin</h4>- Tiêu đề
                            rõ ràng, phản ánh đúng nội dung tin. - Mô tả chi
                            tiết: diện tích, giá thuê, địa chỉ cụ thể, tiện ích
                            đi kèm. - Hình ảnh thực tế của phòng trọ, không sử
                            dụng ảnh ảo, ảnh minh họa. - Thông tin liên hệ chính
                            xác: số điện thoại, email hoặc Facebook nếu có.
                            <h4>3. Quy định về hình ảnh</h4>- Hình ảnh phải rõ
                            ràng, đúng căn phòng cho thuê. - Không chèn số điện
                            thoại hoặc chữ gây phản cảm vào ảnh. - Không sử dụng
                            ảnh có nội dung khiêu dâm, phản cảm hoặc chứa logo
                            của đối thủ.
                            <h4>4. Không được phép đăng</h4>- Tin trùng lặp cùng
                            nội dung. - Tin giả, không có thật hoặc mang tính
                            lừa đảo. - Tin vi phạm pháp luật, đạo đức hoặc thuần
                            phong mỹ tục Việt Nam.
                            <h4>5. Thời hạn và kiểm duyệt tin</h4>- Mỗi tin đăng
                            có hiệu lực trong 30 ngày kể từ ngày được duyệt. -
                            Tin sẽ được kiểm duyệt trong vòng 24h làm việc. -
                            Tin vi phạm sẽ bị xoá mà không cần báo trước.
                            <h4>6. Trách nhiệm của người đăng tin</h4>- Cập nhật
                            lại tin khi có thay đổi (giá, tình trạng phòng,...).
                            - Xóa tin khi phòng đã được cho thuê. - Chịu trách
                            nhiệm pháp lý nếu thông tin sai lệch gây hậu quả
                            nghiêm trọng.
                            <h4>7. Quyền của nền tảng</h4>- Có quyền chỉnh sửa,
                            ẩn, xóa tin vi phạm. - Ngừng tài khoản của người
                            dùng đăng tin vi phạm nhiều lần. - Hợp tác với cơ
                            quan chức năng khi có yêu cầu về điều tra thông tin
                            người đăng.
                            <h3 className="mt-5">
                                IV. Quy Trình Giải Quyết Khiếu Nại
                            </h3>
                            <h4>
                                1. Mục đích của quy trình giải quyết khiếu nại
                            </h4>
                            Chúng tôi cam kết xử lý mọi khiếu nại của người dùng
                            một cách minh bạch, công bằng và nhanh chóng nhằm
                            đảm bảo quyền lợi của khách hàng và duy trì chất
                            lượng dịch vụ của Simi Việt Nam. Quy trình này áp
                            dụng cho tất cả các vấn đề liên quan đến dịch vụ,
                            giao dịch hoặc hành vi trên nền tảng.
                            <h4>2. Các loại khiếu nại được tiếp nhận</h4>- Khiếu
                            nại về chất lượng dịch vụ (ví dụ: thông tin phòng
                            trọ không chính xác). - Khiếu nại về giao dịch (ví
                            dụ: thanh toán không thành công, hoàn tiền). - Khiếu
                            nại về hành vi vi phạm của người dùng khác (ví dụ:
                            lừa đảo, thông tin sai lệch). - Khiếu nại về lỗi kỹ
                            thuật hoặc trải nghiệm trên nền tảng.
                            <h4>3. Cách thức gửi khiếu nại</h4>- Gửi email đến:
                            simi.contact@gmail.com với tiêu đề "Khiếu Nại" và mô
                            tả chi tiết vấn đề. - Liên hệ qua hotline: +84 912
                            380 012 (giờ làm việc: 8:00 - 17:00, Thứ Hai đến Thứ
                            Sáu). - Sử dụng tính năng "Báo Cáo Vấn Đề" trực tiếp
                            trên nền tảng. - Cung cấp thông tin đầy đủ: tên, số
                            điện thoại, mô tả vấn đề, và bằng chứng (nếu có, như
                            ảnh chụp màn hình, hóa đơn).
                            <h4>4. Quy trình xử lý khiếu nại</h4>- Bước 1: Tiếp
                            nhận khiếu nại trong vòng 24 giờ làm việc. - Bước 2:
                            Xác minh thông tin và liên hệ với người khiếu nại để
                            làm rõ (nếu cần) trong vòng 48 giờ. - Bước 3: Xử lý
                            và đưa ra giải pháp trong vòng 5-7 ngày làm việc,
                            tùy thuộc vào mức độ phức tạp. - Bước 4: Thông báo
                            kết quả qua email hoặc hotline. Nếu người dùng không
                            hài lòng, có thể yêu cầu xem xét lại.
                            <h4>5. Quyền và nghĩa vụ của người khiếu nại</h4>
                            <h4>Quyền:</h4>- Nhận phản hồi minh bạch và kịp thời
                            từ Simi Việt Nam. - Yêu cầu giải thích hoặc xem xét
                            lại kết quả xử lý khiếu nại. - Được bảo vệ thông tin
                            cá nhân trong quá trình xử lý.
                            <h4>Nghĩa vụ:</h4>- Cung cấp thông tin chính xác,
                            trung thực về vấn đề khiếu nại. - Hợp tác cung cấp
                            thêm thông tin hoặc bằng chứng khi được yêu cầu. -
                            Tuân thủ các quy định của nền tảng trong quá trình
                            xử lý.
                            <h4>6. Cam kết của Simi Việt Nam</h4>- Xử lý khiếu
                            nại công bằng, không thiên vị. - Bảo mật thông tin
                            khiếu nại, chỉ sử dụng cho mục đích xử lý. - Hỗ trợ
                            giải quyết tranh chấp giữa các bên liên quan (người
                            thuê, người cho thuê). - Tuân thủ các quy định pháp
                            luật Việt Nam trong quá trình xử lý khiếu nại.
                            <h4>7. Liên hệ hỗ trợ</h4>
                            Mọi thắc mắc hoặc yêu cầu hỗ trợ liên quan đến quy
                            trình giải quyết khiếu nại, vui lòng liên hệ: -{" "}
                            <strong>Tổ chức:</strong> Simi Việt Nam -{" "}
                            <strong>Địa chỉ:</strong> Số 123, Đường ABC, Phường
                            DEF, Quận GHI, TP. Hồ Chí Minh -{" "}
                            <strong>Email:</strong> simi.contact@gmail.com -{" "}
                            <strong>Hotline:</strong> +84 912 380 012
                            <h3 className="mt-5">V. Thỏa Thuận Người Dùng</h3>
                            <h4>1. Chấp thuận thỏa thuận</h4>
                            Bằng việc đăng ký, truy cập hoặc sử dụng dịch vụ của
                            Simi Việt Nam, bạn đồng ý tuân thủ các điều khoản
                            trong Thỏa Thuận Người Dùng này. Nếu bạn không đồng
                            ý với bất kỳ điều khoản nào, vui lòng không sử dụng
                            dịch vụ. Thỏa thuận này áp dụng cho tất cả người
                            dùng, bao gồm người thuê, người cho thuê và khách
                            truy cập nền tảng.
                            <h4>2. Điều kiện sử dụng dịch vụ</h4>- Người dùng
                            phải từ 18 tuổi trở lên hoặc có sự đồng ý của người
                            giám hộ hợp pháp. - Tài khoản người dùng phải được
                            đăng ký bằng thông tin chính xác (họ tên, email, số
                            điện thoại). - Mỗi người dùng chỉ được phép tạo và
                            sử dụng một tài khoản duy nhất. - Không sử dụng dịch
                            vụ cho các mục đích bất hợp pháp, lừa đảo hoặc gây
                            hại đến người khác.
                            <h4>3. Quyền của người dùng</h4>- Truy cập và sử
                            dụng các tính năng của nền tảng theo quy định. -
                            Nhận hỗ trợ từ đội ngũ chăm sóc khách hàng khi gặp
                            vấn đề. - Đề xuất ý kiến để cải thiện dịch vụ. - Yêu
                            cầu chỉnh sửa hoặc xóa thông tin cá nhân theo Chính
                            sách Bảo mật.
                            <h4>4. Nghĩa vụ của người dùng</h4>- Cung cấp thông
                            tin chính xác, trung thực khi đăng ký và sử dụng
                            dịch vụ. - Tuân thủ các quy định pháp luật Việt Nam
                            và chính sách của Simi Việt Nam. - Không chia sẻ
                            thông tin tài khoản hoặc cho phép người khác sử dụng
                            tài khoản của mình. - Thông báo ngay cho Simi Việt
                            Nam nếu phát hiện hành vi vi phạm hoặc sử dụng trái
                            phép tài khoản.
                            <h4>5. Trách nhiệm của Simi Việt Nam</h4>- Cung cấp
                            dịch vụ ổn định, an toàn và tuân thủ quy định pháp
                            luật. - Bảo vệ thông tin cá nhân của người dùng theo
                            Chính sách Bảo mật. - Thông báo kịp thời về các thay
                            đổi trong dịch vụ, điều khoản hoặc chính sách. -
                            Không chịu trách nhiệm cho thiệt hại phát sinh từ
                            việc người dùng vi phạm thỏa thuận này.
                            <h4>6. Hạn chế trách nhiệm</h4>- Simi Việt Nam không
                            chịu trách nhiệm cho các tranh chấp giữa người dùng
                            (người thuê và người cho thuê) trừ khi được yêu cầu
                            hỗ trợ theo quy trình giải quyết khiếu nại. - Nền
                            tảng không đảm bảo tính chính xác 100% của thông tin
                            do người dùng cung cấp. - Simi Việt Nam không chịu
                            trách nhiệm cho thiệt hại gián tiếp hoặc ngẫu nhiên
                            từ việc sử dụng dịch vụ.
                            <h4>7. Chấm dứt thỏa thuận</h4>
                            Simi Việt Nam có quyền chấm dứt hoặc hạn chế quyền
                            truy cập của người dùng nếu: - Vi phạm các điều
                            khoản trong thỏa thuận này. - Có hành vi gian lận,
                            lừa đảo hoặc gây hại đến nền tảng hoặc người dùng
                            khác. - Có yêu cầu từ cơ quan pháp luật có thẩm
                            quyền. Người dùng có thể chấm dứt thỏa thuận bằng
                            cách xóa tài khoản hoặc liên hệ bộ phận hỗ trợ qua
                            email simi.contact@gmail.com.
                            <h4>8. Sửa đổi thỏa thuận</h4>
                            Simi Việt Nam có quyền cập nhật hoặc sửa đổi Thỏa
                            Thuận Người Dùng này để phù hợp với quy định pháp
                            luật hoặc yêu cầu vận hành. Mọi thay đổi sẽ được
                            thông báo trên trang web hoặc qua email ít nhất 7
                            ngày trước khi có hiệu lực.
                            <h4>9. Liên hệ</h4>
                            Mọi thắc mắc hoặc yêu cầu hỗ trợ liên quan đến Thỏa
                            Thuận Người Dùng, vui lòng liên hệ: -{" "}
                            <strong>Tổ chức:</strong> Simi Việt Nam -{" "}
                            <strong>Địa chỉ:</strong> Số 123, Đường ABC, Phường
                            DEF, Quận GHI, TP. Hồ Chí Minh -{" "}
                            <strong>Email:</strong> simi.contact@gmail.com -{" "}
                            <strong>Hotline:</strong> +84 912 380 012
                            <h3 className="mt-5">
                                VI. Quy Định Danh Mục Nhà Cho Thuê
                            </h3>
                            <h4>1. Phạm vi áp dụng</h4>
                            Quy định này áp dụng cho danh mục "Nhà Cho Thuê"
                            trên nền tảng Simi Việt Nam, bao gồm các loại nhà ở
                            như nhà riêng, biệt thự, nhà phố, hoặc nhà nguyên
                            căn được đăng cho mục đích thuê. Người đăng tin và
                            người thuê phải tuân thủ các quy định dưới đây để
                            đảm bảo tính minh bạch và hợp pháp.
                            <h4>
                                2. Đối tượng được phép đăng tin nhà cho thuê
                            </h4>
                            - Chủ sở hữu hợp pháp của ngôi nhà hoặc người được
                            ủy quyền hợp pháp. - Người đăng tin phải cung cấp
                            giấy tờ chứng minh quyền sở hữu hoặc ủy quyền (nếu
                            được yêu cầu). - Chịu trách nhiệm hoàn toàn về tính
                            chính xác và hợp pháp của thông tin nhà cho thuê.
                            <h4>3. Yêu cầu thông tin khi đăng tin</h4>-{" "}
                            <strong>Tiêu đề:</strong> Rõ ràng, mô tả chính xác
                            loại nhà (ví dụ: "Nhà phố 3 tầng cho thuê tại Quận
                            1"). - <strong>Mô tả chi tiết:</strong> Diện tích,
                            số phòng ngủ/phòng tắm, tiện ích (điều hòa, nội
                            thất, bãi đỗ xe, v.v.), địa chỉ cụ thể, giá thuê
                            (bao gồm hoặc không bao gồm phí dịch vụ). -{" "}
                            <strong>Hình ảnh:</strong> Tối thiểu 3 ảnh thực tế
                            của ngôi nhà (ngoại thất, phòng khách, phòng ngủ,
                            hoặc khu vực chính). -{" "}
                            <strong>Thông tin liên hệ:</strong> Số điện thoại,
                            email, hoặc thông tin liên lạc khác phải chính xác
                            và liên tục khả dụng.
                            <h4>4. Quy định về hình ảnh nhà cho thuê</h4>- Hình
                            ảnh phải phản ánh đúng tình trạng thực tế của ngôi
                            nhà. - Không sử dụng ảnh chỉnh sửa quá mức, ảnh minh
                            họa, hoặc ảnh từ nguồn không liên quan. - Không chèn
                            số điện thoại, logo, hoặc nội dung quảng cáo không
                            liên quan vào ảnh. - Hình ảnh có nội dung phản cảm,
                            khiêu dâm hoặc vi phạm thuần phong mỹ tục sẽ bị xóa.
                            <h4>5. Các hành vi không được phép</h4>- Đăng tin
                            trùng lặp về cùng một ngôi nhà. - Cung cấp thông tin
                            sai lệch về diện tích, giá cả, hoặc tình trạng nhà.
                            - Đăng tin nhà không tồn tại hoặc đã được cho thuê.
                            - Sử dụng danh mục "Nhà Cho Thuê" để quảng cáo các
                            dịch vụ/sản phẩm không liên quan.
                            <h4>6. Kiểm duyệt và thời hạn tin đăng</h4>- Tin
                            đăng sẽ được kiểm duyệt trong vòng 24 giờ làm việc
                            kể từ khi gửi. - Tin hợp lệ sẽ có hiệu lực trong 30
                            ngày kể từ ngày được duyệt. - Tin vi phạm quy định
                            sẽ bị xóa mà không cần thông báo trước. - Người đăng
                            có thể gia hạn tin nếu nhà vẫn chưa được cho thuê.
                            <h4>7. Trách nhiệm của người đăng tin</h4>- Cập nhật
                            thông tin kịp thời khi có thay đổi (giá thuê, tình
                            trạng nhà, v.v.). - Xóa tin ngay khi ngôi nhà đã
                            được cho thuê hoặc không còn khả dụng. - Chịu trách
                            nhiệm pháp lý nếu cung cấp thông tin sai lệch dẫn
                            đến tranh chấp hoặc thiệt hại.
                            <h4>8. Quyền của Simi Việt Nam</h4>- Chỉnh sửa, ẩn
                            hoặc xóa tin đăng không tuân thủ quy định. - Tạm
                            khóa hoặc chấm dứt tài khoản của người dùng vi phạm
                            nhiều lần. - Yêu cầu người đăng cung cấp giấy tờ xác
                            minh quyền sở hữu/ủy quyền nếu cần. - Hợp tác với cơ
                            quan chức năng trong trường hợp có yêu cầu điều tra
                            liên quan đến tin đăng.
                            <h4>9. Liên hệ hỗ trợ</h4>
                            Mọi thắc mắc hoặc yêu cầu hỗ trợ liên quan đến quy
                            định danh mục "Nhà Cho Thuê", vui lòng liên hệ: -{" "}
                            <strong>Tổ chức:</strong> Simi Việt Nam -{" "}
                            <strong>Địa chỉ:</strong> Số 123, Đường ABC, Phường
                            DEF, Quận GHI, TP. Hồ Chí Minh -{" "}
                            <strong>Email:</strong> simi.contact@gmail.com -{" "}
                            <strong>Hotline:</strong> +84 912 380 012
                            <h3 className="mt-5">
                                VII. Quy Định Danh Mục Phòng Cho Thuê
                            </h3>
                            <h4>1. Phạm vi áp dụng</h4>
                            Quy định này áp dụng cho danh mục "Phòng Cho Thuê"
                            trên nền tảng Simi Việt Nam, bao gồm các loại phòng
                            trọ, phòng trong nhà chung cư, nhà ở, hoặc ký túc xá
                            được đăng cho mục đích thuê. Người đăng tin và người
                            thuê phải tuân thủ các quy định dưới đây để đảm bảo
                            tính minh bạch và hợp pháp.
                            <h4>
                                2. Đối tượng được phép đăng tin phòng cho thuê
                            </h4>
                            - Chủ sở hữu hợp pháp của phòng hoặc người được ủy
                            quyền hợp pháp. - Người đăng tin phải cung cấp giấy
                            tờ chứng minh quyền sở hữu hoặc ủy quyền (nếu được
                            yêu cầu). - Chịu trách nhiệm hoàn toàn về tính chính
                            xác và hợp pháp của thông tin phòng cho thuê.
                            <h4>3. Yêu cầu thông tin khi đăng tin</h4>-{" "}
                            <strong>Tiêu đề:</strong> Rõ ràng, mô tả chính xác
                            loại phòng (ví dụ: "Phòng trọ 20m² cho thuê tại Quận
                            7"). - <strong>Mô tả chi tiết:</strong> Diện tích,
                            giá thuê (bao gồm hoặc không bao gồm điện, nước,
                            internet), địa chỉ cụ thể, tiện ích (điều hòa, nhà
                            vệ sinh riêng, bếp, v.v.), quy định nội bộ (giờ
                            giấc, nuôi thú cưng, v.v.). -{" "}
                            <strong>Hình ảnh:</strong> Tối thiểu 3 ảnh thực tế
                            của phòng (nội thất, khu vực chính, nhà vệ sinh nếu
                            có). - <strong>Thông tin liên hệ:</strong> Số điện
                            thoại, email, hoặc thông tin liên lạc khác phải
                            chính xác và liên tục khả dụng.
                            <h4>4. Quy định về hình ảnh phòng cho thuê</h4>-
                            Hình ảnh phải phản ánh đúng tình trạng thực tế của
                            phòng. - Không sử dụng ảnh chỉnh sửa quá mức, ảnh
                            minh họa, hoặc ảnh từ nguồn không liên quan. - Không
                            chèn số điện thoại, logo, hoặc nội dung quảng cáo
                            không liên quan vào ảnh. - Hình ảnh có nội dung phản
                            cảm, khiêu dâm hoặc vi phạm thuần phong mỹ tục sẽ bị
                            xóa.
                            <h4>5. Các hành vi không được phép</h4>- Đăng tin
                            trùng lặp về cùng một phòng. - Cung cấp thông tin
                            sai lệch về diện tích, giá cả, tiện ích, hoặc tình
                            trạng phòng. - Đăng tin phòng không tồn tại hoặc đã
                            được cho thuê. - Sử dụng danh mục "Phòng Cho Thuê"
                            để quảng cáo các dịch vụ/sản phẩm không liên quan.
                            <h4>6. Kiểm duyệt và thời hạn tin đăng</h4>- Tin
                            đăng sẽ được kiểm duyệt trong vòng 24 giờ làm việc
                            kể từ khi gửi. - Tin hợp lệ sẽ có hiệu lực trong 30
                            ngày kể từ ngày được duyệt. - Tin vi phạm quy định
                            sẽ bị xóa mà không cần thông báo trước. - Người đăng
                            có thể gia hạn tin nếu phòng vẫn chưa được cho thuê.
                            <h4>7. Trách nhiệm của người đăng tin</h4>- Cập nhật
                            thông tin kịp thời khi có thay đổi (giá thuê, tiện
                            ích, tình trạng phòng, v.v.). - Xóa tin ngay khi
                            phòng đã được cho thuê hoặc không còn khả dụng. -
                            Chịu trách nhiệm pháp lý nếu cung cấp thông tin sai
                            lệch dẫn đến tranh chấp hoặc thiệt hại.
                            <h4>8. Quyền của Simi Việt Nam</h4>- Chỉnh sửa, ẩn
                            hoặc xóa tin đăng không tuân thủ quy định. - Tạm
                            khóa hoặc chấm dứt tài khoản của người dùng vi phạm
                            nhiều lần. - Yêu cầu người đăng cung cấp giấy tờ xác
                            minh quyền sở hữu/ủy quyền nếu cần. - Hợp tác với cơ
                            quan chức năng trong trường hợp có yêu cầu điều tra
                            liên quan đến tin đăng.
                            <h4>9. Liên hệ hỗ trợ</h4>
                            Mọi thắc mắc hoặc yêu cầu hỗ trợ liên quan đến quy
                            định danh mục "Phòng Cho Thuê", vui lòng liên hệ: -{" "}
                            <strong>Tổ chức:</strong> Simi Việt Nam -{" "}
                            <strong>Địa chỉ:</strong> Số 123, Đường ABC, Phường
                            DEF, Quận GHI, TP. Hồ Chí Minh -{" "}
                            <strong>Email:</strong> simi.contact@gmail.com -{" "}
                            <strong>Hotline:</strong> +84 912 380 012
                            <h3 className="mt-5">
                                VIII. Quy Định Danh Mục Nhà Chung Cư Cho Thuê
                            </h3>
                            <h4>1. Phạm vi áp dụng</h4>
                            Quy định này áp dụng cho danh mục "Nhà Chung Cư Cho
                            Thuê" trên nền tảng Simi Việt Nam, bao gồm các căn
                            hộ chung cư (căn hộ cao cấp, căn hộ thông thường,
                            hoặc căn hộ dịch vụ) được đăng cho mục đích thuê.
                            Người đăng tin và người thuê phải tuân thủ các quy
                            định dưới đây để đảm bảo tính minh bạch và hợp pháp.
                            <h4>
                                2. Đối tượng được phép đăng tin nhà chung cư cho
                                thuê
                            </h4>
                            - Chủ sở hữu hợp pháp của căn hộ chung cư hoặc người
                            được ủy quyền hợp pháp. - Người đăng tin phải cung
                            cấp giấy tờ chứng minh quyền sở hữu hoặc ủy quyền
                            (nếu được yêu cầu), ví dụ: hợp đồng mua bán, giấy
                            chứng nhận quyền sử dụng. - Chịu trách nhiệm hoàn
                            toàn về tính chính xác và hợp pháp của thông tin căn
                            hộ cho thuê.
                            <h4>3. Yêu cầu thông tin khi đăng tin</h4>-{" "}
                            <strong>Tiêu đề:</strong> Rõ ràng, mô tả chính xác
                            loại căn hộ (ví dụ: "Căn hộ 2 phòng ngủ cho thuê tại
                            Chung cư XYZ, Quận 3"). -{" "}
                            <strong>Mô tả chi tiết:</strong> Diện tích, số phòng
                            ngủ/phòng tắm, tầng số, hướng căn hộ, tiện ích (nội
                            thất, thang máy, bảo vệ, hồ bơi, v.v.), giá thuê
                            (bao gồm hoặc không bao gồm phí quản lý), quy định
                            của ban quản lý chung cư. -{" "}
                            <strong>Hình ảnh:</strong> Tối thiểu 3 ảnh thực tế
                            của căn hộ (phòng khách, phòng ngủ, bếp, ban công
                            nếu có). - <strong>Thông tin liên hệ:</strong> Số
                            điện thoại, email, hoặc thông tin liên lạc khác phải
                            chính xác và liên tục khả dụng.
                            <h4>
                                4. Quy định về hình ảnh nhà chung cư cho thuê
                            </h4>
                            - Hình ảnh phải phản ánh đúng tình trạng thực tế của
                            căn hộ chung cư. - Không sử dụng ảnh chỉnh sửa quá
                            mức, ảnh minh họa, hoặc ảnh từ nguồn không liên
                            quan. - Không chèn số điện thoại, logo, hoặc nội
                            dung quảng cáo không liên quan vào ảnh. - Hình ảnh
                            có nội dung phản cảm, khiêu dâm hoặc vi phạm thuần
                            phong mỹ tục sẽ bị xóa.
                            <h4>5. Các hành vi không được phép</h4>- Đăng tin
                            trùng lặp về cùng một căn hộ chung cư. - Cung cấp
                            thông tin sai lệch về diện tích, giá cả, tiện ích,
                            hoặc tình trạng căn hộ. - Đăng tin căn hộ không tồn
                            tại, đã được cho thuê, hoặc không thuộc quyền sở
                            hữu/ủy quyền. - Sử dụng danh mục "Nhà Chung Cư Cho
                            Thuê" để quảng cáo các dịch vụ/sản phẩm không liên
                            quan.
                            <h4>6. Kiểm duyệt và thời hạn tin đăng</h4>- Tin
                            đăng sẽ được kiểm duyệt trong vòng 24 giờ làm việc
                            kể từ khi gửi. - Tin hợp lệ sẽ có hiệu lực trong 30
                            ngày kể từ ngày được duyệt. - Tin vi phạm quy định
                            sẽ bị xóa mà không cần thông báo trước. - Người đăng
                            có thể gia hạn tin nếu căn hộ vẫn chưa được cho
                            thuê.
                            <h4>7. Trách nhiệm của người đăng tin</h4>- Cập nhật
                            thông tin kịp thời khi có thay đổi (giá thuê, tiện
                            ích, tình trạng căn hộ, quy định ban quản lý, v.v.).
                            - Xóa tin ngay khi căn hộ đã được cho thuê hoặc
                            không còn khả dụng. - Chịu trách nhiệm pháp lý nếu
                            cung cấp thông tin sai lệch dẫn đến tranh chấp hoặc
                            thiệt hại.
                            <h4>8. Quyền của Simi Việt Nam</h4>- Chỉnh sửa, ẩn
                            hoặc xóa tin đăng không tuân thủ quy định. - Tạm
                            khóa hoặc chấm dứt tài khoản của người dùng vi phạm
                            nhiều lần. - Yêu cầu người đăng cung cấp giấy tờ xác
                            minh quyền sở hữu/ủy quyền nếu cần. - Hợp tác với cơ
                            quan chức năng trong trường hợp có yêu cầu điều tra
                            liên quan đến tin đăng.
                            <h4>9. Liên hệ hỗ trợ</h4>
                            Mọi thắc mắc hoặc yêu cầu hỗ trợ liên quan đến quy
                            định danh mục "Nhà Chung Cư Cho Thuê", vui lòng liên
                            hệ: - <strong>Tổ chức:</strong> Simi Việt Nam -{" "}
                            <strong>Địa chỉ:</strong> Số 123, Đường ABC, Phường
                            DEF, Quận GHI, TP. Hồ Chí Minh -{" "}
                            <strong>Email:</strong> simi.contact@gmail.com -{" "}
                            <strong>Hotline:</strong> +84 912 380 012
                        </Card.Body>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Policy;
