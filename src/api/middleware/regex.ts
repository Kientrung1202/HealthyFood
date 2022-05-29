export const validPhone = (phone: string) => {
  const regPhone =
    /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
  return regPhone.test(phone);
};

export const validPw = (pw: string) => {
  // toi thieu 8 ky tu, it nhat 1 chu cai, 1 so va 1 ky tu db
  const regPass =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return regPass.test(pw);
};
