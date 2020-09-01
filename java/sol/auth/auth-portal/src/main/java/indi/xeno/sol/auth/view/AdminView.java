package indi.xeno.sol.auth.view;

import indi.xeno.sol.common.view.IdView;

import java.math.BigInteger;

public class AdminView extends IdView {

  private final Boolean admin;

  public AdminView(BigInteger id, Boolean admin) {
    super(id);
    this.admin = admin;
  }

  public Boolean getAdmin() {
    return admin;
  }
}
