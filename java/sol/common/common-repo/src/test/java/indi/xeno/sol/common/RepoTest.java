package indi.xeno.sol.common;

import indi.xeno.sol.common.entity.User;
import indi.xeno.sol.common.repo.CountryRepo;
import indi.xeno.sol.common.repo.UserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.Optional;

import static indi.xeno.sol.common.enums.Gender.FEMALE;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
@ActiveProfiles("test")
class RepoTest {

  private final CountryRepo countryRepo;

  private final UserRepo userRepo;

  RepoTest(@Autowired CountryRepo countryRepo, @Autowired UserRepo userRepo) {
    this.countryRepo = countryRepo;
    this.userRepo = userRepo;
  }

  @Test
  void test() {
    assertEquals(countryRepo.findByActiveTrue().size(), 2);

    assertEquals(deactivateUser(BigInteger.valueOf(4L)), 1);
    assertEquals(userRepo.findByActiveTrue().size(), 3);

    Optional<User> user = userRepo.findByIdAndActiveTrue(BigInteger.valueOf(2L));
    assertTrue(user.isPresent());
    assertEquals(user.get().getGender(), FEMALE);
    assertEquals(user.get().getCountry().getName(), "China");

    assertFalse(countryRepo.findByNameAndActiveTrue("America").isEmpty());
    assertTrue(userRepo.findByNameIsAndActiveTrue("Amy").isEmpty());
  }

  @Transactional
  int deactivateUser(BigInteger id) {
    return userRepo.setActiveById(id, false);
  }
}
