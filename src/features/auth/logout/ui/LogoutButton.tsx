import { useAppDispatch } from "@/app/provider";
import { clearUser } from "@/entities/user";
import { Button } from "@/shared/ui/Button";
import { LogOut } from "lucide-react";
import { usePerformLogoutMutation } from "../api/logoutApi";
import { toast } from "sonner";

const LogoutButton = () => {
    const dispatch = useAppDispatch();
    const [performLogout, { isLoading }] = usePerformLogoutMutation();

    const logout = async () => {
        try {
            const response = await performLogout().unwrap();

            if (!response?.success) {
                toast.error("Logout failed");
                return;
            }

            dispatch(clearUser());
            toast.success("Logged out successfully");
        } catch (error) {
            console.error("Logout error.")
            toast.error("Network error. Try again.");
        }
    };

    return (
        <Button className="logout-button" variant="outline-destructive" onClick={logout} disabled={isLoading} >
            <LogOut width={16} height={16} />
            {!isLoading ? "Logout" : "Logging out..."}
        </Button>
    );
};

export { LogoutButton };
