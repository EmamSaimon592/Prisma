# Prisma setup
   Relational Database (MySQL and PostgreSQL)

# MySQL 
## set up Prisma ORM
Relational databases (JavaScript and MySQL)

# Create project setup
As a first step, create a project directory and navigate into it:

```besh
mkdir hello-prisma
cd hello-prisma
```
Next, initialize a Node.js project and add the Prisma CLI as a development dependency to it:

```besh
npm init -y
npm install prisma --save-dev
```
Next, set up your Prisma ORM project by creating your Prisma Schema file with the following command:

```besh
npx prisma init --datasource-provider mysql --output ../generated/prisma
```

### prisma/schema.prisma
To connect your database, you need to set the url field of the datasource block in your Prisma schema to your database connection URL:
```besh
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```
In this case, the url is set via an environment variable which is defined in <b> .env: </b>

```
DATABASE_URL="mysql://johndoe:randompassword@localhost:3306/mydb"
```
The format of the connection URL for your database typically depends on the database you use. For MySQL, it looks as follows (the parts spelled all-uppercased are placeholders for your specific connection details):

```besh
mysql://USER:PASSWORD@HOST:PORT/DATABASE
```
Here's a short explanation of each component:

    USER: The name of your database user
    PASSWORD: The password for your database user
    PORT: The port where your database server is running (typically 3306 for MySQL)
    DATABASE: The name of the database

As an example:
```
DATABASE_URL="mysql://root:randompassword@localhost:3306/mydb"
```

# Using Prisma Migrate with JavaScript and MySQL
1. Creating the database schema

``` 
// schema.prisma

// 1️⃣ Database connection
datasource db {
  provider = "mysql"              // or "postgresql" / "sqlite" depending on your DB
  url      = env("DATABASE_URL")  // stored in .env file
}

// 2️⃣ Prisma client generator
generator client {
  provider = "prisma-client-js"
}

// 3️⃣ Database models
model User {
  id       Int       @id @default(autoincrement())
  email    String    @unique
  name     String?
  posts    Post[]
  profile  Profile?
}

model Post {
  id         Int      @id @default(autoincrement())
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  title      String   @db.VarChar(255)
  content    String?
  published  Boolean  @default(false)
  author     User     @relation(fields: [authorId], references: [id])
  authorId   Int
}

model Profile {
  id      Int    @id @default(autoincrement())
  bio     String?
  user    User   @relation(fields: [userId], references: [id])
  userId  Int    @unique
}

```

#  Finally, run migration commands
1. In your terminal (inside the project folder):

```
npx prisma migrate dev --name init
```

# Install Prisma Client (JavaScript and MySQL)
to get started with Prisma Client, first install the @prisma/client package:

```besh
npm install @prisma/client
```
Then, run prisma generate which reads your Prisma schema and generates the Prisma Client.

```besh
npx prisma generate

```

# if you wanna MySQL password changed 
1. Step-by-Step: Change MySQL Root Password
### 1. Open MySQL as root
 In your terminal or command prompt:
 ```besh
mysql -u root -p
```

### 2. Change the password
 Once inside the MySQL console, run:
```besh
ALTER USER 'root'@'localhost' IDENTIFIED BY 'yourNewPassword';
FLUSH PRIVILEGES;
```
### 3. Verify the password change
Exit MySQL:
```
exit
```

### Then try to log in again:
```besh
mysql -u root -p
```
<b>Now enter your new password — it should work </b>

### 4. Update your .env for Prisma
Once it’s working, open your .env file and update this line:
```besh
DATABASE_URL="mysql://root:yourNewPassword@localhost:3306/yourDatabaseName "

```
### 5. Regenerate Prisma client and migrate again
Run these:
```besh
npx prisma generate
npx prisma migrate dev --name update-password
```
# Author
Imam Hossain <br>
Bsc in CSE <br>
IIUC

