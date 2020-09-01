package indi.xeno.sol.auth.view;

import indi.xeno.sol.common.view.IdView;

import java.math.BigInteger;

public class ActiveView extends IdView {

  private final Boolean active;

  public ActiveView(BigInteger id, Boolean active) {
    super(id);
    this.active = active;
  }

  public Boolean getActive() {
    return active;
  }
}
