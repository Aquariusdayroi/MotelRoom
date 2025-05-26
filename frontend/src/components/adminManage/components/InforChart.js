import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getOwnerRequestStats } from "../../../api/adminApi/getOwnerRequestStats";

const InforChart = () => {
    const [categories, setCategories] = useState([]);
    const [series, setSeries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getOwnerRequestStats("week");

                if (res.success) {
                    const labelKey = res.group_by;
                    const chartData = res.data.map((item) => ({
                        label: new Date(item[labelKey]).toLocaleDateString(
                            "vi-VN"
                        ),
                        value: item.total,
                    }));

                    setCategories(chartData.map((d) => d.label));
                    setSeries([
                        {
                            name: "Yêu cầu làm chủ trọ",
                            data: chartData.map((d) => d.value),
                        },
                    ]);
                }
            } catch (err) {
                console.error("Lỗi khi lấy dữ liệu thống kê yêu cầu:", err);
            }
        };

        fetchData();
    }, []);

    const chartOptions = {
        chart: {
            type: "area",
            toolbar: { show: false },
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        title: {
            text: "Thống kê yêu cầu làm chủ trọ",
            align: "center",
            style: {
                fontSize: "18px",
                fontWeight: "bold",
            },
        },
        xaxis: {
            categories: categories,
        },
        yaxis: {
            title: {
                text: "Số yêu cầu",
            },
        },
        colors: ["#00E396"],
        dataLabels: { enabled: false },
        legend: { position: "top" },
    };

    return (
        <div className="w-full flex flex-col items-center justify-center p-2 bg-white rounded border">
            <Chart
                options={chartOptions}
                series={series}
                type="area"
                height={300}
                width="100%"
            />
        </div>
    );
};

export default InforChart;
