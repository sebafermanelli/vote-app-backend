# Nombre del Proyecto: vote-app-backend

## Version
1.0.0

## Instalación
1. Clona este repositorio.
2. Ejecuta el siguiente comando para instalar las dependencias:
```bash
npm install
```

## Uso
### Modo de Desarrollo
Ejecuta el siguiente comando para iniciar la aplicación en modo de desarrollo:
```bash
npm run dev
```

### Modo de Producción
Ejecuta el siguiente comando para iniciar la aplicación en modo de producción:
```bash
npm run build
```

## Dependencias
### Dependencias de Desarrollo
- ts-node-dev: 2.0.0
- typescript: 5.1.6

### Dependencias de Producción
- bcrypt: 5.1.0
- class-validator: 0.14.0
- cors: 2.8.5
- dotenv: 16.3.1
- express: 4.18.2
- jsonwebtoken: 9.0.1
- mysql2: 3.6.0
- nodemailer: 6.9.4
- passport: 0.6.0
- passport-jwt: 4.0.1
- passport-local: 1.0.0
- pg: 8.11.3
- pg-hstore: 2.3.4
- sequelize: 6.32.1

## Reportar Problemas
Si encuentras algún problema o tienes alguna sugerencia, por favor [crea un issue](https://github.com/sebafermanelli/vote-app-backend/issues).

## Rutas
{ ... } - body

## Auth
/api/auth/admin/login - POST { username, password }
/api/auth/user/login - POST { id, login_code }

## Admin
/api/admins - GET | POST { username, password }
/api/admins/:id - GET | PUT { username, password } | DELETE
/api/admins/:id/elections - GET

## Candidate
/api/candidates - GET | POST { user_id }
/api/candidates/:id - GET | PUT { user_id } | DELETE

## Delegation
/api/delegations - GET | POST { election_id }
/api/delegations/:id - GET | PUT { election_id } | DELETE
/api/delegations/:id/roles - GET

## DelegationRole
/api/delegationroles - GET | POST { order, delegation_id, role_id, list_role_id }
/api/delegationroles/:id - GET | PUT { order, delegation_id, role_id, list_role_id } | DELETE

## Election
/api/elections - GET | POST { description, admin_id }
/api/elections/:id - GET | PUT { description, admin_id } | DELETE
/api/elections/:id/lists - GET
/api/elections/:id/users - GET
/api/elections/:id/finalize - PUT
/api/elections/:id/delegation - GET

## ElectionUser
/api/electionusers - GET
/api/electionusers/:id - GET | PUT { already_vote, user_id, election_id } | DELETE
/api/electionusers/:election_id/generate - POST
/api/electionusers/:user_id/vote - PUT { election_id, list_id }
/api/electionusers/:user_id/notvotedyet - GET

## List
/api/lists - GET | POST { description, image, election_id }
/api/lists/:id - GET | PUT { description, image, election_id } | DELETE
/api/lists/:id/roles - GET

## ListRole
/api/listroles - GET | POST { order, list_id, role_id, candidate_id }
/api/listroles/:id - GET | PUT { order, list_id, role_id, candidate_id } | DELETE

## Role
/api/roles - GET | POST { description }
/api/roles/:id - GET | PUT { description } | DELETE

## User
/api/users - GET | POST { id, name, last_name, course, address, email, phone, image }
/api/users/:id - GET | PUT { id, name, last_name, course, address, email, phone, image } | DELETE
/api/users/:id/code - PUT
/api/users/:id/elections - GET
