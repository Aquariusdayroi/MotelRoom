import { useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { images } from "../../assets/images";

function RoomImageGallery({ gallery }) {
    const [visibleIndex, setVisibleIndex] = useState(-1);

    const getImageUrl = (image) => {
        if (image?.image_url) return image.image_url;
        if (image?.image) return image.image;
        return images.emptyImg;
    };

    const handleImgError = (e) => {
        e.target.src = images.emptyImg;
    };

    const rawGallery = gallery?.slice(0, 5) || [];
    const galleryRender = [
        ...rawGallery,
        ...Array(5 - rawGallery.length).fill({ image_url: images.emptyImg }),
    ];

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
                            onClick={() =>
                                setVisibleIndex(
                                    Math.min(0, rawGallery.length - 1)
                                )
                            }
                            style={{ cursor: "pointer", aspectRatio: "4/3" }}
                            className="h-100"
                        >
                            <img
                                src={getImageUrl(galleryRender?.[0])}
                                onError={handleImgError}
                                alt="0"
                                className="w-100 h-100"
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="row g-2">
                            {galleryRender?.slice(1, 5)?.map((img, idx) => (
                                <div key={idx} className="col-6">
                                    <div
                                        onClick={() =>
                                            setVisibleIndex(
                                                Math.min(
                                                    idx + 1,
                                                    rawGallery.length - 1
                                                )
                                            )
                                        }
                                        style={{
                                            cursor: "pointer",
                                            aspectRatio: "4/3",
                                        }}
                                        className="h-100"
                                    >
                                        <img
                                            src={getImageUrl(img)}
                                            onError={handleImgError}
                                            alt={idx}
                                            className="w-100 h-100"
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {gallery?.map((img, idx) => (
                <PhotoView key={idx} src={getImageUrl(img)} />
            ))}
        </PhotoProvider>
    );
}

export default RoomImageGallery;
