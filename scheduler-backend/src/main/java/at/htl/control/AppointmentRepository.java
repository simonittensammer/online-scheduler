package at.htl.control;

import at.htl.entity.Appointment;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@Transactional
@ApplicationScoped
public class AppointmentRepository implements PanacheRepository<Appointment> {
}
