import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        marginLeft: "auto",
        background: "#1976D2",
        color: "#fff",
        fontSize: "16px", 
        padding: "5px 24px", 
        "&:hover": {
          background: "#1565C0",
        },
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
