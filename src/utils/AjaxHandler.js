import axios from "axios";
import showNotification from "../components/parts/notification/showNotification";

export const getPostsFromBackend = async (setPosts) => {
  try {
    const response = await axios("http://localhost:3003/api/posts");
    console.log(response.data);
    setPosts(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (data) => {
  try {
    const config = {
      url: "http://localhost:3003/api/posts",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };
    const response = await axios(config);

    showNotification(response.data.message, "normal");
    if (response.status !== 201) {
      showNotification("Client Post Error!", "red");
    }
  } catch (error) {
    console.log(error);
  }
};

export const chatHandler = async ({ data, token, setMessages }) => {
  try {
    const config = {
      url: "http://localhost:3003/api/chat",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: { userInput: data },
    };
    const response = await axios(config);
    console.log(response.data);
    setMessages((prevMessages) => [...prevMessages, response.data.newMessage]);
  } catch (e) {
    console.log(`Error: ${e}`);
    showNotification("Error with chat", "red");
  }
};
export const getChats = async ({ token, setMessages }) => {
  try {
    const config = {
      url: "http://localhost:3003/api/chat",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    const response = await axios(config);
    console.log(response.data);
    setMessages(response.data);
  } catch (e) {
    console.log(`Error: ${e}`);
    showNotification("Error with chat", "red");
  }
};
