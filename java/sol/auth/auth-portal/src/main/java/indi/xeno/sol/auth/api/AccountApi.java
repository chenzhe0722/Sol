package indi.xeno.sol.auth.api;

import indi.xeno.sol.auth.projection.Alias;
import indi.xeno.sol.auth.security.AccountDetails;
import indi.xeno.sol.auth.service.AccountService;
import indi.xeno.sol.common.view.IdView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/account")
public class AccountApi {

  private final AccountService service;

  public AccountApi(@Autowired AccountService service) {
    this.service = service;
  }

  @GetMapping("/current-id")
  public ResponseEntity<IdView> currentId(@AuthenticationPrincipal AccountDetails details) {
    return ok(new IdView(details.getId()));
  }

  @GetMapping("/current-alias")
  public ResponseEntity<Alias> currentAlias(@AuthenticationPrincipal AccountDetails details) {
    return ok(service.findAliasById(details.getId()));
  }
}
