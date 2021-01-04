package at.htl.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class Calendar extends PanacheEntityBase {

    @Id
    String name;

    String desc;

    String pw;

    @OneToMany
    List<Appointment> appointments;
}
