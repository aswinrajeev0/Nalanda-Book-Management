export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
}

export interface UserResponseDto {
    id: string;
    name: string;
    email: string;
}

export interface LoginResponseDto {
    token: string,
    user: {
        id: string;
        name: string;
        email: string;
    }
}

export interface GlobalUser {
    id: string;
    name: string;
    email: string;
    role: string;
}