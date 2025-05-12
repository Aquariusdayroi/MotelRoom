import { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { images } from '../../assets/images';

function RoomImageGallery({ gallery }) {
    const [visibleIndex, setVisibleIndex] = useState(-1);

    const getImageUrl = (image) => {
        if (image?.image_url) {
            return `http://localhost:8000${image.image_url}`;
        }
        return images.emptyImg;
    };

    const handleImgError = (e) => {
        e.target.src = images.emptyImg;
    };

    if (!gallery || gallery.length === 0) {
        return (
            <div className="rounded-4 overflow-hidden">
                <img
                    src={images.emptyImg}
                    alt="No images available"
                    className="w-100 h-100"
                    style={{ objectFit: 'cover', aspectRatio: '2/1' }}
                />
            </div>
        );
    }

    return (
        <PhotoProvider
            visible={visibleIndex >= 0}
            index={visibleIndex}
            onClose={() => setVisibleIndex(-1)}
            onIndexChange={(newIndex) => setVisibleIndex(newIndex)}
        >
            <div className="rounded-4 overflow-hidden">
                <div className="row g-2">
                    <div className="col-12 col-md-6">
                        <div
                            onClick={() => setVisibleIndex(0)}
                            style={{ cursor: 'pointer', aspectRatio: '4/3' }}
                            className="h-100"
                        >
                            <img
                                src={getImageUrl(gallery?.[0])}
                                onError={handleImgError}
                                alt={gallery?.[0]?.id}
                                className="w-100 h-100"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="row g-2">
                            {gallery?.slice(1, 5)?.map((img, idx) => (
                                <div key={img.id} className="col-6">
                                    <div
                                        onClick={() => setVisibleIndex(idx + 1)}
                                        style={{ cursor: 'pointer', aspectRatio: '4/3' }}
                                        className="h-100"
                                    >
                                        <img
                                            src={getImageUrl(img)}
                                            onError={handleImgError}
                                            alt={img.id}
                                            className="w-100 h-100"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {gallery?.map((img) => (
                <PhotoView key={img.id} src={getImageUrl(img)} />
            ))}
        </PhotoProvider>
    );
}

export default RoomImageGallery;
