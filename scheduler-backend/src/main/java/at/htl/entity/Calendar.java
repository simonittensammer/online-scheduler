package at.htl.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class Calendar extends PanacheEntity {

    @Id
    String name;

    String desc;

    String pw;

    @OneToMany
    List<Appointment> appointments;

    public Calendar() {
    }

    public Calendar(String name, String desc, String pw) {
        this.name = name;
        this.desc = desc;
        this.pw = pw;
    }
}
