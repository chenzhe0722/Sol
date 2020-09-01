import * as React from 'react';
import {StrictMode} from 'react';
import {render} from 'react-dom';
import {LoginProvider} from 'sol/component/login/LoginProvider';
import {MessageProvider} from 'sol/component/message/MessageProvider';
import {ThemeTypeProvider} from 'sol/component/theme/ThemeTypeProvider';
import {App} from 'sol/page/App';

render(
  <StrictMode>
    <LoginProvider>
      <ThemeTypeProvider>
        <MessageProvider>
          <App />
        </MessageProvider>
      </ThemeTypeProvider>
    </LoginProvider>
  </StrictMode>,
  document.getElementById('root'),
);
