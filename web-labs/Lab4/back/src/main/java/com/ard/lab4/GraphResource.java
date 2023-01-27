package com.ard.lab4;

import org.jboss.ejb3.annotation.SecurityDomain;

import javax.ejb.EJB;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.persistence.*;
import javax.ws.rs.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Path("/api")
public class GraphResource {
    private long startTime;
    @EJB
    private AuthLogic authLogic;

    HashMap<Long, ArrayList<Point>> data = new HashMap<>();

    public GraphResource() {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("default");
        EntityManager em = emf.createEntityManager();
        EntityTransaction tx = em.getTransaction();
        tx.begin();

        Query q = em.createQuery("select c from Point c");

        List<Point> playerList = q.getResultList();
        for (Point p : playerList) {
            Long id = p.getOwner_id();
            if (this.data.containsKey(id)) {
                this.data.get(id).add(p);
            } else {
                ArrayList<Point> add = new ArrayList<>();
                add.add(new Point(p.getX(), p.getY(), p.getR(), p.isInside(), p.getOwner_id(), p.getCurrentTime(), p.getWorkTime()));
                this.data.put(id, add);
            }
        }

        tx.commit();
        em.close();
        emf.close();
    }


    @GET
    @Path("/entries")
    @Produces("application/json")
    public String getData(@HeaderParam("key") String key) {
        Object[] auth = authLogic.isValid(key);

        boolean isValid = (boolean) auth[0];
        if (!isValid)
            return "{\"error\": true, \"message\": \"Invalid key\"}";

        Long id = (Long) auth[1];

        String result = "";

        try (Jsonb jsonb = JsonbBuilder.create()) {
            result = jsonb.toJson(data.get(id));
        } catch (Exception ex) {
            result = "{\"error\": true, \"message\": \"Error creating JSON\"}";
        }
        return (result.equals("null") ? "[]" : result);
    }

    @POST
    @Path("/entries")
    @Produces("application/json")
    public String submit(@HeaderParam("key") String key, Map<String, String> params) {
        startTime = System.currentTimeMillis();

        String x = params.get("x");
        String y = params.get("y").replace(",", ".");
        String r = params.get("r");

        Object[] auth = authLogic.isValid(key);
        DateFormat formatter = new SimpleDateFormat("HH:mm:ss");
        String time = formatter.format(new Date());

        boolean isValid = (boolean) auth[0];
        if (!isValid)
            return "{\"error\": true, \"message\": \"Invalid key\"}";

        Long id = (Long) auth[1];

        double x_double;
        double y_double;
        double r_double;
        try {
            x_double = Double.parseDouble(x);
            y_double = Double.parseDouble(y);
            r_double = Double.parseDouble(r);
        } catch (NumberFormatException exception) {
            return "{\"error\": true, \"message\": \"Invalid input\"}";
        }
        long endTime = (System.currentTimeMillis() - startTime);

        Point point = new Point(x_double, y_double, r_double, checkIfInside(x_double, y_double, r_double), id, time, endTime);


        String result = "";

        try (Jsonb jsonb = JsonbBuilder.create()) {
            result = jsonb.toJson(point);
        } catch (Exception ex) {
            result = "{\"error\": true, \"message\": \"Error creating JSON\"}";
        }

        addData(point);

        return result;
    }

    public void addData(Point data) {
        Long id = data.getOwner_id();
        if (this.data.containsKey(id)) {
            this.data.get(id).add(data);
        } else {
            ArrayList<Point> add = new ArrayList<>();
            add.add(data);
            this.data.put(id, add);
        }
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("default");
        EntityManager em = emf.createEntityManager();
        EntityTransaction tx = em.getTransaction();
        tx.begin();

        Point data1 = new Point(data.getX(), data.getY(), data.getR(), data.isInside(), data.getOwner_id(), data.getCurrentTime(), data.getWorkTime());

        em.persist(data1);
        tx.commit();
        em.close();
        emf.close();
    }

    private boolean checkCircle(double x, double y, double r) {
        if (r >= 0) {
            return x >= 0 && y <= 0 && (Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r / 2, 2));
        } else {
            return x <= 0 && y >= 0 && (Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r / 2, 2));
        }
    }

    private boolean checkTriangle(double x, double y, double r) {
        if (r >= 0) {
            return x <= 0 && y >= 0 && (x + r >= y);
        } else {
            return x >= 0 && y <= 0 && (x + r <= y);
        }
    }

    private boolean checkRectangle(double x, double y, double r) {
        if (r >= 0) {
            return x <= 0 && y <= 0 && x >= -r / 2 && y >= -r;
        } else {
            return x >= 0 && y >= 0 && x <= -r / 2 && y <= -r;
        }
    }

    private boolean checkIfInside(double x, double y, double r) {
        if (r == 0) return false;
        return checkCircle(x, y, r) || checkTriangle(x, y, r) || checkRectangle(x, y, r);
    }
}