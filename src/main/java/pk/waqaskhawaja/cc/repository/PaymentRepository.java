package pk.waqaskhawaja.cc.repository;

import pk.waqaskhawaja.cc.domain.Payment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Payment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    @Query("select payment from Payment payment where payment.sender.login = ?#{principal.username}")
    List<Payment> findBySenderIsCurrentUser();

    @Query("select payment from Payment payment where payment.recipient.login = ?#{principal.username}")
    List<Payment> findByRecipientIsCurrentUser();

}
