import React, { useState } from "react";
import { Sidebar } from "../../Components/sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../HomePage/HomePage";
import Profile from "../Profile/Profile";
import Story from "../Story/Story";
import WorkoutRoute from "../WorkoutPage/WorkoutRoute";
import Workout from "../WorkoutPage/Workout";
import UserLogin from "../auth/userLogin";
import WorkoutStatus from "../WorkoutPage/WorkoutStatus";
import UserRegister from "../auth/userRegister";

export const Router = () => {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    setLoggedIn(false);
  };

  return (
    <div>
      <div className="flex">
        <div className="w-[20%] border border-l-slate-500">
          {loggedIn && (
            <Sidebar isLoggedIn={loggedIn} handleLogout={handleLogout} />
          )}
        </div>
        <div className="w-full">
          <Routes>
            {!loggedIn && (
              <>
                <Route
                  path="/"
                  element={<UserLogin setLoggedIn={setLoggedIn} />}
                />
                <Route path="/register" element={<UserRegister />} />
              </>
            )}
            {loggedIn && <Route path="/home" element={<HomePage />} />}
            {loggedIn && <Route path="/username" element={<Profile />} />}
            {loggedIn && <Route path="/story" element={<Story />} />}

            {loggedIn && <Route path="/workout" element={<WorkoutRoute />} />}
          </Routes>
        </div>
      </div>
    </div>
  );
};
