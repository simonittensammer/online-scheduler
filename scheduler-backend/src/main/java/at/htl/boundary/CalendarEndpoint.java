package at.htl.boundary;

import at.htl.control.CalendarRepository;
import at.htl.entity.Appointment;
import at.htl.entity.Calendar;
import org.hibernate.Hibernate;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
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
}
