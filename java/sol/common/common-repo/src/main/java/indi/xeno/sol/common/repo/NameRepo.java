package indi.xeno.sol.common.repo;

import indi.xeno.sol.common.entity.IdEntity;
import indi.xeno.sol.common.entity.NameEntity;
import indi.xeno.sol.common.projection.IdName;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@NoRepositoryBean
public interface NameRepo<T extends IdEntity & NameEntity> extends JpaRepository<T, BigInteger> {

  boolean existsByName(String name);

  Optional<T> findOneByName(String name);

  Optional<IdName> findOneByNameIs(String name);

  List<T> findByName(String name);

  List<IdName> findByNameIs(String name);

  Page<T> findByName(String name, Pageable pageable);

  Page<IdName> findByNameIs(String name, Pageable pageable);
}
