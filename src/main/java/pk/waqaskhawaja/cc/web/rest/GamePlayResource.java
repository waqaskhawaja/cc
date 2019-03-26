package pk.waqaskhawaja.cc.web.rest;
import pk.waqaskhawaja.cc.domain.GamePlay;
import pk.waqaskhawaja.cc.repository.GamePlayRepository;
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
 * REST controller for managing GamePlay.
 */
@RestController
@RequestMapping("/api")
public class GamePlayResource {

    private final Logger log = LoggerFactory.getLogger(GamePlayResource.class);

    private static final String ENTITY_NAME = "gamePlay";

    private final GamePlayRepository gamePlayRepository;

    public GamePlayResource(GamePlayRepository gamePlayRepository) {
        this.gamePlayRepository = gamePlayRepository;
    }

    /**
     * POST  /game-plays : Create a new gamePlay.
     *
     * @param gamePlay the gamePlay to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gamePlay, or with status 400 (Bad Request) if the gamePlay has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/game-plays")
    public ResponseEntity<GamePlay> createGamePlay(@RequestBody GamePlay gamePlay) throws URISyntaxException {
        log.debug("REST request to save GamePlay : {}", gamePlay);
        if (gamePlay.getId() != null) {
            throw new BadRequestAlertException("A new gamePlay cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GamePlay result = gamePlayRepository.save(gamePlay);
        return ResponseEntity.created(new URI("/api/game-plays/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /game-plays : Updates an existing gamePlay.
     *
     * @param gamePlay the gamePlay to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gamePlay,
     * or with status 400 (Bad Request) if the gamePlay is not valid,
     * or with status 500 (Internal Server Error) if the gamePlay couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/game-plays")
    public ResponseEntity<GamePlay> updateGamePlay(@RequestBody GamePlay gamePlay) throws URISyntaxException {
        log.debug("REST request to update GamePlay : {}", gamePlay);
        if (gamePlay.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GamePlay result = gamePlayRepository.save(gamePlay);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gamePlay.getId().toString()))
            .body(result);
    }

    /**
     * GET  /game-plays : get all the gamePlays.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of gamePlays in body
     */
    @GetMapping("/game-plays")
    public List<GamePlay> getAllGamePlays(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all GamePlays");
        return gamePlayRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /game-plays/:id : get the "id" gamePlay.
     *
     * @param id the id of the gamePlay to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gamePlay, or with status 404 (Not Found)
     */
    @GetMapping("/game-plays/{id}")
    public ResponseEntity<GamePlay> getGamePlay(@PathVariable Long id) {
        log.debug("REST request to get GamePlay : {}", id);
        Optional<GamePlay> gamePlay = gamePlayRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(gamePlay);
    }

    /**
     * DELETE  /game-plays/:id : delete the "id" gamePlay.
     *
     * @param id the id of the gamePlay to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/game-plays/{id}")
    public ResponseEntity<Void> deleteGamePlay(@PathVariable Long id) {
        log.debug("REST request to delete GamePlay : {}", id);
        gamePlayRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
