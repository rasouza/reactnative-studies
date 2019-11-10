import * as Google from "expo-google-app-auth";

export const SignInWithGoogleAsync = async () => {
  try {
    const result = await Google.logInAsync({
      androidClientId:
        "248128904879-d4bi1b7mc02nm6j2o5kqshq8e2nbiv96.apps.googleusercontent.com",
      iosClientId:
        "248128904879-6477474rddp7nsvk3qfquvmks80295sa.apps.googleusercontent.com",
      scopes: ["profile", "email"]
    });

    if (result.type === "success") {
      console.log(result.accessToken);
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
};

export const getAccessToken = () =>
         "ya29.ImSwB-JlBuE2jVv_8Fobo2eNUKjh6i4E7UKPXP4FtEct4J-PzaboLghd85MmW9PhpldXdIEAp83ky_8_ifetrSBU0DFoJHY7f9QWU98ct3CbhzfCMv3mXRFz7Ujk1rAbW-HsufF8";

export const getCalendarId = () => "ismael.guimaraes@sumup.com"
