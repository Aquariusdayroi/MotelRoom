import React from "react";
import UserProfile from "../components/ProfileCard";
import RecentRate from "../components/RecentRate";
import PostContent from "../components/PostContent";
import "../styles/PostManagement.css";
import "../App.css";

export default function PostManagement() {
    return (
        <div className="post-management-container">
            <div className="sidebar">
                <UserProfile />
                <RecentRate />
            </div>
            <div className="sidebar">
                <PostContent />
            </div>
        </div>
    );
}
