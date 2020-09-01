package indi.xeno.sol.common.exception;

import java.io.Serial;

public class SwitchException extends RuntimeException {

  @Serial
  private static final long serialVersionUID = 1L;

  public SwitchException() {
    super();
  }

  public SwitchException(String msg) {
    super(msg);
  }

  public SwitchException(String msg, Throwable cause) {
    super(msg, cause);
  }

  public SwitchException(Throwable cause) {
    super(cause);
  }

  public SwitchException(String msg, Throwable cause, boolean suppress, boolean traceable) {
    super(msg, cause, suppress, traceable);
  }
}
