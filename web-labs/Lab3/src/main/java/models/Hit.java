package models;


import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "hit")
public class Hit implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "x")
    private float x;
    @Column(name = "y")
    private float y;
    @Column(name = "r")
    private float R;
    @Column(name = "currenttime")
    private String currentTime;
    @Column(name = "hit")
    private String hit;
    @Column(name = "worktime")
    private long workTime;

    public Hit() {

    }

    public Hit(float x, float y, float R) {
        this.x = x;
        this.y = y;
        this.R = R;
    }

    public float getR() {
        return R;
    }

    public void setR(float R) {
        this.R = R;
    }

    public float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }

    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    public String getHit() {
        return hit;
    }

    public void setHit(String isHit) {
        this.hit = isHit;
    }

    public String getCurrentTime() {
        return currentTime;
    }


    public void setCurrentTime(String currentTime) {
        this.currentTime = currentTime;
    }

    public long getWorkTime() {
        return workTime;
    }

    public void setWorkTime(long workTime) {
        this.workTime = workTime;
    }

    @Override
    public String toString() {
        return "x = " + x +
                ", y = " + y +
                ", R = " + R +
                ", isHit = " + getHit();
    }

    public void setId(int id) {
        this.id = id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

}