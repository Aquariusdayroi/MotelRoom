import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const DOTS = '...';

const range = (start, end) => {
    if (!start || !end) return;
    const length = end - start + 1;
    return Array.from({ length }, (_, index) => index + start);
};

function usePagination({ totalPages, siblings = 1, boundaries = 1 }) {
    const [searchParams] = useSearchParams();

    const currentPage = +searchParams.get('page') || 1;

    const paginationRange = useMemo(() => {
        if (!totalPages) return [];

        const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;
        if (totalPageNumbers >= totalPages) {
            return range(1, totalPages);
        }

        const leftSiblingIndex = Math.max(currentPage - siblings, boundaries);
        const rightSiblingIndex = Math.min(currentPage + siblings, totalPages - boundaries);

        const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - (boundaries + 1);

        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = siblings * 2 + boundaries + 2;
            return [...range(1, leftItemCount), DOTS, ...range(totalPages - (boundaries - 1), totalPages)];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = boundaries + 1 + 2 * siblings;
            return [...range(1, boundaries), DOTS, ...range(totalPages - rightItemCount, totalPages)];
        }

        return [
            ...range(1, boundaries),
            DOTS,
            ...range(leftSiblingIndex, rightSiblingIndex),
            DOTS,
            ...range(totalPages - boundaries + 1, totalPages),
        ];
    }, [totalPages, currentPage, siblings, boundaries]);

    return {
        range: paginationRange,
        currentPage,
    };
}

export default usePagination;
