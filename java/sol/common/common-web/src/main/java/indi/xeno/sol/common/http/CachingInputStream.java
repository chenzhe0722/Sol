package indi.xeno.sol.common.http;

import javax.servlet.ReadListener;
import javax.servlet.ServletInputStream;
import java.io.ByteArrayInputStream;

class CachingInputStream extends ServletInputStream {

  private final ByteArrayInputStream is;

  CachingInputStream(byte[] bytes) {
    is = new ByteArrayInputStream(bytes);
  }

  @Override
  public int read() {
    return is.read();
  }

  @Override
  public boolean isFinished() {
    return is.available() == 0;
  }

  @Override
  public boolean isReady() {
    return true;
  }

  @Override
  public void setReadListener(ReadListener listener) {
    throw new UnsupportedOperationException();
  }
}
