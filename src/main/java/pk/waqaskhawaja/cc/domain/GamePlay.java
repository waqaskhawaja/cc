package pk.waqaskhawaja.cc.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A GamePlay.
 */
@Entity
@Table(name = "game_play")
public class GamePlay implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "game_play_slot")
    private Instant gamePlaySlot;

    @ManyToOne
    @JsonIgnoreProperties("gamePlays")
    private Court court;

    @ManyToMany
    @JoinTable(name = "game_play_played",
               joinColumns = @JoinColumn(name = "game_play_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "played_id", referencedColumnName = "id"))
    private Set<User> playeds = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "game_play_booked",
               joinColumns = @JoinColumn(name = "game_play_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "booked_id", referencedColumnName = "id"))
    private Set<User> bookeds = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getGamePlaySlot() {
        return gamePlaySlot;
    }

    public GamePlay gamePlaySlot(Instant gamePlaySlot) {
        this.gamePlaySlot = gamePlaySlot;
        return this;
    }

    public void setGamePlaySlot(Instant gamePlaySlot) {
        this.gamePlaySlot = gamePlaySlot;
    }

    public Court getCourt() {
        return court;
    }

    public GamePlay court(Court court) {
        this.court = court;
        return this;
    }

    public void setCourt(Court court) {
        this.court = court;
    }

    public Set<User> getPlayeds() {
        return playeds;
    }

    public GamePlay playeds(Set<User> users) {
        this.playeds = users;
        return this;
    }

    public GamePlay addPlayed(User user) {
        this.playeds.add(user);
        return this;
    }

    public GamePlay removePlayed(User user) {
        this.playeds.remove(user);
        return this;
    }

    public void setPlayeds(Set<User> users) {
        this.playeds = users;
    }

    public Set<User> getBookeds() {
        return bookeds;
    }

    public GamePlay bookeds(Set<User> users) {
        this.bookeds = users;
        return this;
    }

    public GamePlay addBooked(User user) {
        this.bookeds.add(user);
        return this;
    }

    public GamePlay removeBooked(User user) {
        this.bookeds.remove(user);
        return this;
    }

    public void setBookeds(Set<User> users) {
        this.bookeds = users;
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
        GamePlay gamePlay = (GamePlay) o;
        if (gamePlay.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gamePlay.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GamePlay{" +
            "id=" + getId() +
            ", gamePlaySlot='" + getGamePlaySlot() + "'" +
            "}";
    }
}
