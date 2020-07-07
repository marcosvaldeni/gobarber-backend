
# GoBarber - [Ongoing Project]

> "Live as if you were to die tomorrow. Learn as if you were to live forever." Mahatma Gandhi

---

# :pushpin: Table of Contents

* [Features](#rocket-features)
* [Installation](#construction_worker-installation)
* [Getting Started](#runner-getting-started)
* [Found a bug? Missing a specific feature?](#bug-issues)
* [Contributing](#tada-contributing)
* [License](#closed_book-license)

# :rocket: Features 

* `http://localhost:3333/users`
      [POST] Create new user

* `http://localhost:3333/user/avatar`
      [PACH] Update user avatar

* `http://localhost:3333/appointments`
      [POST] Create new appointment

* `http://localhost:3333/appointments`
      [GET] List all appointments

* `http://localhost:3333/sessions`
      [POST] Create new token

# :construction_worker: Installation

**You need to install [NodeJS](https://nodejs.org/), [Yarn](https://classic.yarnpkg.com/en/docs/install/) and [Docker](https://hub.docker.com/editions/community/docker-ce-desktop-windows) or Docker for Windows [Home](https://docs.docker.com/toolbox/toolbox_install_windows/), then in order to clone the project via HTTPS, run this command:**

```git clone https://github.com/marcosvaldeni/gobarber-backend```

SSH URLs provide access to a Git repository via SSH, a secure protocol. If you have a SSH key registered in your Github account, clone the project using this command:

```git clone git@github.com:marcosvaldeni/gobarber-backend.git```

**Install dependencies**

`yarn`

This command will install all dependencies. It may take a while.

# :runner: Getting Started

**Importing database**

For import the database, firstly you will need to create a docker Postgres image:
`docker run --name gostack_postgres -e POSTGRES_PASSWORD=secret -p  5432:5432 -d postgres`

**Setting connection variables**

Set those variables, fallowing the information that was set on docker image.

```json
  "type": "postgres",
  "host": "localhost", 
  "port": 5432,
  "username": "postgres",
  "password": "secret",
  "database": "gostack_gobarber",
  ```
Using Docker toolkit you have to set here `host` the IP that was provided by the software.

Now, inside the folder where the project is, run the command:

`yarn typeorm migration:run`

# :tada: Contributing

Check out the [contributing](https://github.com/marcosvaldeni/gobarber-backend/blob/master/CONTRIBUTING.md) page to see the best places to file issues, start discussions and begin contributing.

# :closed_book: License

Released in 2020.
This project is under the [MIT license](https://github.com/marcosvaldeni/gobarber-backend/blob/master/LICENSE).

Made with love by [Marcos Lucas](https://github.com/marcosvaldeni) 💚🚀
