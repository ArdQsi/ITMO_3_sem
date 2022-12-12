package validators;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

@FacesValidator("RValidator")
public class RValidator implements Validator {

    Message message = new Message();

    private Boolean validateR(String r) {
        for (float i = 1; i <= 3; i += 0.5) {
            if (Float.parseFloat(r) == i) {
                return true;
            }
        }
        return false;
    }

    @Override
    public void validate(FacesContext facesContext, UIComponent uiComponent, Object o) throws ValidatorException {
        try {
            if (!validateR(o.toString())) {
                if (!validateR(o.toString())) {
                    throw new ValidatorException(message.createMessage("Некорректное значение R!"));
                }
            }
        } catch (NullPointerException e) {
            throw new ValidatorException(message.createMessage("Введите значение!"));
        }
    }
}