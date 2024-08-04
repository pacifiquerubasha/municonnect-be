# Congometrix Express Application

This is an Express application designed to provide backend services for a data accessibility platform. The application integrates with modern technologies to deliver robust API and data processing capabilities.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

To install and set up the project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/pacifiquerubasha/municonnect-be
    cd municonnect-be
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root of your project and add the following environment variables:

    ```env
    MONGO_URI=YOUR_MONGO_URI
    FRONTEND_URL=YOUR_FRONTEND_URL
    PORT=8000
    FASTAPI_URL=YOUR_FASTAPI_URL
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

The application will be available at [http://localhost:8000](http://localhost:8000).

## Usage

To use the application, follow these steps:

1. Ensure the application is running by navigating to [http://localhost:8000](http://localhost:8000).
2. Utilize the provided API endpoints for various data processing and interaction tasks.

## Environment Variables

Here are the environment variables required for the application to run:

- `MONGO_URI`: Your MongoDB connection URI
- `FRONTEND_URL`: The URL of your frontend application
- `PORT`: The port on which the server will run
- `FASTAPI_URL`: The URL of the associated FastAPI service

## Contributing

Contributions are welcome! Please fork the repository and use a feature branch. Pull requests are warmly welcome.

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License.

## Contact

Pacifique Rubasha - [p.kishinyambwe@alustudent.com](mailto:p.kishinyambwe@alustudent.com)

Feel free to contact me if you have any questions or need further information.
