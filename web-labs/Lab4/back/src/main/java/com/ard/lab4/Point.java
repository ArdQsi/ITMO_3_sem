package com.ard.lab4;

import javax.persistence.*;

@Entity
@Table(name = "point")
public class Point
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double x;
    private double y;
    private double r;
    private boolean inside;

    private String currentTime;

    private long workTime;

    private Long owner_id;

    public Point(double x, double y, double r, boolean inside, Long owner_id, String currentTime,
                 long workTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.inside = inside;
        this.owner_id = owner_id;
        this.currentTime = currentTime;
        this.workTime = workTime;
    }

    public Point(Point data) {
        this.x = data.getX();
        this.y = data.y;
        this.r = data.getR();
        this.inside = data.isInside();
        this.owner_id = data.getOwner_id();
        this.currentTime = data.getCurrentTime();
        this.workTime = data.getWorkTime();
    }

    public Point() {};

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }


    public double getR() {
        return r;
    }

    public boolean isInside() {
        return inside;
    }

    public void setX(int x) {
        this.x = x;
    }

    public void setY(double y) {
        this.y = y;
    }

    public void setY_for_slider(double y_for_slider) {
        this.y = y_for_slider / 100.;
    }

    public void setR(int r) {
        this.r = r;
    }

    public void setInside(boolean inside) {
        this.inside = inside;
    }

    @Override
    public String toString() {
        return String.format("[%f,%f,%f,%b,%s,%d]", x, y, r, inside, currentTime, workTime);
    }

    public Long getOwner_id() {
        return owner_id;
    }

    public void setOwner_id(Long owner_id) {
        this.owner_id = owner_id;
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

    public Long getId() {
        return id;
    }
}
