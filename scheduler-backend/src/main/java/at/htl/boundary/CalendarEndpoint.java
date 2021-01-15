package at.htl.boundary;

import at.htl.control.AppointmentRepository;
import at.htl.control.CalendarRepository;
import at.htl.entity.Appointment;
import at.htl.entity.Calendar;
import org.hibernate.Hibernate;

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
import java.util.stream.Collectors;

@Path("/calendar")
@ApplicationScoped
@Transactional
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CalendarEndpoint {

    @Inject
    CalendarRepository cr;

    @Inject
    AppointmentRepository ar;

    @GET
    public List<Calendar> getAll() {
        return cr.streamAll().peek(o -> {
            Hibernate.initialize(o.getAppointments());
        }).collect(Collectors.toList());
    }

    @GET
    @Path("/{name}")
    public Calendar getCalendar(@PathParam("name") String name) {
        return cr.findByName(name);
    }

    @POST
    public Response addCalendar(Calendar calendar) {
        if (cr.findByName(calendar.getName()) != null) {
            return Response.status(409).entity("Calendar already exists").build();
        }

        cr.persist(calendar);
        return Response.ok(calendar).build();
    }

    @POST
    @Path("/{name}/addAppointment")
    public Response addAppointment(@PathParam("name") String name, JsonObject jsonObject) {
        Appointment appointment = new Appointment(
                jsonObject.getString("title"),
                jsonObject.getString("description"),
                LocalDate.parse(jsonObject.getString("date")),
                LocalTime.parse(jsonObject.getString("startTime")),
                LocalTime.parse(jsonObject.getString("endTime"))
        );

        ar.persist(appointment);

        Calendar calendar = cr.findByName(name);
        List<Appointment> appointments = calendar.getAppointments();
        appointments.add(appointment);
        calendar.setAppointments(appointments);

        cr.update(calendar);

        return Response.ok(appointment).build();
    }

    @PUT
    public Response putCalendar(Calendar calendar) {
        cr.update(calendar);
        return Response.ok(calendar).build();
    }
}
