import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// const BASEURL = "https://api.bhadaapp.com/api/"
const BASEURL = "https://api.bdrl.co.in/api/"
const BDRL_User = `${BASEURL}auth/`;

export const ApiUrl = {
  registerApi: `${BDRL_User}create/vendor`,
  loginApi: `${BDRL_User}login`,
  forgotPasswordApi: `${BDRL_User}password/forgot`,
  passwordResetApi: `${BDRL_User}password/reset`,
  resendOtpApi: `${BDRL_User}resend/otp`,
  getDetailsApi: `${BDRL_User}get/details`,
  updateProfileApi: `${BDRL_User}update/profile/vendor`,
  // getAllQuotationsQueryApi: `${BASEURL}getall/query`,
  getAllQuery: `${BASEURL}getall/query`,
  createQuoteApi: `${BASEURL}create/quote`,
  addTruckApi: `${BASEURL}create/truck`,
  // getAllTruckApi: `${BASEURL}all/truck`,
  getAllTruckApi: `${BASEURL}truck/get/byID`,
  supportApi: `${BDRL_User}create/support`,
  getAllQuotationsApi: `${BASEURL}all/quotation`,
  // addFilterApi: `${BASEURL}getall/query?`,
  paymenStatusApi: `${BASEURL}all/payment`,
  emailOtpVerify: `${BDRL_User}verified/account`,
  uploadLrApi: `${BASEURL}upload/LR`,
  uploadPodApi: `${BASEURL}upload/POD`,
  getDriverDetialsApi: `${BASEURL}create/contact`,
  getAdvancePaymentApi: `${BASEURL}create/advance`,
  getTakePaymentApi: `${BASEURL}take/balance`,
  fcmTokeSendApi: `${BASEURL}update/fcm/token`,
  // Admin Api Required
  getAllTruchLengthApi: `${BASEURL}get/truck/length`,
  // getAllTruchLengthApi: `${BASEURL}get/truck/length`,
  generateInvoiceApi: `${BASEURL}generate/invoice`,
  // create/vendor
  signup: `${BDRL_User}create/user`,
  getProfile: `${BDRL_User}get/details`,
  submitQuery: `${BASEURL}create/query`,
  getApprovalQuery: `${BASEURL}all-quotation`,
  createSupport: `${BDRL_User}create/support`,
  forgetPassword: `${BDRL_User}password/forgot`,
};

export const APIRequest = async (
  config = {},
  onSuccess,
  onError,
  noAuth = null
) => {
  const token = await AsyncStorage.getItem("token").catch((err) =>
    console.log(err)
  );
  try {
    let data = {};
    if (token && noAuth == null) {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          // token: token
        },
      };
    } else {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
    }
    axios(data)
      .then((res) => {
        if (!res.data.error) {
          onSuccess(res?.data);
        } else {
          onError(res?.data ? res.data : res);
        }
      })
      .catch((err) => {
        console.log(err);
        onError(err?.response?.data ? err?.response?.data : err?.response);
      });
  } catch (error) {
    console.log("error", error);
  }
};

export const APIRequestWithFile = async (config = {}, onSuccess, onError) => {
  // const token = new User().getToken();
  const token = await AsyncStorage.getItem("token").catch((err) =>
    console.log(err)
  );

  try {
    let data;
    if (token) {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
          Accept: "multipart/form-data",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          token: token,
        },
      };
    } else {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
          Accept: "multipart/form-data",
          "Content-Type": "multipart/form-data",
        },
      };
    }

    axios(data)
      .then((res) => {
        // if (res.status == 200 || res.status == 201) {
        //   console.log(res.data);
        //   onSuccess(res.data);
        // }
        // console.log("asdas",res);

        if (!res?.data?.error) {
          onSuccess(res?.data);
        } else {
          onError(res?.data ? res.data : res);
        }
      })
      .catch((err) => {
        onError(err?.response);
      });
  } catch (error) {
    console.log(error);
  }
};
