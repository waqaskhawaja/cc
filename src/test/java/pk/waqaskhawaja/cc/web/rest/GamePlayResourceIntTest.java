package pk.waqaskhawaja.cc.web.rest;

import pk.waqaskhawaja.cc.CcApp;

import pk.waqaskhawaja.cc.domain.GamePlay;
import pk.waqaskhawaja.cc.repository.GamePlayRepository;
import pk.waqaskhawaja.cc.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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
import java.util.ArrayList;
import java.util.List;


import static pk.waqaskhawaja.cc.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the GamePlayResource REST controller.
 *
 * @see GamePlayResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CcApp.class)
public class GamePlayResourceIntTest {

    private static final Instant DEFAULT_GAME_PLAY_SLOT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_GAME_PLAY_SLOT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private GamePlayRepository gamePlayRepository;

    @Mock
    private GamePlayRepository gamePlayRepositoryMock;

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

    private MockMvc restGamePlayMockMvc;

    private GamePlay gamePlay;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GamePlayResource gamePlayResource = new GamePlayResource(gamePlayRepository);
        this.restGamePlayMockMvc = MockMvcBuilders.standaloneSetup(gamePlayResource)
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
    public static GamePlay createEntity(EntityManager em) {
        GamePlay gamePlay = new GamePlay()
            .gamePlaySlot(DEFAULT_GAME_PLAY_SLOT);
        return gamePlay;
    }

    @Before
    public void initTest() {
        gamePlay = createEntity(em);
    }

    @Test
    @Transactional
    public void createGamePlay() throws Exception {
        int databaseSizeBeforeCreate = gamePlayRepository.findAll().size();

        // Create the GamePlay
        restGamePlayMockMvc.perform(post("/api/game-plays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gamePlay)))
            .andExpect(status().isCreated());

        // Validate the GamePlay in the database
        List<GamePlay> gamePlayList = gamePlayRepository.findAll();
        assertThat(gamePlayList).hasSize(databaseSizeBeforeCreate + 1);
        GamePlay testGamePlay = gamePlayList.get(gamePlayList.size() - 1);
        assertThat(testGamePlay.getGamePlaySlot()).isEqualTo(DEFAULT_GAME_PLAY_SLOT);
    }

    @Test
    @Transactional
    public void createGamePlayWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gamePlayRepository.findAll().size();

        // Create the GamePlay with an existing ID
        gamePlay.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGamePlayMockMvc.perform(post("/api/game-plays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gamePlay)))
            .andExpect(status().isBadRequest());

        // Validate the GamePlay in the database
        List<GamePlay> gamePlayList = gamePlayRepository.findAll();
        assertThat(gamePlayList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGamePlays() throws Exception {
        // Initialize the database
        gamePlayRepository.saveAndFlush(gamePlay);

        // Get all the gamePlayList
        restGamePlayMockMvc.perform(get("/api/game-plays?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gamePlay.getId().intValue())))
            .andExpect(jsonPath("$.[*].gamePlaySlot").value(hasItem(DEFAULT_GAME_PLAY_SLOT.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllGamePlaysWithEagerRelationshipsIsEnabled() throws Exception {
        GamePlayResource gamePlayResource = new GamePlayResource(gamePlayRepositoryMock);
        when(gamePlayRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restGamePlayMockMvc = MockMvcBuilders.standaloneSetup(gamePlayResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restGamePlayMockMvc.perform(get("/api/game-plays?eagerload=true"))
        .andExpect(status().isOk());

        verify(gamePlayRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllGamePlaysWithEagerRelationshipsIsNotEnabled() throws Exception {
        GamePlayResource gamePlayResource = new GamePlayResource(gamePlayRepositoryMock);
            when(gamePlayRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restGamePlayMockMvc = MockMvcBuilders.standaloneSetup(gamePlayResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restGamePlayMockMvc.perform(get("/api/game-plays?eagerload=true"))
        .andExpect(status().isOk());

            verify(gamePlayRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getGamePlay() throws Exception {
        // Initialize the database
        gamePlayRepository.saveAndFlush(gamePlay);

        // Get the gamePlay
        restGamePlayMockMvc.perform(get("/api/game-plays/{id}", gamePlay.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gamePlay.getId().intValue()))
            .andExpect(jsonPath("$.gamePlaySlot").value(DEFAULT_GAME_PLAY_SLOT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGamePlay() throws Exception {
        // Get the gamePlay
        restGamePlayMockMvc.perform(get("/api/game-plays/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGamePlay() throws Exception {
        // Initialize the database
        gamePlayRepository.saveAndFlush(gamePlay);

        int databaseSizeBeforeUpdate = gamePlayRepository.findAll().size();

        // Update the gamePlay
        GamePlay updatedGamePlay = gamePlayRepository.findById(gamePlay.getId()).get();
        // Disconnect from session so that the updates on updatedGamePlay are not directly saved in db
        em.detach(updatedGamePlay);
        updatedGamePlay
            .gamePlaySlot(UPDATED_GAME_PLAY_SLOT);

        restGamePlayMockMvc.perform(put("/api/game-plays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGamePlay)))
            .andExpect(status().isOk());

        // Validate the GamePlay in the database
        List<GamePlay> gamePlayList = gamePlayRepository.findAll();
        assertThat(gamePlayList).hasSize(databaseSizeBeforeUpdate);
        GamePlay testGamePlay = gamePlayList.get(gamePlayList.size() - 1);
        assertThat(testGamePlay.getGamePlaySlot()).isEqualTo(UPDATED_GAME_PLAY_SLOT);
    }

    @Test
    @Transactional
    public void updateNonExistingGamePlay() throws Exception {
        int databaseSizeBeforeUpdate = gamePlayRepository.findAll().size();

        // Create the GamePlay

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGamePlayMockMvc.perform(put("/api/game-plays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gamePlay)))
            .andExpect(status().isBadRequest());

        // Validate the GamePlay in the database
        List<GamePlay> gamePlayList = gamePlayRepository.findAll();
        assertThat(gamePlayList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGamePlay() throws Exception {
        // Initialize the database
        gamePlayRepository.saveAndFlush(gamePlay);

        int databaseSizeBeforeDelete = gamePlayRepository.findAll().size();

        // Delete the gamePlay
        restGamePlayMockMvc.perform(delete("/api/game-plays/{id}", gamePlay.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GamePlay> gamePlayList = gamePlayRepository.findAll();
        assertThat(gamePlayList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GamePlay.class);
        GamePlay gamePlay1 = new GamePlay();
        gamePlay1.setId(1L);
        GamePlay gamePlay2 = new GamePlay();
        gamePlay2.setId(gamePlay1.getId());
        assertThat(gamePlay1).isEqualTo(gamePlay2);
        gamePlay2.setId(2L);
        assertThat(gamePlay1).isNotEqualTo(gamePlay2);
        gamePlay1.setId(null);
        assertThat(gamePlay1).isNotEqualTo(gamePlay2);
    }
}
