//登陆账号验证
const txtLoginIdValidator = new FieldValidator("txtLoginId", async function (
  val
) {
  if (!val) {
    return "账号不能为空";
  }
});
//登陆密码验证
const txtLoginPwdValidator = new FieldValidator("txtLoginPwd", async function (
  val
) {
  if (!val) {
    return "密码不能为空";
  }
});

// 获取登陆表单
const formDom = $(".user-form");
formDom.addEventListener("submit", async (e) => {
  e.preventDefault();
  const validate = await FieldValidator.validate([
    txtLoginIdValidator,
    txtLoginPwdValidator,
  ]);
  if (!validate) {
    return; //验证不通过
  }
  const formData = new FormData(formDom);
  const data = Object.fromEntries(formData);
  const res = await API.login(data);
  if (res.code === 0) {
    alert("登陆成功,点击确定跳转首页");
    location.href = "./index.html";
  } else {
    alert(res.msg);
  }
});
