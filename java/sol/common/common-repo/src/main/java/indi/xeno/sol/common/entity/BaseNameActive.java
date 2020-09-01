package indi.xeno.sol.common.entity;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class BaseNameActive extends BaseName implements ActiveEntity {

  @Column(
      nullable = false,
      insertable = false,
      updatable = false,
      columnDefinition = "BOOL NOT NULL DEFAULT TRUE")
  private Boolean active;

  @Override
  public Boolean getActive() {
    return active;
  }

  public void setActive(Boolean active) {
    this.active = active;
  }
}
