import { useSearchParams } from 'react-router-dom';
import usePagination from '../hooks/usePagination';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ButtonPrimary from './buttonUI/ButtonPrimary';
import styles from '../styles/Pagination.module.css';

const DOTS = '...';

function Pagination({ totalPages }) {
    const { range, currentPage } = usePagination({ totalPages: totalPages, siblings: 1, boundaries: 1 });
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSetPage = (pageNum) => {
        if (pageNum === DOTS) return;
        searchParams.set('page', pageNum);
        setSearchParams(searchParams);
    };

    const handlePrevPage = () => {
        if (currentPage === 1) return;
        handleSetPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage === totalPages) return;
        handleSetPage(currentPage + 1);
    };

    return (
        <div className="d-flex align-items-center justify-content-center gap-1 mb-5">
            <ButtonPrimary
                icon={<ChevronLeftIcon />}
                onClick={handlePrevPage}
                className={`${styles.pagiBtn} opacity-75`}
                disabled={currentPage === 1}
            />
            {range.map((page, index) => (
                <ButtonPrimary
                    key={index}
                    onClick={() => handleSetPage(page)}
                    className={styles.pagiBtn}
                    des={page}
                    isActive={currentPage === page}
                />
            ))}
            <ButtonPrimary
                icon={<ChevronRightIcon />}
                onClick={handleNextPage}
                className={`${styles.pagiBtn} opacity-75`}
                disabled={currentPage === totalPages}
            />
        </div>
    );
}

export default Pagination;
