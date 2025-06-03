import styles from '../styles/Home.module.css';
import { motion } from 'framer-motion';
import RoomCard from '../components/rooms/RoomCard';
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
                                <RoomCard
                                    key={room.id}
                                    id={room.id}
                                    images={room.images}
                                    title={room.title}
                                    address={room.address}
                                    user={room.user}
                                    price={room.price}
                                    home_type={room.home_type}
                                    acreage={room.acreage}
                                    isNew={new Date(room.update_at) > Date.now() - 1000 * 60 * 60 * 24 * 7}
                                    is_favorite={room.is_favorite}
                                />
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
