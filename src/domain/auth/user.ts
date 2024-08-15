import { Entity } from 'src/core/entities/entity';

export interface UserProps {
  id?: number;
  name: string;
  username: string;
  password?: string;
}

export class User extends Entity<UserProps> {
  constructor(props: UserProps) {
    super(props);
  }

  get id(): number {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get username(): string {
    return this.props.username;
  }

  get password(): string {
    return this.props.password;
  }

  get currentState(): UserProps {
    return this.props;
  }
}
