package at.htl.boundary;

import at.htl.control.AppointmentRepository;
import at.htl.control.CalendarRepository;
import at.htl.entity.Appointment;
import at.htl.entity.Calendar;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.json.JsonObject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Path("/appointment")
@ApplicationScoped
@Transactional
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AppointmentEndpoint {

    @Inject
    AppointmentRepository ar;

    @Inject
    CalendarRepository cr;

    @GET
    public List<Appointment> getAll() {
        return ar.listAll();
    }

    @GET
    @Path("/{id}")
    public Appointment getAppointment(@PathParam("id") Long id) {
        return ar.findById(id);
    }

    @PUT
    public Response putAppointment(Appointment appointment) {
        ar.update(appointment);
        return Response.ok(appointment).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteAppointment(@PathParam("id") Long id, JsonObject jsonObject) {
        Appointment appointment = ar.findById(id);

        Calendar calendar = cr.findByName(jsonObject.getString("calendarName"));
        List<Appointment> appointments = calendar.getAppointments();
        appointments.remove(appointment);
        calendar.setAppointments(appointments);

        ar.delete(appointment);
        return Response.ok(appointment).build();
    }
}
