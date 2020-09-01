package indi.xeno.sol.common.view;

import java.math.BigInteger;

public class IdView {

  private final BigInteger id;

  public IdView(BigInteger id) {
    this.id = id;
  }

  public BigInteger getId() {
    return id;
  }
}
