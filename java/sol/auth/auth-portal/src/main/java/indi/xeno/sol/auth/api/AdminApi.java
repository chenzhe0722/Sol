package indi.xeno.sol.auth.api;

import indi.xeno.sol.auth.service.AccountService;
import indi.xeno.sol.auth.view.ActiveView;
import indi.xeno.sol.auth.view.AdminView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/admin")
public class AdminApi {

  private final AccountService service;

  public AdminApi(@Autowired AccountService service) {
    this.service = service;
  }

  @PutMapping("/privilege")
  public ResponseEntity<Void> privilege(@RequestBody AdminView request) {
    service.privilege(request.getId(), request.getAdmin());
    return ok().build();
  }

  @PutMapping("/activate")
  public ResponseEntity<Void> activate(@RequestBody ActiveView request) {
    service.activate(request.getId(), request.getActive());
    return ok().build();
  }
}
