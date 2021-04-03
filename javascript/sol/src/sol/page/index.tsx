import * as React from 'react';
import {StrictMode} from 'react';
import {render} from 'react-dom';
import {LocaleProvider} from 'sol/component/locale/LocaleProvider';
import {MessageProvider} from 'sol/component/message/MessageProvider';
import {CurrentProvider} from 'sol/component/session/CurrentProvider';
import {ThemeTypeProvider} from 'sol/component/theme/ThemeTypeProvider';
import {App} from 'sol/page/App';

render(
  <StrictMode>
    <ThemeTypeProvider>
      <LocaleProvider>
        <MessageProvider>
          <CurrentProvider>
            <App />
          </CurrentProvider>
        </MessageProvider>
      </LocaleProvider>
    </ThemeTypeProvider>
  </StrictMode>,
  document.getElementById('root'),
);
