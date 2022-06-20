# geolocation-app

This is a simple Geolocation and OpenWeather app to showcase some coding skills.

![WhatsApp Image 2022-06-20 at 14 38 33](https://user-images.githubusercontent.com/17079128/174658377-6adc18ae-a5a1-4a8e-bd8a-db19587b93a1.jpeg)
![WhatsApp Image 2022-06-20 at 14 38 33 (1)](https://user-images.githubusercontent.com/17079128/174658389-dd4d2962-c872-43ec-bede-5bca33038f45.jpeg)


## Prerequisites

- [Node.js > 12](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
- [Watchman](https://facebook.github.io/watchman)
- [Xcode 12](https://developer.apple.com/xcode)
- [Cocoapods 1.10.1](https://cocoapods.org)
- [JDK > 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Android Studio and Android SDK](https://developer.android.com/studio)

## Base dependencies

- [prop-types](https://github.com/facebook/prop-types) to type-check our components exposed properties.
- [react-native-config](https://github.com/luggit/react-native-config) to manage envionments.
- [react-navigation](https://reactnavigation.org/) navigation library.
- [react-native-geolocation](https://github.com/michalchudziak/react-native-geolocation) for string localization.
- [react-native-maps](https://github.com/stefalda/ReactNativeLocalization) for map display.
- [react-native-paper](https://github.com/stefalda/ReactNativeLocalization) for ui components.
- [react-native-vector-icons](https://github.com/stefalda/ReactNativeLocalization) for icon usage (react-native-paper dependency).

## Folder structure

This project follows a very simple structure:

- `App.tsx`: Main component that starts your whole app.
- `index.js`: Entry point of your application as per React-Native standards.
- `src`: This folder is the main container of all the code inside your application.
  - `assets`: Asset folder to store all images, vectors, etc.
  - `components`: Folder to store any common component that you use through your app (such as a generic button)
  - `screens`: Folder that contains all your application screens/features.
  - `hooks`: Folder that contains all your application hooks.
  - `utils`: Folder that contains generic ultilities functions and files.

## How to setup

### Setup environment

First of all, make sure you have JDK, Xcode for iOS testing and Android SDK for Android testing installed.

After cloning this project, go to the project root folder and run:
```bash
yarn
```

After the dependencies instalation is complete, you need to install the necessary pods to run on iOS:
```bash
cd ./ios
pod install
```

React Native Paper (our UI library) uses `react-native-vector-icons` as a dependency, and this lib need manual linking to work properly, as it still does not suport react-native auto-linking. So we run:
```bash
npx react-native link react-native-vector-icons
```

Now we have to configure our API Key for the OpenWeather service. Firstly, register at https://openweathermap.org/api and subscribe to the free `Current Weather Data`. After generating your API Key, you have to store it on a `.env` file. So, in our project root folder, create a `.env` file with the following: 
``` 
OPEN_WEATHER_API={YOUR GENERATED API}
#don`t forget to remove the brackets
```

Next, we need a device to run our app. You can choose between plugging a device via USB with developer mode and USB debbuging emabled (to set this up, I recommend searching how to do so for your specific device) or using a simulator. I also recommend using a physical device as it is easier to use the device geolocation features.

To run on desired platform, run:
```bash
 # for android devices
yarn run android

 # for ios devices
yarn run ios
```
And that's it! The app should be running on your selected device and showing your current location (after you grant permission to do so) and current weather info and forecast.

If you have any doubts, feel free to contact me.


