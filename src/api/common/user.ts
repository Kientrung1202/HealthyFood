import User from "../../models/user";

export const findUserByUserName = async (userName: string) => {
  try {
    const result = await User.findOne({
      where: {
        userName,
      },
    });
    return result;
  } catch (err) {
    console.log(err);
  }
};
