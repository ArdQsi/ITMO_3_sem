package services;

import dao.HitDao;
import models.Hit;

import java.util.List;

public class HitService {
    private HitDao hitDao = new HitDao();

    public HitService() {
    }

    public List<Hit> findAll() {
        return hitDao.findAll();
    }

    public void addHit(Hit hit){
        hitDao.addHit(hit);
    }
}
