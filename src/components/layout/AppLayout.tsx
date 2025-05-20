
import React from "react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}
const navLinks = [
  { path: "/", label: "Status Shield" },
  { path: "/clean-download", label: "Clean Download" },
];
const AppLayout = ({ children, className }: AppLayoutProps) => {
  const location = useLocation();

  return (
    <div
      className={cn(
        "min-h-screen bg-statusshield-lightgray p-6 transition-all duration-300",
        className
      )}
    >
      <div className="max-w-md mx-auto">
        <nav className="flex justify-between bg-white rounded-lg shadow p-2 mb-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex-1 text-center py-2 rounded-md transition-colors",
                location.pathname === link.path
                  ? "bg-statusshield-purple text-black"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <main className="transition-opacity duration-300">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
