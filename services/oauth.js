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
  "ya29.ImSwBzRw0SwRmct-kuiiY_4uVf6He5gLBef0fKKAmvSopiYH-6e2OjTWQI_3CjHM_Nlgpu6ZrVrpPYifIDAK1hVce3g82FwzsjoD8UFDnhzzeM1tIBAjo64HMFDdLB459dnERXrf";

export const getCalendarId = () => "ismael.guimaraes@sumup.com";
