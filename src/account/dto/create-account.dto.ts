
export class CreateAccountDto {
  username: string;

  password: string;

  status: 'locked' | 'unused' | 'in use';
}