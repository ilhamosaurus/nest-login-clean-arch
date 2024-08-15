import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/domain/auth/user';

export const getCurrentUserByContext = (context: ExecutionContext): User => {
  if (context.getType() !== 'http') {
    return null;
  }

  const request = context.switchToHttp().getRequest();
  return request.user.props;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return getCurrentUserByContext(context);
  },
);
