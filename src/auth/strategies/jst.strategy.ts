// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-jwt';

// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     super({
//       jwtFromRequest: (req) => {
//         let token = null;
//         if (req && req.headers) {
//           token = req.headers['x-access-token'];
//         }
//         return token;
//       },
//       ignoreExpiration: false,
//       secretOrKey: process.env.JWT_SECRET,
//     });
//   }

//   async validate(payload: any) {
//     return {
//       userId: payload.sub,
//       username: payload.username,
//       role: payload.role,
//     };
//   }
// }
