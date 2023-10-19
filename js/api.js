const API = (function () {
  const BASE_URL = "https://study.duyiedu.com";
  const TOKEN_KEY = "token";

  /**
   * 分装fetch GET方法
   * @param {*} path
   */
  function get(path) {
    const headers = {};
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path, { headers });
  }
  /**
   * 封装fetch post方法
   * @param {*} path
   * @param {*} bodyObj
   */
  function post(path, bodyObj) {
    const headers = {
      "content-type": "application/json",
    };
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path, {
      method: "post",
      headers,
      body: JSON.stringify(bodyObj),
    });
  }
  /**
   * 注册的接口
   * @param {object} userinfo 注册的对象
   * @returns {Promise} 返回响应
   */
  async function reg(userinfo) {
    const resHearder = await post("/api/user/reg", userinfo);
    return await resHearder.json();
  }

  /**
   *登陆
   * @param {object} logininfo
   */
  async function login(logininfo) {
    const resHearder = await post("/api/user/login", logininfo);
    const data = await resHearder.json();
    if (data.code === 0) {
      localStorage.setItem(TOKEN_KEY, resHearder.headers.get("Authorization"));
    }
    return data;
  }
  /**
   * 验证账号
   * @param {} loginId
   */
  async function exists(loginId) {
    const resHearder = await get("/api/user/exists?loginId=" + loginId);
    const data = await resHearder.json();
    return data;
  }

  /**
   * 查询当前登陆的用户
   */
  async function profile() {
    const resHearder = await get("/api/user/profile");
    return resHearder.json();
  }
  /**
   * 需要发送的内容
   * @param {*} content
   * @returns
   */
  async function chat(content) {
    const resHearders = await post("/api/chat", {
      content,
    });
    return resHearders.json();
  }
  /**
   * 查看当前账号的历史聊天记录
   * @returns
   */
  async function history() {
    const resHearder = await get("/api/chat/history");
    return resHearder.json();
  }
  /**
   * 退出登陆
   */
  function loginOut() {
    localStorage.removeItem(TOKEN_KEY);
  }
  return {
    reg,
    login,
    exists,
    profile,
    chat,
    history,
    loginOut,
  };
})();
