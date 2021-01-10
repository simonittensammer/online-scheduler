package at.htl.control;

import at.htl.entity.Appointment;
import at.htl.entity.Calendar;
import io.quarkus.hibernate.orm.panache.Panache;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.hibernate.Hibernate;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Transactional
@ApplicationScoped
public class CalendarRepository implements PanacheRepository<Calendar> {

    public void update(Calendar calendar){
        Panache.getEntityManager().merge(calendar);
    }

    public Calendar findByName(String name) {
        Calendar calendar = find("name", name).firstResult();

        if (calendar != null) {
            List<Appointment> appointments = calendar.getAppointments();

            Comparator<Appointment> compareByStartTime = (Appointment o1, Appointment o2) -> o1.getStart().compareTo(o2.getStart());
            Comparator<Appointment> compareByDate = (Appointment o1, Appointment o2) -> o1.getDate().compareTo(o2.getDate());

            Collections.sort(appointments, compareByStartTime);
            Collections.sort(appointments, compareByDate);

            calendar.setAppointments(appointments);

            Hibernate.initialize(calendar);
            Hibernate.initialize(calendar.getAppointments());
        }

        return calendar;
    }
}
