//创建loginId的实例
const loginIdValidator = new FieldValidator("txtLoginId", async function (val) {
  if (!val) {
    return "账号不能为空";
  }
  const resp = await API.exists(val);
  if (resp.data) {
    return "该账号已存在";
  }
});

// 创建nickName实例
const nicknameValidator = new FieldValidator("txtNickname", async function (
  val
) {
  if (!val) {
    return "昵称不能为空";
  }
});

// 创建密码验证实例
const txtLoginPwdValidator = new FieldValidator("txtLoginPwd", async function (
  val
) {
  if (!val) {
    return "密码不能为空";
  }
});
// 创建确认密码验证实例
const txtLoginPwdConfirmValidator = new FieldValidator(
  "txtLoginPwdConfirm",
  function (val) {
    if (!val) {
      return "确认密码不能为空";
    }
    if (val != txtLoginPwdValidator.input.value) {
      return "俩次密码不一致";
    }
  }
);

const formDom = $(".user-form");
formDom.addEventListener("submit", async function (e) {
  e.preventDefault();
  const validate = await FieldValidator.validate([
    loginIdValidator,
    nicknameValidator,
    txtLoginPwdValidator,
    txtLoginPwdConfirmValidator,
  ]);
  if (!validate) {
    return; //验证不通过
  }
  const formData = new FormData(formDom); //获得一个迭代器
  /**
   * 迭代器可以使用for of 循环进行遍历
   * Object.fromEntries(formData.entries()) 获取对象
   *
   */
  // for (const [key, value] of formData) {
  //   console.log(value);
  // }
  //获取form表单
  const data = Object.fromEntries(formData.entries());
  // 等待注册结果的返回
  const res = await API.reg(data);
  // 判断注册是否成功
  if (res.code === 0) {
    alert("注册成功");
    location.href = "./login.html";
  }
});
