# Global Requisites

- node (>= 10.5.0)
- tsc (>= 3.0.1)
- typescript (>= 3.0.1)
- mongoose (>= 3.6.2)
- redis

# App Structure

> _Note: I am mentioning only files/folders which you need to configure if required_

```bash
├── dist
├── public
├── src
│   ├── controllers
│   │   ├── Api
│   │   │   ├── Auth
│   │   │   │   ├── Login.ts
│   │   │   │   ├── RefreshToken.ts
│   │   │   │   └── Register.ts
│   │   │   └── Home.ts
│   │   ├── Auth
│   │   │   ├── Login.ts
│   │   │   ├── Logout.ts
│   │   │   ├── Register.ts
│   │   │   └── Social.ts
│   │   ├── Account.ts
│   │   └── Home.ts
│   ├── exception
│   │   ├── Handler.ts
│   │   └── NativeEvent.ts
│   ├── interfaces
│   │   ├── models
│   │   │   └── user.ts
│   │   └── vendors
│   │        ├── index.ts
│   │        ├── INext.ts
│   │        ├── IRequest.ts
│   │        └── IResponse.ts
│   ├── middlewares
│   │   ├── CORS.ts
│   │   ├── CsrfToken.ts
│   │   ├── Http.ts
│   │   ├── Kernel.ts
│   │   ├── Log.ts
│   │   ├── Statics.ts
│   │   ├── StatusMonitor.ts
│   │   └── View.ts
│   ├── models
│   │   └── User.ts
│   ├── providers
│   │   ├── App.ts
│   │   ├── Cache.ts
│   │   ├── Database.ts
│   │   ├── Express.ts
│   │   ├── Locals.ts
│   │   ├── Passport.ts
│   │   ├── Queue.ts
│   │   └── Routes.ts
│   ├── routes
│   │   ├── Api.ts
│   │   └── Web.ts
│   ├── services
│   │   └── strategies
│   │        ├── Google.ts
│   │        ├── Local.ts
│   │        └── Twitter.ts
│   └── index.ts
├── views
│   ├── includes
│   ├── modals
│   ├── pages
│   ├── partials
│   ├── static
│   │   ├── css/*.css
│   │   └── js/*.js
│   └── layout.pug
├── .env
├── .gitignore
├── nodemon.json
├── package.json
├── README.md
├── tsconfig.json
└── tslint.json
```

# Install, Configure & Run

Below mentioned are the steps to install, configure & run in your platform/distributions.

```bash
# Clone the repo.
git clone https://github.com/GeekyAnts/express-typescript.git;

# Goto the cloned project folder.
cd nodets;
```

```bash
# Without Docker

# Note: It is assumed here that you have MongoDB running in the background and that you have created the database.

# Install NPM dependencies.
# Note: You can review the list of dependencies from the below link.
# https://github.com/faizahmedfarooqui/nodets/network/dependencies
npm install;

# Edit your DotEnv file using any editor of your choice.
# Please Note: You should add all the configurations details
# or else default values will be used!
vim .env;

# Run the app
npm run dev;
```

```bash
# With Docker

# Note: It is assumed here that you have Docker running in the background.

# Run the app in docker as a foreground process
docker-compose up

# Run the app in docker as a background process
docker-compose up -d
```

# List of Routes

- POST: {{DOMAIN}}/api/user

```
{
    "firstName": "test1s",
    "lastName": "test2",
    "birthdayDate": "Fri Feb 18 2022 16:10:32 GMT+0700",
    "location": "indonesia"
}
```

response:

```
{
  "message": [
      "You have been successfully create a user"
  ]
}
```

- PUT: {{DOMAIN}}/api/user/:userId

```
{
    "firstName": "test1s",
    "lastName": "test2",
    "birthdayDate": "Fri Feb 18 2022 16:10:32 GMT+0700",
    "location": "indonesia"
}
```

response:

```
{
  "message": [
      "You have been successfully update a user"
  ]
}
```

- DELETE: {{DOMAIN}}/api/user/:userId

response:

```
{
  "message": [
      "You have been successfully delete a user"
  ]
}
```

- POST: {{DOMAIN}}/api/user/delay-birthday-message

```
{
    "delayInDay": 1
}
```

response

```
{
  "message": [
      "You have been successfully add birthday message queues"
  ]
}
```

# Info

- No Race condition: https://github.com/OptimalBits/bull/issues/1643
