export class CreateUserDto {
    readonly firstname: string;
    readonly lastname: string;
    readonly email: string;
    readonly password: string;
    readonly confirmPassword: string;
    readonly profile: string;
}