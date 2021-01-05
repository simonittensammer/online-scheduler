package at.htl.boundary;

import at.htl.control.AppointmentRepository;
import at.htl.entity.Appointment;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/appointment")
@ApplicationScoped
@Transactional
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AppointmentEndpoint {

    @Inject
    AppointmentRepository ar;

    @GET
    public List<Appointment> getAll() {
        return ar.listAll();
    }

    @POST
    public Response addAppointment(Appointment appointment) {
        ar.persist(appointment);
        return Response.ok(appointment).build();
    }
}
