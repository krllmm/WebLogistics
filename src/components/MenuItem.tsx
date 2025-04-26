import { NavLink } from "react-router-dom";

interface MenuItemProps {
  path: string
  title: string
}

export default function MenuIcon({ path, title }: MenuItemProps) {
  const location = {
    pathname: path
  }

  return (
    <>
      <NavLink
        to={location}
        style={({ isActive }) => ({
          color: isActive ? '#fff' : '#545e6f',
          background: isActive ? '#7600dc' : '#f0f0f0',
          margin: 0,
        })}>
        {title}
      </NavLink>
    </>
  )
}