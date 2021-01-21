package at.htl.boundary;

import at.htl.control.AppointmentRepository;
import at.htl.control.CalendarRepository;
import at.htl.dto.AppointmentDto;
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
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
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
        Calendar calendar = cr.findByName(name);
        Hibernate.initialize(calendar.getAppointments());
        System.out.println(calendar.getAppointments());
        return calendar;
    }

    @POST
    public Response addCalendar(Calendar calendar) {
        if (cr.findByName(calendar.getName()) != null) {
            return Response.status(409).entity("Calendar already exists").build();
        }

        cr.persist(calendar);
        return Response.ok(calendar).build();
    }

//    @POST
//    @Path("/{name}/addAppointment")
//    public Response addAppointment(@PathParam("name") String name, JsonObject jsonObject) {
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.ENGLISH);
//
//        Appointment appointment = new Appointment(
//                jsonObject.getString("title"),
//                jsonObject.getString("description"),
//                LocalDateTime.parse(jsonObject.getString("date"), formatter).plusDays(1),
//                LocalTime.parse(jsonObject.getString("startTime")),
//                LocalTime.parse(jsonObject.getString("endTime"))
//        );
//
//        ar.persist(appointment);
//
//        Calendar calendar = cr.findByName(name);
//        List<Appointment> appointments = calendar.getAppointments();
//        appointments.add(appointment);
//        calendar.setAppointments(appointments);
//
//        cr.update(calendar);
//
//        return Response.ok(appointment).build();
//    }

    @POST
    @Path("/{name}/addAppointment")
    public Response addAppointment(@PathParam("name") String name, AppointmentDto appointmentDto) {
        Appointment appointment = new Appointment(appointmentDto);

        ar.persist(appointment);

        Calendar calendar = cr.findByName(name);
        calendar.addAppointment(appointment);
        appointment.setCalendar(calendar);

        return Response.ok(appointment).build();
    }

    @PUT
    @Path("/{name}/appointment/{id}")
    public Response updateAppointment(@PathParam("name") String name, @PathParam("id") Long id, AppointmentDto appointmentDto) {
        Appointment appointment = ar.findById(id);

        appointment.update(appointmentDto);

        return Response.noContent().build();
    }

    @PUT
    public Response putCalendar(Calendar calendar) {
        cr.update(calendar);
        return Response.ok(calendar).build();
    }
}
