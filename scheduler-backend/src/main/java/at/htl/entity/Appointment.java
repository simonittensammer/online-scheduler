package at.htl.entity;

import javax.json.bind.annotation.JsonbDateFormat;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "APP_APPOINTMENT")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private LocalDateTime date;

    private LocalTime startTime;

    private LocalTime endTime;

    public Appointment() {
    }

    public Appointment(String title, String description, LocalDateTime date, LocalTime startTime, LocalTime endTime) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
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

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public LocalTime getStart() {
        return startTime;
    }

    public void setStart(LocalTime start) {
        this.startTime = start;
    }

    public LocalTime getEnd() {
        return endTime;
    }

    public void setEnd(LocalTime end) {
        this.endTime = end;
    }
}
