import { useAppDispatch } from "@/app/provider";
import { clearUser } from "@/entities/user";
import { Button } from "@/shared/ui/Button";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
    const dispatch = useAppDispatch();

    const logout = () => {
        dispatch(clearUser());
    };

    return (
        <Button className="logout-button" variant="outline-destructive" onClick={logout}>
            <LogOut width={16} height={16} />
            Logout
        </Button>
    );
};

export { LogoutButton };
