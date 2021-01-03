package at.htl.control;

import at.htl.entity.Appointment;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

public class AppointmentRepository implements PanacheRepository<Appointment> {
}
