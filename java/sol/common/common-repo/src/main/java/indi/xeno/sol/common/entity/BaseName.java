package indi.xeno.sol.common.entity;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class BaseName extends Base implements NameEntity {

  @Column(nullable = false, columnDefinition = "VARCHAR(255) NOT NULL")
  private String name;

  @Override
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
