//登陆和注册验证表单的通用代码
class FieldValidator {
  /**
   * 构造器
   * @param {String} textId 文本框的id
   * @param {Function} validatorFunc 验证规则函数
   */
  constructor(textId, validatorFunc) {
    this.input = $(`#${textId}`);
    this.p = this.input.nextElementSibling;
    this.validatorFunc = validatorFunc;
    this.input.onblur = () => {
      this.validate();
    };
  }
  /**
   * 验证成功 返回 true 失败返回false
   */
  async validate() {
    let tip = await this.validatorFunc(this.input.value);
    if (tip) {
      this.p.innerText = tip;
      return false;
    } else {
      this.p.innerText = "";
      return true;
    }
  }
  /**
   * 进行集体进行验证 验证成功 返回true  错误返回false
   * @param {Array} validators
   */
  static async validate(validators) {
    // let res = await validators.every(async (select) => {
    //   let isValidate = await select.validate();
    //   console.log(await select.validate()); // 俩个false
    //   return isValidate;
    // });
    // console.log(res);
    const res = validators.map((i) => i.validate());
    const resArr = await Promise.all(res);
    return resArr.every((i) => i);
  }
}

// 表单所有项 进行表单验证 test
// FieldValidator.validate().then((res) => {
//   return res;
// });
