export type EditProfileRequest = {
    username: string;
    email: string;
}

export type EditProfileResponse = {
    success: boolean;
    username: string;
    email: string;
}