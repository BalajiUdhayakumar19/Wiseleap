let loginData = {
  appUrl: "https://staging-web.wise.live/login",
  mobileNumber: "1111100000",
  otp: "0000",
};

let assertionData = {
  login: "Login",
  nameOfInsititute: "Testing Institute",
  nameOfCourse: "Classroom for Automated testing",
  Account: "Account",
  sessionButton: " Schedule Sessions",
  alertMessage: "Please enter a valid mobile number.",
};

let liveSessionData = {
  time: "10:00 PM",
  duration: "60 minutes",
};
module.exports = {
  loginData,
  assertionData,
  liveSessionData,
};
