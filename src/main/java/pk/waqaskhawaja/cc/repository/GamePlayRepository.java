package pk.waqaskhawaja.cc.repository;

import pk.waqaskhawaja.cc.domain.GamePlay;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the GamePlay entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GamePlayRepository extends JpaRepository<GamePlay, Long> {

    @Query(value = "select distinct game_play from GamePlay game_play left join fetch game_play.playeds left join fetch game_play.bookeds",
        countQuery = "select count(distinct game_play) from GamePlay game_play")
    Page<GamePlay> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct game_play from GamePlay game_play left join fetch game_play.playeds left join fetch game_play.bookeds")
    List<GamePlay> findAllWithEagerRelationships();

    @Query("select game_play from GamePlay game_play left join fetch game_play.playeds left join fetch game_play.bookeds where game_play.id =:id")
    Optional<GamePlay> findOneWithEagerRelationships(@Param("id") Long id);

}
