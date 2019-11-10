import * as Google from "expo-google-app-auth";
import { AsyncStorage } from "react-native";

export const SignInWithGoogleAsync = async () => {
  try {
    const result = await Google.logInAsync({
      androidClientId:
        "248128904879-d4bi1b7mc02nm6j2o5kqshq8e2nbiv96.apps.googleusercontent.com",
      iosClientId:
        "248128904879-6477474rddp7nsvk3qfquvmks80295sa.apps.googleusercontent.com",
      scopes: ["profile", "email", "https://www.googleapis.com/auth/calendar"]
    });

    if (result.type === "success") {
      console.log(result);
      await AsyncStorage.setItem("@RoomBooker:accessToken", result.accessToken);
      await AsyncStorage.setItem("@RoomBooker:refreshToken", result.refreshToken);
      await AsyncStorage.setItem("@RoomBooker:calendarId", result.user.email);
      await AsyncStorage.setItem("@RoomBooker:name", result.user.name);
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
};

export const getAccessToken = async () => { 
  const value = await AsyncStorage.getItem("@RoomBooker:accessToken");
  return value;
}

export const getCalendarId = async () =>{ 
  return await AsyncStorage.getItem("@RoomBooker:calendarId")
}

export const getName = async () =>{ 
  return await AsyncStorage.getItem("@RoomBooker:name")
}