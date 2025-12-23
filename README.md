# QuizApp

A simple quiz application built with React Native and TypeScript.

This repository contains a minimal React Native app that implements a basic quiz flow with multiple questions, user answers, and a results screen. The goal of this project is to show how I structure mobile app logic, manage state, and handle user interaction in a clean and maintainable way. It is **not** a production product, but a focused demonstration of patterns I use in larger applications.

---

## What this app demonstrates

- Basic navigation flow between screens  
- Presenting multiple quiz questions to users  
- Tracking user progress and displaying results  
- Clear and understandable component structure  
- State management using React Hooks

---

## Why this project exists

Much of my professional work is on proprietary mobile apps that cannot be published publicly. This app provides a safe and simplified example of how I approach:

- Organizing components  
- Managing app state  
- Structuring screens  
- Keeping logic easy to reason about

The code here is **IP-safe** and intended for recruiters or engineers to quickly understand my coding style.

---

## Tech stack

- React Native  
- TypeScript  
- React Hooks  
- Basic navigation

---

## Project structure (overview)

src/
│── components/ # Reusable UI components

│── screens/ # Feature screens like Quiz and Results

│── navigation/ # Navigation setup

│── utils/ # Helper functions

App.tsx # Application entry point


---

## Running the app locally

Make sure you have the React Native development environment set up first:

```bash
git clone https://github.com/obie3/QuizApp.git
cd QuizApp
npm install
npx react-native start
npm run android     # for Android
npm run ios         # for iOS



