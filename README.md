# Content

#TGL backend in NestJS

#Non-Functional Requirements

     RNF01. Build every application using Adonis JS

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
