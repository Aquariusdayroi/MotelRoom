import React from "react";
import InforCart from "./components/InforCart";
import { useContext } from "react";
import { AuthToken } from "../../authToken/index";
import useOwnerRequestCount from "../../api/ownerApi/useOwnerRequestApi";
import useUserStatistics from "../../api/ownerApi/totalUserStaticApi";
import InforChart from "./components/InforChart";

const AuthenticManage = () => {
    const { user: token } = useContext(AuthToken);
    const totalPendingOwnerRequests = useOwnerRequestCount(token);
    const { ownerCount, userCount } = useUserStatistics(token);

    return (
        <div className="container pt-5">
            <div className="row">
                <div className="row mb-4">
                    <div className="col-md-4">
                        <InforCart
                            title="Tài khoản đăng ký làm chủ trọ"
                            totalUser={totalPendingOwnerRequests}
                            colorIndex={0}
                        />
                    </div>
                    <div className="col-md-4">
                        <InforCart
                            title="Tài khoản chủ trọ"
                            totalUser={ownerCount}
                            colorIndex={1}
                        />
                    </div>
                    <div className="col-md-4">
                        <InforCart
                            title="Tài khoản người dùng"
                            totalUser={userCount}
                            colorIndex={2}
                        />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-12">
                        <InforChart />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">table request</div>
                </div>
            </div>
        </div>
    );
};

export default AuthenticManage;
