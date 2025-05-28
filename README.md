# TasteTrek

TasteTrek is a modern React Native app built with Expo for discovering, viewing, and saving delicious recipes. It features a beautiful UI, smooth animations, and user-friendly profile management.

## Features

- Browse recipes by category
- Search for meals and view detailed instructions
- Save favorite recipes
- Animated shared element transitions for recipe images
- Editable user profile (name, email, role, member since, favorite cuisines)
- Editable profile image (syncs across Profile and Home screens)
- Responsive design for all devices

## Tech Stack

- React Native (Expo)
- React Navigation
- react-native-reanimated
- react-navigation-shared-element
- Axios (for API requests)
- Expo Image Picker (for profile image editing)

## Setup & Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/tastetrek.git
   cd tastetrek
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Start the Expo development server:**
   ```sh
   npx expo start
   ```
4. **Run on your device:**
   - Use the Expo Go app (iOS/Android) to scan the QR code.
   - Or run on an emulator/simulator.

## Folder Structure

```
TasteTrek/
  App.js
  src/
    components/
    constants/
    navigation/
    screens/
    utils/
  assets/
    images/
    lottie/
```

## API
- Uses [TheMealDB](https://www.themealdb.com/api.php) for recipe data.

## Customization
- Update assets/images for your own branding or profile images.
- Edit `src/components/EditableProfileInfo.js` for profile fields.

## License
MIT

---
Made with ❤️ using React Native & Expo.
