package at.htl.entity;

import javax.json.bind.annotation.JsonbDateFormat;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "APP_APPOINTMENT")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

//    @JsonbDateFormat("yyyy-MM-dd HH:mm:ss")
//    private LocalDateTime start;
//
//    @JsonbDateFormat("yyyy-MM-dd HH:mm:ss")
//    private LocalDateTime end;

    public Appointment() {
    }

    public Appointment(String title, String description/*, LocalDateTime start, LocalDateTime end*/) {
        this.title = title;
        this.description = description;
//        this.start = start;
//        this.end = end;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

//    public LocalDateTime getStart() {
//        return start;
//    }
//
//    public void setStart(LocalDateTime start) {
//        this.start = start;
//    }
//
//    public LocalDateTime getEnd() {
//        return end;
//    }
//
//    public void setEnd(LocalDateTime end) {
//        this.end = end;
//    }
}
