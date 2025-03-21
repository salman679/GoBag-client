import PropTypes from "prop-types";
import { DashboardShell } from "./components/Dashboard-shell";
export default function UserDashboardLayout({ children }) {
  return <DashboardShell>{children}</DashboardShell>;
}

UserDashboardLayout.propTypes = {
  children: PropTypes.node,
};
