## Interview Prep Bot for C# on Telegram

Welcome to the Interview Prep Bot project! 🚀 This Telegram bot serves as a practical example to help users prepare for C# interviews. It has been implemented as a pet-project for educational purposes using Node.js and leverages the following libraries:
* [grammY](https://grammy.dev/): A powerful and flexible Telegram bot framework in Node.js.
* [random-js](https://www.npmjs.com/package/random-js): A versatile random number generation library for Node.js.
* [dotenv](https://www.npmjs.com/package/dotenv): A zero-dependency module that loads environment variables from a .env file into process.env.
* [nodemon](https://www.npmjs.com/package/nodemon): A utility that monitors for changes in your source code and automatically restarts the server.
  
### Getting Started
To run the project locally, follow these steps:

* Clone the repository:
```
 git clone https://github.com/kulikov-dev/.net-telegram-bot
```
* Install dependencies: npm install
* Create a .env file and configure your Telegram bot token:
```
TELEGRAM_BOT_TOKEN=your_bot_token_here
```
* Run the application: node index.js

#### Acknowledgments
Special thanks to arseniypom for the inspiration drawn from an [interesting article](https://habr.com/ru/companies/selectel/articles/765600/) that served as the foundation for building this bot.
