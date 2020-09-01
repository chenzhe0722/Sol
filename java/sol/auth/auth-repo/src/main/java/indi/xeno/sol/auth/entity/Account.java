package indi.xeno.sol.auth.entity;

import indi.xeno.sol.common.entity.BaseNameActive;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.time.OffsetDateTime;

@Entity
public class Account extends BaseNameActive {

  @Column(nullable = false, columnDefinition = "VARCHAR(255) NOT NULL")
  private String password;

  @Column(nullable = false, columnDefinition = "VARCHAR(255) NOT NULL")
  private String alias;

  @Column(
      nullable = false,
      insertable = false,
      updatable = false,
      columnDefinition = "BOOL NOT NULL DEFAULT FALSE")
  private Boolean admin;

  @Column(
      nullable = false,
      insertable = false,
      updatable = false,
      columnDefinition = "DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP")
  private OffsetDateTime lastLoggedOut;

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getAlias() {
    return alias;
  }

  public void setAlias(String alias) {
    this.alias = alias;
  }

  public Boolean getAdmin() {
    return admin;
  }

  public void setAdmin(Boolean admin) {
    this.admin = admin;
  }

  public OffsetDateTime getLastLoggedOut() {
    return lastLoggedOut;
  }

  public void setLastLoggedOut(OffsetDateTime lastLoggedOut) {
    this.lastLoggedOut = lastLoggedOut;
  }
}
