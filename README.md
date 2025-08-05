### Account Microservice

Installation:

> npm i -g @nestjs/cli
> nest new account-ms

### Packages

Microservice:

> npm i --save @nestjs/microservices

Configuration:

> npm i --save @nestjs/config

TypeORM + PostgreSQL:

- npm install --save @nestjs/typeorm typeorm pg

Faker JS:

> npm i typeorm-extension typeorm @faker-js/faker@8.4.1

Validation

> npm i --save class-validator class-transformer
> npm i --save-dev @types/class-validator
> npm i --save @nestjs/mapped-types

For Authentication

- npm i argon2
- npm i --save @nestjs/jwt @nestjs/passport passport-jwt
- npm i -D @types/passport-jwt

### Generate random secret

Generate random "JWT Secret" using "OpenSSL"

> openssl rand -base64 32

or,

> node -e "console.log(require('crypto').randomBytes(32).toString('base64'));"

### Tutorial

https://www.youtube.com/playlist?list=PLhnVDNT5zYN-WbouwtijXKFZ1JsgBEY9Y
https://www.youtube.com/watch?v=iiSTB0btEgA

### Commands

Make resource:

> nest g res users
