package indi.xeno.sol.common.repo;

import indi.xeno.sol.common.entity.ActiveEntity;
import indi.xeno.sol.common.entity.IdEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.query.Param;

import java.math.BigInteger;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@NoRepositoryBean
public interface ActiveRepo<T extends IdEntity & ActiveEntity>
    extends JpaRepository<T, BigInteger> {

  boolean existsByIdAndActiveTrue(BigInteger id);

  Optional<T> findByIdAndActiveTrue(BigInteger id);

  List<T> findByIdInAndActiveTrue(Collection<BigInteger> ids);

  List<T> findByActiveTrue();

  Page<T> findByActiveTrue(Pageable pageable);

  @Modifying
  @Query("UPDATE #{#entityName} e SET e.active = :active WHERE e.id = :id AND e.active <> :active")
  int setActiveById(@Param("id") BigInteger id, @Param("active") Boolean active);

  @Modifying
  @Query(
      "UPDATE #{#entityName} e SET e.active = :active WHERE e.id IN :ids AND e.active <> :active")
  int setActiveByIdIn(@Param("ids") Collection<BigInteger> ids, @Param("active") Boolean active);
}
