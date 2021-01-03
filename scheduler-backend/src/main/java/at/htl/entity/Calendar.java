package at.htl.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Id;

public class Calendar extends PanacheEntity {

    @Id
    String name;

    String desc;

    String pw;
}
