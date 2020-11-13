import * as React from "react";
import {ReactNode} from "react";
import {LoginText} from 'sol/locale/component/login';

export const LOGIN_TEXT: LoginText = {
  signUp: '注册',
  signIn: '登录',
  dialog: dialog,
  success: <>注册成功。</>,
  invalid: <>用户名或密码<strong>不能</strong>为空。</>,
  inconsistent: <>密码<strong>不</strong>一致。</>,
  occupied: occupied,
};

function dialog(name: string): ReactNode {
  return (
    <>
      <p>
        您正在注册用户名<strong>{name}</strong>。
        用户名一经注册<strong>不可</strong>修改，但您可以修改显示昵称。
      </p>
      <p>
        请再次输入密码以确认注册。
      </p>
    </>
  );
}

function occupied(name: string): ReactNode {
  return <>用户名<strong>{name}</strong>已被注册。</>;
}
