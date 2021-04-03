import * as React from 'react';
import {ReactNode} from 'react';
import {LoginText} from 'sol/locale/component/session';

export const LOGIN_TEXT: LoginText = {
  name: '用户名',
  password: '密码',
  signUp: '注册',
  signIn: '登录',
  confirm: '确认',
  cancel: '取消',
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
