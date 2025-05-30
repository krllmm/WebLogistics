import { ReactElement } from "react";
import { NavLink } from "react-router-dom";

interface MenuItemProps {
  path: string
  title: string,
  icon: ReactElement,
}

export default function MenuIcon({ path, title, icon }: MenuItemProps) {
  const location = {
    pathname: path
  }

  return (
    <>
      <NavLink
        to={location}
        style={({ isActive }) => ({
          color: isActive ? '#363636' : '#545e6f',
          background: isActive ? '#8EBB8E' : '#f0f0f0',
          marginTop: 6,
          // marginBottom: 12,
          marginRight: 12,
          padding: 12,
          paddingRight: 36,
          textDecoration: "none",
          borderTopRightRadius: 14,
          borderBottomRightRadius: 14,
          borderLeftWidth: 2,
          borderLeftColor: isActive ? "#1C771C" : "#f0f0f0",
          borderLeftStyle: "solid",
          fontSize: 18,
          display: "flex",
          alignItems: "center",
          gap: 12,
        })}>
        {icon} {title}
      </NavLink>
    </>
  )
}