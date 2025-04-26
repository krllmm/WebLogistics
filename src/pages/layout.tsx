import { Link, Outlet } from "react-router-dom";

export default function Layout(){
    return(
        <>
        <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/logists">logists</Link>
          </li>
          <li>
            <Link to="/deliveries">deliveries</Link>
          </li>
          <li>
            <Link to="/driver">drivers</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
        </>
    )
}