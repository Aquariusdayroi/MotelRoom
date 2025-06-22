import React from "react";
import { Card, Row, Col, Image, Table, Badge } from "react-bootstrap";
import { StarFill, ArrowUp } from "react-bootstrap-icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import avt from '../../assets/img/avt-dat.png';
import favorite from '../../assets/img/favorite.png';
import like from '../../assets/img/like-red.png';
import Dropdown from '../../components/adminManage/components/ActionDropdown';
import "../../styles/ReviewManage.css"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const stats = {
  total: 15678,
  avgRating: 4.0,
  totalChange: 30.7,
  avgChange: 10.5,
  chartData: {
    labels: ["Th1", "Th2", "Th3", "Th4", "Th5", "Th6"],
    datasets: [
      {
        label: "Số lượt đánh giá",
        data: [19000, 21000, 16000, 20000, 10000, 19500],
        backgroundColor: '#C7DBF3',
        hoverBackgroundColor: '#0a58ca',
        borderRadius: 8,
        barPercentage: 0.6
      },
    ],
  },
};

const recentReviews = Array(4).fill({
  name: "Khánh Ender",
  date: "11/05/2025",
  rating: 4.8,
  comment: "Trang web rất tiện lợi và dễ sử dụng, mình tìm được phòng ưng ý chỉ trong vài phút!",
});

const userReviews = Array(3).fill({
  name: "Khánh Ender",
  date: "11/05/2025",
  comment: "Trang này thiệt sự tuyệt vời, nhờ nó mà tôi trở thành người vô gia cư, tôi yêu trang web yêu gia đình yêu Việt Nam rất là nhiều luôn á trời đất ơi......",
});

export default function ReviewManagement() {
  const [likedList, setLikedList] = React.useState(Array(userReviews.length).fill(false));
  const [searchTerm, setSearchTerm] = React.useState("");

  const toggleLike = (index) => {
    const updated = [...likedList];
    updated[index] = !updated[index];
    setLikedList(updated);
  };

  // Lọc theo tên người dùng
  const filteredReviews = userReviews.filter((review) =>
    review.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="mb-4 fw-bold">Quản lý đánh giá</h2>

      <Row className="mb-4">
        <Col md={8}>
          <Card className="shadow-sm h-100 p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Thống kê</h5>
              <span className="text-muted small">6 tháng qua</span>
            </div>
            <Row className="mb-3">
              <Col md={6}>
                <div className="text-muted small">Tổng lượt đánh giá</div>
                <h4 className="mb-0 fw-bold">{stats.total.toLocaleString()}</h4>
                <Badge bg="light" text="success" className="mt-1">
                  <ArrowUp size={12} className="me-1" /> {stats.totalChange}%
                </Badge>
              </Col>
              <Col md={6}>
                <div className="text-muted small">Đánh giá trung bình</div>
                <h4 className="mb-0 fw-bold">{stats.avgRating.toFixed(1)}</h4>
                <Badge bg="light" text="success" className="mt-1">
                  <ArrowUp size={12} className="me-1" /> {stats.avgChange}%
                </Badge>
              </Col>
            </Row>
            <Bar
              data={stats.chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: false },
                },
                elements: {
                  bar: {
                    backgroundColor: '#C7DBF3',
                    hoverBackgroundColor: '#0a58ca',
                    borderRadius: 8,
                    borderSkipped: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { stepSize: 5000 }
                  },
                },
              }}
            />
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Đánh giá gần đây</h5>
                <span className="text-muted small">6 tháng qua</span>
              </div>
              <Table borderless className="recent-review-table">
                <thead>
                  <tr>
                    <th className="w-25">Tên người dùng</th>
                    <th className="w-15">Đánh giá</th>
                    <th>Nhận xét</th>
                  </tr>
                </thead>
                <tbody>
                  {recentReviews.map((review, idx) => (
                    <tr key={idx}>
                      <td className="d-flex align-items-center gap-2">
                        <Image src={avt} roundedCircle width={36} height={36} alt="user" />
                        <span>{review.name}</span>
                      </td>
                      <td className="text-warning">
                        <StarFill size={14} className="me-1" /> {review.rating}
                      </td>
                      <td>
                        <small className="text-muted">{review.comment}</small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="d-flex justify-content-between align-items-center mb-3">
      <h4 className="mb-0 fw-bold">Đánh giá người dùng</h4>

      <div className="position-relative" style={{ width: "300px" }}>
        <img
          src={require("../../assets/img/search.png")}
          alt="search"
          style={{
            position: "absolute",
            top: "50%",
            left: "12px",
            transform: "translateY(-50%)",
            width: "16px",
            height: "16px",
            opacity: 0.6,
          }}
        />
        <input
          type="text"
          className="form-control ps-5 pe-5"
          placeholder="Tìm theo tên người dùng..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={require("../../assets/img/filter.png")}
          alt="filter"
          style={{
            position: "absolute",
            top: "50%",
            right: "12px",
            transform: "translateY(-50%)",
            width: "16px",
            height: "16px",
            opacity: 0.6,
            cursor: "pointer"
          }}
        />
      </div>
    </div>

      <Row xs={1} md={2} lg={3} className="g-4 mb-4">
        {filteredReviews.map((review, idx) => {
          const liked = likedList[idx];
          return (
            <Col key={idx}>
              <Card className="shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div className="d-flex align-items-center gap-2">
                      <Image src={avt} roundedCircle width={40} height={40} alt="user" />
                      <div>
                        <div className="fw-semibold">{review.name}</div>
                        <div className="text-muted small">{review.date}</div>
                      </div>
                    </div>
                    <Dropdown />
                  </div>
                  <div
                    className="text-muted small mb-3"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      minHeight: '60px'
                    }}
                  >
                    {review.comment}
                  </div>

                  <div className="d-flex justify-content-between align-items-center px-2">
                    <div className="flex-grow-1 text-center">
                      <span className="fw-semibold text-dark" style={{ cursor: 'pointer' }}>
                        Gửi tin nhắn
                      </span>
                    </div>
                    <img
                      src={liked ? like : favorite}
                      alt="like"
                      onClick={() => toggleLike(idx)}
                      style={{
                        width: 20,
                        height: 20,
                        cursor: 'pointer',
                        filter: liked ? 'drop-shadow(0 0 2px red)' : 'none',
                        transition: '0.2s ease'
                      }}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
