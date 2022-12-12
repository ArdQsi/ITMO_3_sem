package validators;

import javax.faces.application.FacesMessage;

public class Message {
    public FacesMessage createMessage(String s) {
        FacesMessage msg = new FacesMessage(s);
        msg.setSeverity(FacesMessage.SEVERITY_ERROR);
        return msg;
    }
}
