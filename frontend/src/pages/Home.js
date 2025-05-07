import styles from '../styles/Home.module.css';
import { motion } from 'framer-motion';
import RoomCard from '../components/RoomCard';
import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import { Link, useSearchParams } from 'react-router-dom';
import Pagination from '../components/Pagination';

function Home() {
    const [data, setData] = useState({});

    const [searchParams] = useSearchParams();
    const page = +searchParams.get('page') || 1;

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axiosClient.get(`/rental_post/api/?page=${page}`);
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRooms();
    }, [page]);

    return (
        <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <div className={styles.container}>
                    <div className={styles.title}>Danh sách đề cử hàng đầu</div>
                    <div className={styles.grid}>
                        {data?.results?.map((room) => (
                            <Link key={room.id} to={`/detail/${room.id}`} className="text-decoration-none">
                                <RoomCard {...room} />
                            </Link>
                        ))}
                    </div>
                </div>
            </motion.div>
            <Pagination totalPages={data?.total_pages} />
        </div>
    );
}

export default Home;
