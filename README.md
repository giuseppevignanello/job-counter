# How to use Job Counter

## Prerequisites

- PHP installed on your system
- Composer installed on your system
- Node.js and npm installed on your system

## Installation

1. **Clone the repository:**

    ```bash
    git clone (https://github.com/giuseppevignanello/job-counter.git)
    ```

2. **Install PHP dependencies:**

    ```bash
    composer install
    ```

3. **Install JavaScript dependencies:**

    ```bash
    cd front-end
    npm install
    ```

4. **Configure the environment file:**

    - Copy the `.env.example` file and rename it to `.env`
    - Modify the environment variables in the `.env` file according to your needs

5. **Generate Laravel application key:**

    ```bash
    php artisan key:generate
    ```

6. **Run database migrations:**

    ```bash
    php artisan migrate
    ```

## Starting the Server

1. **Start the Laravel server:**

    ```bash
    php artisan serve
    ```

2. **Start the front-end server:**

    ```bash
    cd front-end
    npm run dev 
    ```

Feel free to reach out if you have any questions or encounter issues. Enjoy using the application!
