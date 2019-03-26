package pk.waqaskhawaja.cc.repository;

import pk.waqaskhawaja.cc.domain.BookingPrice;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the BookingPrice entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BookingPriceRepository extends JpaRepository<BookingPrice, Long> {

}
