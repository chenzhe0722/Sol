package indi.xeno.sol.common.http;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class CachingRequest extends HttpServletRequestWrapper {

  private final byte[] content;

  public CachingRequest(HttpServletRequest request) throws IOException {
    super(request);
    InputStream is = request.getInputStream();
    content = is.readAllBytes();
    is.close();
  }

  @Override
  public ServletInputStream getInputStream() {
    return new CachingInputStream(content);
  }

  @Override
  public BufferedReader getReader() {
    return new BufferedReader(new InputStreamReader(getInputStream()));
  }
}
