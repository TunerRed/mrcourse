package ing.gzq.base;

import lombok.Getter;
import lombok.Setter;

/**
 * Created by 王镜鑫 on 17-4-23 下午10:04.
 */
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
