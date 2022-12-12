package beans;

import models.Hit;
import services.HitService;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

public class HandlerBean implements Serializable {
    private long startTime;
    private Hit hit = new Hit();
    private HitService hitService = new HitService();
    private List<Hit> hits = new ArrayList<>();

    public HandlerBean() {
        setHits(hitService.findAll());
    }

    public void setHit(Hit hit) {
        this.hit = hit;
    }

    public Hit getHit() {
        return hit;
    }

    public void setHits(List<Hit> hits) {
        this.hits = hits;
    }

    public List<Hit> getHits() {
        List<Hit> outputHits = new ArrayList<>(hits);
        Collections.reverse(outputHits);
        return outputHits;
    }

    public void addHit() {
        startTime = System.nanoTime();
        hit.setHit(checkHit());
        DateFormat formatter = new SimpleDateFormat("hh:mm:ss a");
        String time = formatter.format(new Date());
        hit.setCurrentTime(time);
        hit.setWorkTime((System.nanoTime() - startTime));
        hits.add(hit);
        hitService.addHit(hit);

        hit = new Hit(hit.getX(), hit.getY(), hit.getR());
    }

    public String checkHit() {
        float x = hit.getX();
        float y = hit.getY();
        float R = hit.getR();
        if (x >= 0 && y >= 0) {
            if (x <= R / 2 && y <= R) return "Hit";
        } else if (x >= 0 && y <= 0) {
            if (Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(R / 2, 2)) return "Hit";
        } else if (x <= 0 && y <= 0) {
            if (y >= -x - R) return "Hit";
        }
        return "Miss";
    }
}
