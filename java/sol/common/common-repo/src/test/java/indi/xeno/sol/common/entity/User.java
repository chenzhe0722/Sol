package indi.xeno.sol.common.entity;

import indi.xeno.sol.common.converter.GenderConverter;
import indi.xeno.sol.common.enums.Gender;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class User extends BaseNameActive {

  @Column(nullable = false, columnDefinition = "BOOL NOT NULL")
  @Convert(converter = GenderConverter.class)
  private Gender gender;

  @ManyToOne
  @JoinColumn(name = "country_id", nullable = false, columnDefinition = "BIGINT UNSIGNED NOT NULL")
  private Country country;

  public Gender getGender() {
    return gender;
  }

  public void setGender(Gender gender) {
    this.gender = gender;
  }

  public Country getCountry() {
    return country;
  }

  public void setCountry(Country country) {
    this.country = country;
  }
}
