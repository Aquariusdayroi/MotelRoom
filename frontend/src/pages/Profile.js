import { Link, useNavigate } from "react-router-dom";
function Profile() {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate("/profile");
    };
    return <div>cc</div>;
}

export default Profile;
