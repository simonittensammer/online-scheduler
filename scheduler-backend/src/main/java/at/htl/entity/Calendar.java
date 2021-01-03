package at.htl.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Id;
import java.util.List;

public class Calendar extends PanacheEntity {

    @Id
    String name;

    String desc;

    String pw;

    List<Appointment> appointments;

    public Calendar() {
    }

    public Calendar(String name, String desc, String pw) {
        this.name = name;
        this.desc = desc;
        this.pw = pw;
    }
}
