import * as React from 'react';
import {StrictMode} from 'react';
import {render} from 'react-dom';
import {LocaleProvider} from 'sol/component/locale/LocaleProvider';
import {LoginProvider} from 'sol/component/login/LoginProvider';
import {MessageProvider} from 'sol/component/message/MessageProvider';
import {ThemeTypeProvider} from 'sol/component/theme/ThemeTypeProvider';
import {App} from 'sol/page/App';

render(
  <StrictMode>
    <ThemeTypeProvider>
      <LocaleProvider>
        <MessageProvider>
          <LoginProvider>
            <App />
          </LoginProvider>
        </MessageProvider>
      </LocaleProvider>
    </ThemeTypeProvider>
  </StrictMode>,
  document.getElementById('root'),
);
