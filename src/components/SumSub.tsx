import SumsubWebSdk from "@sumsub/websdk-react";
import { useState, useEffect } from "react";
import axios from "axios";

const SumSub = () => {
  const [accessToken, setAccessToken] = useState("");

  // const accessToken = process.env.TOKEN as string;
  useEffect(() => {
    fetchAccessToken();
  }, []);

  const fetchAccessToken = async () => {
    const response = await axios.post(
      "https://api.sumsub.com/resources/accessTokens"
    );
    const token = response.data.accessToken;
    setAccessToken(token);
    console.log(response);
  };

  if (!accessToken) return <div>Loading...</div>;

  return (
    <SumsubWebSdk
      testEnv={true}
      accessToken={process.env.TOKEN || ""}
      expirationHandler={() => Promise.resolve(accessToken)}
      config={{
        email: "testing@gmail.com",
        phone: "+923019475033",
      }}
      onMessage={(data, payload) => console.log("onMessage: ", data, payload)}
      onError={(data) => console.log("onError", data)}
    />
  );
};
export default SumSub;
// const updateNewAccessToken = () => Promise.resolve("accessNewToken");
// function launchWebSdk() {
//   const accessToken = process.env.TOKEN as string;
//   const applicantEmail = process.env.APPLICANT_EMAIL as string;
//   const applicantPhone = process.env.APPLICANT_PHONE as string;
//   let snsWebSdkInstance = snsWebSdk
//     .init(accessToken, () => updateNewAccessToken())
//     .withConf({
//       lang: "en", //language of WebSDK texts and comments (ISO 639-1 format)
//       email: applicantEmail,
//       phone: applicantPhone,
//     })
//     .withOptions({ addViewportTag: false, adaptIframeHeight: true })
//     // see below what kind of messages WebSDK generates
//     .on("idCheck.onStepCompleted", (payload) => {
//       console.log("onStepCompleted", payload);
//     })
//     .on("idCheck.onError", (error) => {
//       console.log("onError", error);
//     })
//     .build();

//   // you are ready to go:
//   // just launch the WebSDK by providing the container element for it
//   snsWebSdkInstance.launch("#sumsub-websdk-container");
// }
