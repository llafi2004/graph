import React, { useEffect, useState } from "react";
import { fetchUserData } from "../services/graphql";
import XPGraph from "./XPGraph";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      window.location.href = "/";
    } else {
      fetchUserData(jwt)
        .then((data) => setUserData(data))
        .catch(() => setError("Error loading data."));
    }
  }, []);

  if (error) return <p>{error}</p>;
  if (!userData) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      <h1>Welcome, {userData.user[0].login}</h1>

      <div className="xp-section">
        <h2>Your XP Transactions</h2>
        <ul>
          {userData.transaction.map((tx, index) => (
            <li key={index}>
              {tx.type}: {tx.amount} XP (on {new Date(tx.createdAt).toLocaleDateString()})
            </li>
          ))}
        </ul>
      </div>

      <XPGraph transactions={userData.transaction} />
    </div>
  );
};

export default Profile;
