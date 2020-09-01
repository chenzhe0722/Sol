package indi.xeno.sol.auth.service;

import indi.xeno.sol.auth.entity.Account;
import indi.xeno.sol.auth.projection.Alias;
import indi.xeno.sol.auth.repo.AccountRepo;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigInteger;

import static indi.xeno.sol.auth.util.SecurityUtils.passwordEncoder;
import static org.slf4j.LoggerFactory.getLogger;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.UNPROCESSABLE_ENTITY;

@Service
public class AccountService {

  private static final Logger logger = getLogger(AccountService.class);

  private final AccountRepo repo;

  public AccountService(@Autowired AccountRepo repo) {
    this.repo = repo;
  }

  public Account findById(BigInteger id) {
    return repo.findById(id).orElseThrow();
  }

  public Alias findAliasById(BigInteger id) {
    return repo.findAliasById(id).orElseThrow();
  }

  public boolean existsByName(String name) {
    return repo.existsByName(name);
  }

  @Transactional
  public void register(Account account) {
    if (repo.existsByName(account.getName())) {
      throw new ResponseStatusException(
          UNPROCESSABLE_ENTITY, "Account Name: " + account.getName() + " has been registered!");
    } else {
      account.setPassword(passwordEncoder.encode(account.getPassword()));
      BigInteger id = repo.save(account).getId();
      if (!repo.existsByAdminTrueAndActiveTrue()) {
        repo.setActiveById(id, true);
      }
    }
  }

  @Transactional
  public void privilege(BigInteger id, Boolean admin) {
    if (repo.setAdminById(id, admin) == 0) {
      throw notFound("ID: " + id);
    }
  }

  @Transactional
  public void activate(BigInteger id, Boolean active) {
    if (repo.setActiveById(id, active) == 0) {
      throw notFound("ID: " + id);
    }
  }

  private static ResponseStatusException notFound(String log) {
    logger.error("Account {} is not found!", log);
    return new ResponseStatusException(NOT_FOUND, "Account is not found!");
  }
}
