package at.htl.entity;

import at.htl.dto.AppointmentDto;

import javax.json.bind.annotation.JsonbDateFormat;
import javax.json.bind.annotation.JsonbTransient;
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

    @ManyToOne
    @JsonbTransient
    private Calendar calendar;

    public Appointment() {
    }

    public Appointment(String title, String description, LocalDateTime date, LocalTime startTime, LocalTime endTime, Calendar calendar) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public Appointment(AppointmentDto appointmentDto) {
        update(appointmentDto);
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

    public Calendar getCalendar() {
        return calendar;
    }

    public void setCalendar(Calendar calendar) {
        this.calendar = calendar;
    }

    public void update(AppointmentDto appointmentDto) {
        this.title = appointmentDto.getTitle();
        this.description = appointmentDto.getDescription();
        this.date = appointmentDto.getDate();
        this.startTime = appointmentDto.getStartTime();
        this.endTime = appointmentDto.getEndTime();
    }
}
