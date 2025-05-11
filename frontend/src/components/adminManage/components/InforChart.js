<<<<<<< HEAD
const InforChart = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Infor Chart</h1>
            <p className="text-gray-500">This is the Infor Chart component.</p>
        </div>
    );
};
=======
import React from "react";
import Chart from "react-apexcharts";

const InforChart = () => {
    const chartOptions = {
        chart: {
            type: "area",
            toolbar: {
                show: false,
            },
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        title: {
            text: "Thống kê lượt đăng ký theo ngày",
            align: "center",
            style: {
                fontSize: "18px",
                fontWeight: "bold",
            },
        },
        xaxis: {
            categories: [
                "01/05",
                "02/05",
                "03/05",
                "04/05",
                "05/05",
                "06/05",
                "07/05",
            ],
        },
        yaxis: {
            title: {
                text: "Số lượng tài khoản",
            },
        },
        colors: ["#008FFB", "#00E396", "#FEB019"],
        dataLabels: {
            enabled: false,
        },
        legend: {
            position: "top",
        },
    };

    const chartSeries = [
        {
            name: "Đăng ký chủ trọ",
            data: [5, 7, 6, 10, 8, 9, 11],
        },
        {
            name: "Chủ trọ",
            data: [2, 3, 4, 5, 6, 7, 8],
        },
        {
            name: "Người dùng",
            data: [12, 15, 14, 18, 20, 22, 25],
        },
    ];

    return (
        <div className="w-full flex flex-col items-center justify-center p-2 bg-white rounded border">
            <Chart
                options={chartOptions}
                series={chartSeries}
                type="area"
                height={300}
                width="100%"
            />
        </div>
    );
};

>>>>>>> dev
export default InforChart;
