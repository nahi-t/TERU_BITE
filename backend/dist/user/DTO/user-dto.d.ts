import { UserRole } from '../user.entity';
export declare class CreateUserDto {
    email: string;
    password: string;
    role?: UserRole;
}
export declare class UpdateUserDto {
    email?: string;
    password?: string;
    role?: UserRole;
}
export declare class UserResponseDto {
    id: string;
    email: string;
    role: UserRole;
    createdAt: Date;
}
