package at.htl.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class Appointment extends PanacheEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String title;

    String desc;

    LocalDateTime start;

    LocalDateTime end;

    public Appointment() {
    }

    public Appointment(String title, String desc, LocalDateTime start, LocalDateTime end) {
        this.title = title;
        this.desc = desc;
        this.start = start;
        this.end = end;
    }
}
