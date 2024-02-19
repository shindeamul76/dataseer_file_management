

<div align="center">

  <img src="/assets/file-upload.png"  width="300" height="300" alt="File Management Image" />

  <h1>File Management</h1>

  <p>
    <strong>Manage Your Files Securely</strong>
  </p>

  <p>
    <a href="https://github.com/shindeamul76/"><img alt="Build Status" src="https://img.shields.io/badge/github-profile-blue" /></a>
  </p>
    <a href="#"><img alt="Build Status" src="https://img.shields.io/badge/File%20the%20Management-8A2BE2" /></a>
  </p>
</div>

### Note

- File Management assignment is to upload you images or docs or pdfs on s3 bucket securely .
- Run this code on local by clone this repo .

## Built With
- Nodejs
- Express
- Typescript
- Aws S3
- Multer
- Prisma
- Postgresql


## Check Locally on postman

    https://www.loom.com/share/e914f32414db47dc8316ab91816de02b?sid=fcbc2b89-21a3-4a3d-9547-fd0c241c2015


## Getting Started

```bash
    To get a local copy up and running, please follow these simple steps.
```

# Prerequisites

Here is what you need to be able to run Cal.com.

- Node.js (Version: >=18.x)
- PostgreSQL
- Yarn (recommended)

### Development

## setup


1. Clone the repo into a public GitHub repository (or fork https://github.com/shindeamul76/dataseer_file_management.git).


         https://github.com/shindeamul76/dataseer_file_management.git

2. Go to the project folder

        cd file_management

3. Install packages with yarn

         yarn

4. Set up your .env file
  
         - Duplicate .env.example to .env

5. Quick start with yarn 

          yarn run start:dev



## Manual setup

1. Configure environment variables in the .env file. Replace <user>, <pass>, <db-host>, and <db-port> with their applicable values

```
      DATABASE_URL='postgresql://<user>:<pass>@<db-host>:<db-port>'
```

<details>

<summary>If you don't know how to configure the DATABASE_URL, then follow the steps here to create a quick local DB</summary>

### Local DB

     [Download](https://www.postgresql.org/download/) and install postgres in your local (if you don't have it already). 

     Create your own local db by executing createDB <DB name>

    Now open your psql shell with the DB you created: psql -h localhost -U postgres -d <DB name>

    Inside the psql shell execute \conninfo. And you will get the following info.
       https://user-images.githubusercontent.com/39329182/236612291-51d87f69-6dc1-4a23-bf4d-1ca1754e0a35.png

Now extract all the info and add it to your DATABASE_URL. The url would look something like this
        `postgresql://postgres:postgres@localhost:5432/Your-DB-Name`

</details>

If you don't want to create a local DB. Then you can also consider using services like railway.app or render.

    - [Setup postgres DB with neon.tech](https://neon.tech)


2. Copy and paste your DATABASE_URL in .env

3. Set up the database using the Prisma schema (found in prisma/schema.prisma)
   
       In a development environment, run:

   ```
       yarn run db:push
   ```

4. Run (in development mode)

```
     yarn run start:dev
```