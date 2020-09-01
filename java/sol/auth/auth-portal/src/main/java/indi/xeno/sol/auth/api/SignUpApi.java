package indi.xeno.sol.auth.api;

import indi.xeno.sol.auth.entity.Account;
import indi.xeno.sol.auth.service.AccountService;
import indi.xeno.sol.common.view.ExistsView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/sign-up")
public class SignUpApi {

  private final AccountService service;

  public SignUpApi(@Autowired AccountService service) {
    this.service = service;
  }

  @GetMapping("/check")
  public ResponseEntity<ExistsView> check(@RequestParam String name) {
    return ok(new ExistsView(service.existsByName(name)));
  }

  @PostMapping("/register")
  public ResponseEntity<Void> register(@RequestBody Account account) {
    service.register(account);
    return ok().build();
  }
}
