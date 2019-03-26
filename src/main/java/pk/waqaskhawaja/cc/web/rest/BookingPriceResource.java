package pk.waqaskhawaja.cc.web.rest;
import pk.waqaskhawaja.cc.domain.BookingPrice;
import pk.waqaskhawaja.cc.repository.BookingPriceRepository;
import pk.waqaskhawaja.cc.web.rest.errors.BadRequestAlertException;
import pk.waqaskhawaja.cc.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing BookingPrice.
 */
@RestController
@RequestMapping("/api")
public class BookingPriceResource {

    private final Logger log = LoggerFactory.getLogger(BookingPriceResource.class);

    private static final String ENTITY_NAME = "bookingPrice";

    private final BookingPriceRepository bookingPriceRepository;

    public BookingPriceResource(BookingPriceRepository bookingPriceRepository) {
        this.bookingPriceRepository = bookingPriceRepository;
    }

    /**
     * POST  /booking-prices : Create a new bookingPrice.
     *
     * @param bookingPrice the bookingPrice to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bookingPrice, or with status 400 (Bad Request) if the bookingPrice has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/booking-prices")
    public ResponseEntity<BookingPrice> createBookingPrice(@RequestBody BookingPrice bookingPrice) throws URISyntaxException {
        log.debug("REST request to save BookingPrice : {}", bookingPrice);
        if (bookingPrice.getId() != null) {
            throw new BadRequestAlertException("A new bookingPrice cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BookingPrice result = bookingPriceRepository.save(bookingPrice);
        return ResponseEntity.created(new URI("/api/booking-prices/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /booking-prices : Updates an existing bookingPrice.
     *
     * @param bookingPrice the bookingPrice to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bookingPrice,
     * or with status 400 (Bad Request) if the bookingPrice is not valid,
     * or with status 500 (Internal Server Error) if the bookingPrice couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/booking-prices")
    public ResponseEntity<BookingPrice> updateBookingPrice(@RequestBody BookingPrice bookingPrice) throws URISyntaxException {
        log.debug("REST request to update BookingPrice : {}", bookingPrice);
        if (bookingPrice.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BookingPrice result = bookingPriceRepository.save(bookingPrice);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bookingPrice.getId().toString()))
            .body(result);
    }

    /**
     * GET  /booking-prices : get all the bookingPrices.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of bookingPrices in body
     */
    @GetMapping("/booking-prices")
    public List<BookingPrice> getAllBookingPrices() {
        log.debug("REST request to get all BookingPrices");
        return bookingPriceRepository.findAll();
    }

    /**
     * GET  /booking-prices/:id : get the "id" bookingPrice.
     *
     * @param id the id of the bookingPrice to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bookingPrice, or with status 404 (Not Found)
     */
    @GetMapping("/booking-prices/{id}")
    public ResponseEntity<BookingPrice> getBookingPrice(@PathVariable Long id) {
        log.debug("REST request to get BookingPrice : {}", id);
        Optional<BookingPrice> bookingPrice = bookingPriceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bookingPrice);
    }

    /**
     * DELETE  /booking-prices/:id : delete the "id" bookingPrice.
     *
     * @param id the id of the bookingPrice to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/booking-prices/{id}")
    public ResponseEntity<Void> deleteBookingPrice(@PathVariable Long id) {
        log.debug("REST request to delete BookingPrice : {}", id);
        bookingPriceRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
