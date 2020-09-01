package indi.xeno.sol.common.repo;

import indi.xeno.sol.common.entity.ActiveEntity;
import indi.xeno.sol.common.entity.IdEntity;
import indi.xeno.sol.common.entity.NameEntity;
import indi.xeno.sol.common.projection.IdName;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;
import java.util.Optional;

@NoRepositoryBean
public interface NameActiveRepo<T extends IdEntity & NameEntity & ActiveEntity>
    extends NameRepo<T>, ActiveRepo<T> {

  boolean existsByNameAndActiveTrue(String name);

  Optional<T> findOneByNameAndActiveTrue(String name);

  Optional<IdName> findOneByNameIsAndActiveTrue(String name);

  List<T> findByNameAndActiveTrue(String name);

  List<IdName> findByNameIsAndActiveTrue(String name);

  Page<T> findByNameAndActiveTrue(String name, Pageable pageable);

  Page<IdName> findByNameIsAndActiveTrue(String name, Pageable pageable);
}
