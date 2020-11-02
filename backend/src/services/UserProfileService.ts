import { getRepository } from 'typeorm';
import ConvertImgToBase64 from '../utils/ConvertImgToBase64';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  user_id: string;
}

class UserProfileService {
  public async execute({ user_id }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    const image = await ConvertImgToBase64({
      file: user.avatar,
    });

    return { user, image };
  }
}

export default UserProfileService;
