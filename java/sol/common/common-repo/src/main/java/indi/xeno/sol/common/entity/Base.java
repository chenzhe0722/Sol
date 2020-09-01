package indi.xeno.sol.common.entity;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.math.BigInteger;

import static javax.persistence.GenerationType.IDENTITY;

@MappedSuperclass
public abstract class Base implements IdEntity {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  @Column(nullable = false, insertable = false, updatable = false, columnDefinition = "SERIAL")
  private BigInteger id;

  @Override
  public BigInteger getId() {
    return id;
  }

  public void setId(BigInteger id) {
    this.id = id;
  }
}
