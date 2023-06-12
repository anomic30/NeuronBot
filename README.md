<p align="center">
   <br/>
   <a href="https://neuronbot.pages.dev/">
   <img width="150px" src="./public/neuron.png" />
   </a>
   <h3 align="center">Neuron</h3>
   <p align="center"></p>
</p>


# Neuron

Level up your Discord community with an AI bot like no other! Seamlessly blend chatGPT/Bard's conversational prowess with DALL-E/Stable Diffusion's mesmerizing image generation for a truly immersive experience.

<!-- create a  button to invite the bot to your server -->
<a href="https://discord.com/api/oauth2/authorize?client_id=1073986118892146799&permissions=2147683392&scope=bot%20applications.commands"><img src="https://img.shields.io/badge/Invite%20the%20bot%20to%20your%20server-7289DA?style=for-the-badge&logo=discord&logoColor=white" /></a>

## Features and Commands

| Feature | Description | Command |
| --- | --- | --- |
| Chat | Chat with the bot | `/ask` |
| Image | Generate an image | `/draw` |
| Ping | Check the bot's latency | `/ping` |
| Credits | Check how many credits does the user has | `/credits` |
| Refill | Allows the server admin to refill credits | `/refill` |
| Help | Get help with the commands | `/help` |

About the credits feature:  *It is a way to limit the AI usage of the bot. The bot will only respond to the user if they have enough chat/image credits. The credits are refilled every week. The server admin can refill the credits manually using the `/refill` command.*

## Getting started

First, make sure you have all these installed on your local machine & then continue.

* Node.js v16.13.1^
* NPM v8.1.0^

Required API keys from the following services:

* [OpenAI](https://beta.openai.com/) 
* [Infura IPFS](https://infura.io/)
* [Bard](https://bardlabs.com/)
* [Leap AI](https://tryleap.ai/)
* [Discord](https://discord.com/developers/applications)
* [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/anomic30/NeuronBot.git
    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Enter your API keys in `.env` , check the `env.example` file for the required keys. 
   
4. Run the bot
    ```sh
    npm start
    ```
5. Invite the bot to your server
6. Enjoy!


