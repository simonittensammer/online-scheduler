package at.htl.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Entity
@Table(name = "APP_CALENDAR")
public class Calendar {

    @Id
    private String name;

    private String description;

    private String pw;

    @OneToMany
    List<Appointment> appointments;

    public Calendar() {
    }

    public Calendar(String name, String description, String pw) {
        this.name = name;
        this.description = description;
        this.pw = pw;
        this.appointments = new ArrayList<>();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPw() {
        return pw;
    }

    public void setPw(String pw) {
        this.pw = pw;
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }
}
