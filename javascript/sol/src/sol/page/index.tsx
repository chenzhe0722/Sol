import * as React from 'react';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {LocaleProvider} from 'sol/component/locale/LocaleProvider';
import {MessageProvider} from 'sol/component/message/MessageProvider';
import {CurrentProvider} from 'sol/component/session/CurrentProvider';
import {ThemeTypeProvider} from 'sol/component/theme/ThemeTypeProvider';
import {App} from 'sol/page/App';

const domNode = document.getElementById('root');
const root = createRoot(domNode as HTMLElement);
root.render(
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
  </StrictMode>);
