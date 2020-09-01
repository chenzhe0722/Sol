package indi.xeno.sol.auth.api;

import indi.xeno.sol.auth.security.AccountDetails;
import indi.xeno.sol.common.view.ExistsView;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import static java.util.Objects.nonNull;
import static org.springframework.http.ResponseEntity.ok;

@RestController
public class LoginApi {

  @GetMapping("/login")
  public ResponseEntity<ExistsView> login(@AuthenticationPrincipal AccountDetails details) {
    return ok(new ExistsView(nonNull(details)));
  }
}
