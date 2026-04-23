import { useAppDispatch } from "@/app/provider";
import { clearUser } from "@/entities/user";
import { Button } from "@/shared/ui/Button";
import { LogOut } from "lucide-react";
import { usePerformLogoutMutation } from "../api/logoutApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const [performLogout, { isLoading }] = usePerformLogoutMutation();

    const logout = async () => {
        try {
            const response = await performLogout().unwrap();

            if (!response.success) {
                toast.error("Logout failed");
                return;
            }

            dispatch(clearUser());
            navigator("/auth");
        } catch (error: any) {
            console.error(error);

            toast.error(error?.data?.message ?? "Request failed");
        }
    };

    return (
        <Button
            className="logout-button"
            variant="outline-destructive"
            onClick={logout}
            disabled={isLoading}
        >
            <LogOut width={16} height={16} />
            {!isLoading ? "Logout" : "Logging out..."}
        </Button>
    );
};

export { LogoutButton };
