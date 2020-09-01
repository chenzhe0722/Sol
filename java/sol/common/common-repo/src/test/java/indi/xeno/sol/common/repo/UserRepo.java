package indi.xeno.sol.common.repo;

import indi.xeno.sol.common.entity.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends NameActiveRepo<User> {}
