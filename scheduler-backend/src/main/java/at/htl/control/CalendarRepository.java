package at.htl.control;

import at.htl.entity.Calendar;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.hibernate.Hibernate;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@Transactional
@ApplicationScoped
public class CalendarRepository implements PanacheRepository<Calendar> {

    public Calendar findByName(String name) {
        Calendar calendar = find("name", name).firstResult();

        if (calendar != null) {
            Hibernate.initialize(calendar);
            Hibernate.initialize(calendar.getAppointments());
        }

        return calendar;
    }
}
