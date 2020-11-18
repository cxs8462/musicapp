import { req } from "@/until/req";

export const Login = (type, data) => {
  if (type === "phone") {
    return req("/login/cellphone", { phone: data.username, password: data.password });
  } else {
    return req("/login", {
      email: data.username,
      password: data.password
    });
  }
};
export const getStatus = ()=>{
  return req("/login/status")
}
