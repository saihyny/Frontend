
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const ActionButton = ({ 
  children, 
  onClick, 
  variant = "primary", 
  className,
  icon,
  disabled = false 
}: ActionButtonProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-statusshield-purple text-primary-foreground hover:bg-opacity-90";
      case "secondary":
        return "bg-white text-statusshield-darkgray border border-statusshield-gray hover:bg-statusshield-lightgray";
      case "outline":
        return "bg-transparent text-statusshield-darkgray border border-statusshield-gray hover:bg-statusshield-lightgray";
      default:
        return "bg-statusshield-purple text-primary-foreground hover:bg-opacity-90";
    }
  };

  return (
    <button
      className={cn(
        "action-button",
        getVariantClasses(),
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default ActionButton;
