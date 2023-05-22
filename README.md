# Content

#TGL backend in NestJS

#Non-Functional Requirements

     RNF01. Build every application using Nest JS

     RNF02. Build database based on sql

     RNF03. Use validators

     RNF04. Use Docker to keep the application inside a container.

     RNF05. Tests for Users, Games and Bets.

#Functional Requirements

     RF01. Microservice with Kafka and express in email to new users, password recovery and new bets (mailtrap)

     RF02. Login with JWT

     RF03. CRUD of users

     RF04.CRUD of games

     RF05. CRUD of bets

     RF06. Create access profiles (admin and player) and determine private routes <-

     RF07. Create a scheduler to run every day at 09:00, triggering emails only to players who haven't bet within 1 week prior to the current day inviting them to place a bet

# 📋 Requirements for running project

Node 14.18.0+

Interminal use: yarn

# 🛠️ Run project without docker

In terminal use: yarn && yarn start

In terminal use: npx prisma migrate dev

# ✔️ Running with Docker

Install docker

docker build -t tgl-nest

docker run -p 3000:3000 -d tgl-nest

docker-compose up -d

After that process you can use only "docker-compose up" to open the project.
