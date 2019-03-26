package pk.waqaskhawaja.cc.domain;



import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A BookingPrice.
 */
@Entity
@Table(name = "booking_price")
public class BookingPrice implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "booking_price")
    private Integer bookingPrice;

    @Column(name = "effective_date")
    private Instant effectiveDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getBookingPrice() {
        return bookingPrice;
    }

    public BookingPrice bookingPrice(Integer bookingPrice) {
        this.bookingPrice = bookingPrice;
        return this;
    }

    public void setBookingPrice(Integer bookingPrice) {
        this.bookingPrice = bookingPrice;
    }

    public Instant getEffectiveDate() {
        return effectiveDate;
    }

    public BookingPrice effectiveDate(Instant effectiveDate) {
        this.effectiveDate = effectiveDate;
        return this;
    }

    public void setEffectiveDate(Instant effectiveDate) {
        this.effectiveDate = effectiveDate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        BookingPrice bookingPrice = (BookingPrice) o;
        if (bookingPrice.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bookingPrice.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BookingPrice{" +
            "id=" + getId() +
            ", bookingPrice=" + getBookingPrice() +
            ", effectiveDate='" + getEffectiveDate() + "'" +
            "}";
    }
}
