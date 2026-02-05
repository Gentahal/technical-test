# NestJS Inventory System (MVC Pattern)

Aplikasi Admin Panel sederhana untuk manajemen inventaris produk menggunakan **NestJS**, **PostgreSQL**, dan **Handlebars (MVC)**.

Repo ini dibuat sebagai submission untuk Technical Test Fullstack Developer.

## Fitur
* **MVC Architecture:** Menggunakan Server-Side Rendering (SSR) dengan NestJS.
* **Authentication:** Login admin sederhana.
* **CRUD Operations:** Create, Read, Update, Delete data produk.
* **Search:** Pencarian produk real-time (case-insensitive).
* **Relational DB:** One-to-Many relation (Category -> Products).

## Tech Stack
* **Backend Framework:** NestJS (Node.js)
* **Database:** PostgreSQL
* **ORM:** Prisma
* **View Engine:** Handlebars (HBS)
* **Styling:** Bootstrap 5

## Desain Database (ERD)
Berikut Adalah Link DB diagram.io

> **[Klik di sini untuk melihat Diagram Interaktif (dbdiagram.io)](https://dbdiagram.io/d/echo-market-66b5c4228b4bb5230ea9ee87)**

- **User:** Menyimpan data login admin.
- **Category:** Kategori produk (Elektronik, Furniture, dll).
- **Product:** Data detail produk yang berelasi dengan kategori.

## Screenshoot Aplikasi

![Screenshot Aplikasi](public/img/ss-1.png)
![Screenshot Aplikasi](public/img/ss-2.png)
![Screenshot Aplikasi](public/img/ss-3.png)
![Screenshot Aplikasi](public/img/ss-4.png)
![Screenshot Aplikasi](public/img/ss-5.png)
![Screenshot Aplikasi](public/img/ss-6.png)

## Cara Install & Menjalankan

1.  **Clone Repository**
    ```bash
    git clone [https://github.com/Gentahal/technical-test.git](https://github.com/Gentahal/technical-test.git)
    cd repo
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Setup Environment**
    Buat file `.env` dan sesuaikan URL Database PostgreSQL:
    ```env
    DATABASE_URL="postgresql://user:pass@localhost:5432/db_name?schema=public"
    ```

4.  **Database Migration & Seed**
    ```bash
    npx prisma generate
    npx prisma db push
    npx ts-node prisma/seed.ts
    ```

5.  **Jalankan Server**
    ```bash
    npm run start:dev
    ```
    Buka browser di: `http://localhost:3000/auth/login`

## Akun Di seed
    ```
    sudah dibuatkan seed, pastikan ikuti dan jalankan seed agar email dan password default bisa di gunakan
    ```
* **Email:** `admin@test.com`
* **Password:** `admin`