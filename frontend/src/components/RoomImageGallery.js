function RoomImageGallery({ gallery }) {
    return (
        <div className="rounded-4 overflow-hidden">
            <div className="row g-2">
                <div className="col">
                    <img src={gallery?.[0]} alt="" className="w-100 h-100 object-fit-cover" />
                </div>
                <div className="col">
                    <div className="row g-2">
                        {gallery?.slice(1).map((image, index) => (
                            <div className="col-6" key={index}>
                                <img src={image} alt="" className="w-100 h-100 object-fit-cover" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomImageGallery;
