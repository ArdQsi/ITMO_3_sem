package dao;

import models.Hit;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.List;

import utils.HibernateSessionFactoryUtil;


public class HitDao {
    private final SessionFactory factory;

    public HitDao() {
        factory = HibernateSessionFactoryUtil.getSessionFactory();
    }

    public void addHit(Hit hit) {
        Session session = factory.openSession();

        Transaction transaction = null;
        try {
            transaction = session.beginTransaction();

            session.persist(hit);

            transaction.commit();
        } catch (RuntimeException e) {
            if (transaction != null)
                transaction.rollback();
            System.out.println("can't add");
        } finally {
            session.close();
        }
    }

    public List<Hit> findAll() {
        List<Hit> hits = (List<Hit>) HibernateSessionFactoryUtil.getSessionFactory().openSession().createQuery("From Hit").list();
        return hits;
    }
}
