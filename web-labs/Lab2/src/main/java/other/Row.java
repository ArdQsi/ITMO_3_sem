package other;

public class Row {

    private final String r;
    private final String x;
    private final String y;
    private String time;
    private String executionTime;
    private boolean isHit;

    public Row(double x, double y, double r,  String time, String executionTime, boolean isHit) {
        this.x = String.valueOf(x);
        this.y = String.valueOf(y);
        this.r = String.valueOf(r);
        this.time = time;
        this.executionTime = executionTime;
        this.isHit = isHit;
    }

    public String parseToHtml() {
        String r = this.r.substring(0, Math.min(6, this.r.length()));
        String x = this.x.substring(0, Math.min(6, this.x.length()));
        String y = this.y.substring(0, Math.min(6, this.y.length()));

        return "<td class = result_x>" + x + "</td>"
                + "<td class = result_y>" + y + "</td>"
                + "<td class = result_r>" + r + "</td>"
                + "<td class= time>" + time + "</td>"
                + "<td class = executionTime>" + executionTime + "</td>"
                + "<td class = hit>" + isHit + "</td>";
    }
}
