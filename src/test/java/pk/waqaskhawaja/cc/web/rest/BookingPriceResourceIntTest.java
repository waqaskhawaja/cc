package pk.waqaskhawaja.cc.web.rest;

import pk.waqaskhawaja.cc.CcApp;

import pk.waqaskhawaja.cc.domain.BookingPrice;
import pk.waqaskhawaja.cc.repository.BookingPriceRepository;
import pk.waqaskhawaja.cc.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static pk.waqaskhawaja.cc.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BookingPriceResource REST controller.
 *
 * @see BookingPriceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CcApp.class)
public class BookingPriceResourceIntTest {

    private static final Integer DEFAULT_BOOKING_PRICE = 1;
    private static final Integer UPDATED_BOOKING_PRICE = 2;

    private static final Instant DEFAULT_EFFECTIVE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_EFFECTIVE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private BookingPriceRepository bookingPriceRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restBookingPriceMockMvc;

    private BookingPrice bookingPrice;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BookingPriceResource bookingPriceResource = new BookingPriceResource(bookingPriceRepository);
        this.restBookingPriceMockMvc = MockMvcBuilders.standaloneSetup(bookingPriceResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BookingPrice createEntity(EntityManager em) {
        BookingPrice bookingPrice = new BookingPrice()
            .bookingPrice(DEFAULT_BOOKING_PRICE)
            .effectiveDate(DEFAULT_EFFECTIVE_DATE);
        return bookingPrice;
    }

    @Before
    public void initTest() {
        bookingPrice = createEntity(em);
    }

    @Test
    @Transactional
    public void createBookingPrice() throws Exception {
        int databaseSizeBeforeCreate = bookingPriceRepository.findAll().size();

        // Create the BookingPrice
        restBookingPriceMockMvc.perform(post("/api/booking-prices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bookingPrice)))
            .andExpect(status().isCreated());

        // Validate the BookingPrice in the database
        List<BookingPrice> bookingPriceList = bookingPriceRepository.findAll();
        assertThat(bookingPriceList).hasSize(databaseSizeBeforeCreate + 1);
        BookingPrice testBookingPrice = bookingPriceList.get(bookingPriceList.size() - 1);
        assertThat(testBookingPrice.getBookingPrice()).isEqualTo(DEFAULT_BOOKING_PRICE);
        assertThat(testBookingPrice.getEffectiveDate()).isEqualTo(DEFAULT_EFFECTIVE_DATE);
    }

    @Test
    @Transactional
    public void createBookingPriceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bookingPriceRepository.findAll().size();

        // Create the BookingPrice with an existing ID
        bookingPrice.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBookingPriceMockMvc.perform(post("/api/booking-prices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bookingPrice)))
            .andExpect(status().isBadRequest());

        // Validate the BookingPrice in the database
        List<BookingPrice> bookingPriceList = bookingPriceRepository.findAll();
        assertThat(bookingPriceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBookingPrices() throws Exception {
        // Initialize the database
        bookingPriceRepository.saveAndFlush(bookingPrice);

        // Get all the bookingPriceList
        restBookingPriceMockMvc.perform(get("/api/booking-prices?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bookingPrice.getId().intValue())))
            .andExpect(jsonPath("$.[*].bookingPrice").value(hasItem(DEFAULT_BOOKING_PRICE)))
            .andExpect(jsonPath("$.[*].effectiveDate").value(hasItem(DEFAULT_EFFECTIVE_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getBookingPrice() throws Exception {
        // Initialize the database
        bookingPriceRepository.saveAndFlush(bookingPrice);

        // Get the bookingPrice
        restBookingPriceMockMvc.perform(get("/api/booking-prices/{id}", bookingPrice.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bookingPrice.getId().intValue()))
            .andExpect(jsonPath("$.bookingPrice").value(DEFAULT_BOOKING_PRICE))
            .andExpect(jsonPath("$.effectiveDate").value(DEFAULT_EFFECTIVE_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBookingPrice() throws Exception {
        // Get the bookingPrice
        restBookingPriceMockMvc.perform(get("/api/booking-prices/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBookingPrice() throws Exception {
        // Initialize the database
        bookingPriceRepository.saveAndFlush(bookingPrice);

        int databaseSizeBeforeUpdate = bookingPriceRepository.findAll().size();

        // Update the bookingPrice
        BookingPrice updatedBookingPrice = bookingPriceRepository.findById(bookingPrice.getId()).get();
        // Disconnect from session so that the updates on updatedBookingPrice are not directly saved in db
        em.detach(updatedBookingPrice);
        updatedBookingPrice
            .bookingPrice(UPDATED_BOOKING_PRICE)
            .effectiveDate(UPDATED_EFFECTIVE_DATE);

        restBookingPriceMockMvc.perform(put("/api/booking-prices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBookingPrice)))
            .andExpect(status().isOk());

        // Validate the BookingPrice in the database
        List<BookingPrice> bookingPriceList = bookingPriceRepository.findAll();
        assertThat(bookingPriceList).hasSize(databaseSizeBeforeUpdate);
        BookingPrice testBookingPrice = bookingPriceList.get(bookingPriceList.size() - 1);
        assertThat(testBookingPrice.getBookingPrice()).isEqualTo(UPDATED_BOOKING_PRICE);
        assertThat(testBookingPrice.getEffectiveDate()).isEqualTo(UPDATED_EFFECTIVE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingBookingPrice() throws Exception {
        int databaseSizeBeforeUpdate = bookingPriceRepository.findAll().size();

        // Create the BookingPrice

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBookingPriceMockMvc.perform(put("/api/booking-prices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bookingPrice)))
            .andExpect(status().isBadRequest());

        // Validate the BookingPrice in the database
        List<BookingPrice> bookingPriceList = bookingPriceRepository.findAll();
        assertThat(bookingPriceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBookingPrice() throws Exception {
        // Initialize the database
        bookingPriceRepository.saveAndFlush(bookingPrice);

        int databaseSizeBeforeDelete = bookingPriceRepository.findAll().size();

        // Delete the bookingPrice
        restBookingPriceMockMvc.perform(delete("/api/booking-prices/{id}", bookingPrice.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BookingPrice> bookingPriceList = bookingPriceRepository.findAll();
        assertThat(bookingPriceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BookingPrice.class);
        BookingPrice bookingPrice1 = new BookingPrice();
        bookingPrice1.setId(1L);
        BookingPrice bookingPrice2 = new BookingPrice();
        bookingPrice2.setId(bookingPrice1.getId());
        assertThat(bookingPrice1).isEqualTo(bookingPrice2);
        bookingPrice2.setId(2L);
        assertThat(bookingPrice1).isNotEqualTo(bookingPrice2);
        bookingPrice1.setId(null);
        assertThat(bookingPrice1).isNotEqualTo(bookingPrice2);
    }
}
