import jwt from 'jsonwebtoken';

interface UserPayload {
  id: number;
  username: string;
}

export default class AuthService {
  private secretKey: string;
  
  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  generateToken(user: UserPayload): string {
    return jwt.sign(user, this.secretKey, { expiresIn: '1h' });
  }

  verifyToken(token: string): UserPayload {
    try {
      return jwt.verify(token, this.secretKey) as UserPayload;
    } catch (err) {
      throw new Error('Invalid token');
    }
  }
}