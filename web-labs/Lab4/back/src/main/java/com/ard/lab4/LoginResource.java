package com.ard.lab4;

import javax.persistence.*;
import javax.ws.rs.*;
import java.util.List;
import java.util.Map;


@Path("/api")
public class LoginResource {
    @POST
    @Path("/login")
    @Produces("application/json")
    public String login(Map<String, String> params) {
        String login = params.get("username");
        String pass = params.get("password");

        EntityManagerFactory emf = Persistence.createEntityManagerFactory("default");
        EntityManager em = emf.createEntityManager();
        EntityTransaction tx = em.getTransaction();
        tx.begin();

        Query q = em.createQuery("select c from Auth c where c.login like ?1 and c.password like ?2")
                .setParameter(1, login)
                .setParameter(2, Auth.encrypt(pass));

        List<Auth> playerList = q.getResultList();

        em.close();
        emf.close();


        if (playerList.size() == 1)
            return "{ \"username\": \"" + login + "\", \"key\": \"" + playerList.get(0).getApi_key() + "\" }";
        else
            return "error";
    }

    @POST
    @Path("/register")
    @Produces("text/plain")
    public String register(Map<String, String> params) {
        String login = params.get("username");
        String pass = params.get("password");

        EntityManagerFactory emf = Persistence.createEntityManagerFactory("default");
        EntityManager em = emf.createEntityManager();
        EntityTransaction tx = em.getTransaction();
        tx.begin();

        Query q = em.createQuery("select c from Auth c where c.login like ?1")
                .setParameter(1, login);

        List<Auth> playerList = q.getResultList();

        Auth auth = new Auth(login, pass);
        if (playerList.size() == 0) {
            em.persist(auth);
            tx.commit();
        }

        em.close();
        emf.close();

        if (playerList.size() == 0) {
            return "{ \"username\": \"" + login + "\", \"key\": \"" + auth.getApi_key() + "\" }";
        }
        return "error";
    }
}