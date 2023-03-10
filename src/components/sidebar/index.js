import React, { useState, useEffect } from "react";
import "./sidebar.css";
import SidebarButton from "./sidebarButton";
import { MdFavorite } from "react-icons/md";
import { FaGripfire, FaPlay } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import logo from "../../assets/logo.png";

const removeToken = () => {
  localStorage.clear();
  window.location.reload();
}

export default function Sidebar() {
  return (
    <div className="sidebar-container">
      <img width="150px" height="150px" src={logo} alt="" />
      <div>
        <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard />} />
        <SidebarButton title="Releases" to="/trending" icon={<FaGripfire />} />
        <SidebarButton title="Player" to="/player" icon={<FaPlay />} />
        <SidebarButton
          title="Recomended"
          to="/recomended"
          icon={<MdFavorite />}
        />
        <SidebarButton title="Library" to="/" icon={<IoLibrary />} />
      </div>
      <SidebarButton to="" action={removeToken} title="Sign Out" icon={<FaSignOutAlt/>} />
    </div>
  );
}
