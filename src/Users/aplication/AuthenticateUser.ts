import UserRepository from "../domain/UserRepository";
import AuthService from "./Services/AuthService";

export default class AuthenticateUser {
  private userRepository: UserRepository;
  private authService: AuthService;

  constructor(userRepository: UserRepository, authService: AuthService) {
    this.userRepository = userRepository;
    this.authService = authService;
  }

  async run(username: string, password: string): Promise<string> {
    const user = await this.userRepository.findByUsername(username);
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }
    return this.authService.generateToken({ id: user.id, username: user.username});
  }
}