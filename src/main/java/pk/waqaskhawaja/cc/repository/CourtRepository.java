package pk.waqaskhawaja.cc.repository;

import pk.waqaskhawaja.cc.domain.Court;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Court entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CourtRepository extends JpaRepository<Court, Long> {

}
