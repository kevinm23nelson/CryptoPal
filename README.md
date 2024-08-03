# CryptoPal
CryptoPal is a web application designed to help users explore and simulate investments in the top 100 cryptocurrencies. Tailored for individuals who want to gain hands-on experience with cryptocurrency trading without financial risk, CryptoPal offers a safe environment for practicing investing. Users can view detailed information on each cryptocurrency, manage their favorites, and utilize various filters to find currencies that meet their criteria. With CryptoPal, you can confidently learn and practice cryptocurrency investing before committing real money.

#
[r2h]: crypto-pal-rs14-igammdd7i-kevin-nelsons-projects.vercel.app
[r2hc]: crypto-pal-rs14-igammdd7i-kevin-nelsons-projects.vercel.app

## Features
- Display a list of the top 100 cryptocurrencies with details like name, symbol, rank, price, and 24-hour change.
- Search functionality to find specific cryptocurrencies.
- Favorite/unfavorite cryptocurrencies with state persisted in local storage.
- Dynamic styling based on the 24-hour change percentage (positive or negative).
- Responsive design to ensure usability across different devices and screen sizes.

## Technologies Used
- React
- React Router
- Cypress
- JavaScript
- HTML
- CSS
- Fetch API

## Installation Instructions
To run this project locally, follow these steps:

1. **Clone the repository**
    by running ```git clone https://github.com/kevinm23nelson/cryptopal```
2. **Navigate into the project directory**
   by running ```cd cryptopal```
3. **Install dependencies**
    by running ```npm install```
4. **Start the development server**
    by running ```npm start```
5. **To Install Cypress Testing**
    by running ```npm install cypress --save-dev```
6. **To Run Cypress Testing**
    by running ```npx cypress open```
8. **Enjoy Viewing Currencies and Trading on CryptoPal!**

## Challenges
Handling asynchronous data fetching and ensuring the application state is updated correctly.
Managing local storage to persist user favorites and ensuring this state is reflected accurately in the UI.
Implementing robust Cypress tests to ensure the reliability of core functionalities, like adding to favorites and displaying currency details.
Dynamic styling based on real-time data changes and ensuring CSS classes are applied correctly.
## Wins
Successfully integrated Cypress for end-to-end testing, enhancing the reliability of the application.
Efficiently implemented the favorite/unfavorite feature with local storage, providing a seamless user experience.
Developed a responsive design that works well across various devices, ensuring accessibility for all users.
## Future Feature
A future feature that I would love to implement would be for the application to properly handle the selling of currencies and to be able to factor the impact of that sale (currencies price that day compared to the prices of past transactions where you bought that currency) and be able to factor sales into the total portfolio performance.

## Screenshots:
Multiple Screen Sizes
### Desktop View

<img width="1393" alt="Screenshot 2024-08-03 at 2 51 57 AM" src="https://github.com/user-attachments/assets/c6041a6c-4ad2-4163-9691-d4bbbcb93f1e">

### Tablet View

<img width="674" alt="Screenshot 2024-08-03 at 2 47 57 AM" src="https://github.com/user-attachments/assets/7b8655f6-fda4-40be-976c-e5bb785e9b48">

### Mobile View

<img width="608" alt="Screenshot 2024-08-03 at 2 47 42 AM" src="https://github.com/user-attachments/assets/8043a4f7-7b01-44da-ac8f-96cadc1126ce">

## Lighthouse Score and Accessibility

<img width="1473" alt="Screenshot 2024-08-03 at 3 17 17 PM" src="https://github.com/user-attachments/assets/ad5609fd-50ee-41c8-ad47-318efe325c69">

<img width="1468" alt="Screenshot 2024-08-03 at 3 32 29 PM" src="https://github.com/user-attachments/assets/063093cc-f097-489b-8efd-80e57d8a2d75">

<img width="1295" alt="Screenshot 2024-08-03 at 3 33 25 PM" src="https://github.com/user-attachments/assets/25a1a111-1552-46bf-9899-76769a957217">

<img width="1333" alt="Screenshot 2024-08-03 at 4 48 10 PM" src="https://github.com/user-attachments/assets/fe493d1f-0ef4-46d5-9641-0c35d09d73cc">

## Acknowledgements
- [Turing](https://turing.edu/) for education.
- [React.dev](https://react.dev/) for React documentation.
- [Cypress Docs](https://docs.cypress.io/) for Cypress training and documentation.
