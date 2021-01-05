package at.htl.entity;

import javax.persistence.*;
import java.util.List;

@Entity
public class Calendar {

    @Id
    private String name;

    private String desc;

    private String pw;

    @OneToMany
    List<Appointment> appointments;

    public Calendar() {
    }

    public Calendar(String name, String desc, String pw, List<Appointment> appointments) {
        this.name = name;
        this.desc = desc;
        this.pw = pw;
        this.appointments = appointments;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
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
