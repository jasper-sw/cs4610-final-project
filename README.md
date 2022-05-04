# cs4610-final-project

# Requirements
- Have docker desktop installed on your local system

# Setup for easy local developemnt
- Clone this repo in the location you wish to deploy the site
- Open a terminal/cmd window and navigate to the 'backend-container/aggieForum/' directory
- Once there use the following command to start the backend: ```python manage.py runserver```
- Open a second terminal/cmd window and navigate to the 'frontend-container/aggie-forum/' directory
- Once there, run ```yarn``` to install the required yarn packages
- With the packages installed run ```yarn start``` to start the frontend
- That's it!

# Setup for local container developement
- Clone this repo in the location you wish to deploy the site
- Navigate to the 'backend-container/' directory
- Set the appropriate base URL for the frontend in the backend-container/.env file, this is usually localhost:3000
- From that same backend-container/ directory open a terminal/cmd window and run ```docker compose up --build```
- Navigate to the 'fronend-container/' directory
- Set the appropriate base URL for the backend in the frontend-container/.env file, this is usually localhost:8000
- open a terminal/cmd window and run ```docker compose up --build```
- That's it!

# Setup for deployment
- Clone this repo in the location you wish to deploy the site
- Set the appropriate base URL (the URL where you'll host both the frontend and backend containers) in the backend-container/.env file and in the frontend-container/.env file
- in the root folder of the repo, use the following command: ```docker-compose up --build```
- That's it!

# Additional Info
- The backend should be running on localhost:8000
- The frontend should be running on localhost:3000
