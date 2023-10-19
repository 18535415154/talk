// 验证目前是否是登陆状态  未登陆：自动跳转到登陆页面  已登陆：等待继续操作
(async function () {
  const res = await API.profile();
  if (res.code != 0) {
    alert(res.msg);
    location.href = "./login.html";
    return;
  }
  const user = res.data;
  const doms = {
    aside: {
      nickname: $("#nickname"),
      loginId: $("#loginId"),
      close: $(".close"),
    },
    chatContainer: $(".chat-container"),
    txtMsg: $("#txtMsg"),
    msgContent: $(".msg-container"),
  };
  setUserInfo();

  clickLoginOut();
  doms.msgContent.addEventListener("submit", function (e) {
    e.preventDefault();
    sendChat();
  });
  await setHistory();

  /**
   * 点击按钮退出登陆
   */
  function clickLoginOut() {
    doms.aside.close.addEventListener("click", function (item) {
      API.loginOut();
      location.href = "./login.html";
    });
  }

  /**
   *创建发送的信息
   * @param {Object} chatInfo
   */
  function addChat(chatInfo) {
    // 创建聊天框
    const div = $$$("div");
    div.classList.add("chat-item");
    if (chatInfo.from) {
      div.classList.add("me");
    }
    // 创建头像
    const img = $$$("img");
    img.classList.add("chat-avatar");
    img.src = chatInfo.from ? "./asset/avatar.png" : "./asset/robot-avatar.jpg";
    // 创建内容框
    const conteDiv = $$$("div");
    conteDiv.classList.add("chat-content");
    conteDiv.innerText = chatInfo.content;
    // 创建时间
    const timeDiv = $$$("div");
    timeDiv.classList.add("chat-date");
    timeDiv.innerText = formatTime(chatInfo.createdAt);

    div.appendChild(img);
    div.appendChild(conteDiv);
    div.appendChild(timeDiv);

    doms.chatContainer.appendChild(div);
  }
  /**
   * 格式化时间 2022-04-29 14:18:16
   */
  function formatTime(time) {
    const data = new Date(time);
    const year = data.getFullYear();
    const month = (data.getMonth() + 1).toString().padStart(2, "0");
    const day = (data.getDay() + 1).toString().padStart(2, "0");
    const hours = data.getHours().toString().padStart(2, "0");
    const miute = data.getMinutes();
    const second = data.getSeconds();
    return `${year}-${month}-${day} ${hours}:${miute}:${second}`;
  }
  /**
   * 查询历史的聊天记录
   */

  async function setHistory() {
    const res = await API.history();
    for (const item of res.data) {
      addChat(item);
    }
    scrollBottom();
  }
  /**
   * 聊天滚动条滚动到底部
   */
  function scrollBottom() {
    doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight;
  }
  /**
   * 设置登陆账户的信息
   */
  function setUserInfo() {
    doms.aside.nickname.innerText = user.nickname;
    doms.aside.loginId.innerText = user.loginId;
  }
  /**
   * 发送消息
   */
  async function sendChat() {
    const content = doms.txtMsg.value.trim();
    if (!content) return;
    addChat({
      content,
      createdAt: new Date(),
      from: user.loginId,
      to: null,
    });
    doms.txtMsg.value = "";
    scrollBottom();
    const res = await API.chat(content);
    addChat({
      content: res.data.content,
      from: null,
      to: user.loginId,
      ...res.data,
    });
    scrollBottom();
  }
  window.sendChat = sendChat;
})();
