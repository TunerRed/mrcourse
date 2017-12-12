package ing.gzq.base;

import lombok.Getter;
import lombok.Setter;

public class Result {
    public Result(int status,String message){
        this.status = status;
        this.message = message;
    }
    @Getter
    private Integer status;
    @Getter
    private String message;
    @Getter
    @Setter
    private Object data=null;
}
