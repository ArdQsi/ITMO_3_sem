package servlets;

import other.Row;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        long startTime = System.nanoTime();
        String type ="";
        type = req.getParameter("type");
        String x = req.getParameter("xval").replace(',', '.');
        String y = req.getParameter("yval").replace(',', '.');
        String r = req.getParameter("rval").replace(',', '.');
        boolean isValidate = validateValues(x, y, r);



                    if (isValidate || type.equals("picture")) {
                        double xValue = Double.parseDouble(x);
                        double yValue = Double.parseDouble(y);
                        double rValue = Double.parseDouble(r);
                        boolean isHit = checkHit(xValue, yValue, rValue);

                        OffsetDateTime currentTime = OffsetDateTime.now(ZoneOffset.UTC);
                        String time;
                        try {
                            currentTime = currentTime.minusMinutes(Long.parseLong(req.getParameter(("timezone"))));
                            time = currentTime.format(DateTimeFormatter.ofPattern("HH:mm:ss"));
                        } catch (Exception e) {
                            time = "HH:mm:ss";
                        }

                        String executionTime = String.valueOf((System.nanoTime() - startTime)/ 1000000);

                        Row row = new Row(xValue, yValue, rValue, time, executionTime, isHit);

                        HttpSession session = req.getSession();
                        String[] rows = (String[]) Optional.ofNullable(session.getAttribute("rows")).orElseGet(() -> new String[0]);
                        ArrayList<String> extendedRows = new ArrayList<>(Arrays.asList(rows));

                        String html = row.parseToHtml();
                        extendedRows.add(html);
                        session.setAttribute("rows", extendedRows.toArray(new String[0]));
                        req.setAttribute("row", html);


                        session.setAttribute("row", html);
                        if (isHit) {
                            req.getRequestDispatcher("/resultGood.jsp").forward(req, resp);
                        } else {
                            req.getRequestDispatcher("/resultBad.jsp").forward(req, resp);
                        }
                    }



    }


    private boolean validateValues(String x, String y, String r) {
        return validateX(x) && validateY(y) && validateR(r);
    }

    private boolean validateR(String r) {
        try {
            Double rRange[] = {1.0,2.0,3.0,4.0,5.0};
            double rValue = Integer.parseInt(r);
            return Arrays.asList(rRange).contains(rValue);
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private boolean validateX(String x) {
        try {
            Double xRange[] = {-5.0, -4.0, -3.0, -2.0, -1.0, 0d, 1.0, 2.0, 3.0};
            double xValue = Double.parseDouble(x);
            return Arrays.asList(xRange).contains(xValue);
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private boolean validateY(String y) {
        try {
            Double yValue = Double.parseDouble(y);
            return (yValue >= -3 && yValue <=3);
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private boolean checkHit(double x, double y, double r) {
        return checkRectangle(x,y,r) || checkCircle(x, y, r) || checkTriangle(x, y, r);
    }

    private boolean checkTriangle(double xValue, double yValue, double rValue) {
        return xValue >=0 && yValue <=0 && yValue >= (xValue - rValue/2);
    }

    private boolean checkCircle(double xValue, double yValue, double rValue) {
        return xValue <= 0 && yValue <= 0 && Math.sqrt(Math.pow(xValue,2) + Math.pow(yValue, 2)) <=rValue;
    }

    private boolean checkRectangle(double xValue, double yValue, double rValue) {
        return xValue >= 0 && yValue >= 0 && xValue <= rValue && yValue <= rValue/2;
    }
}
