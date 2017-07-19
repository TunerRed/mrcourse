package ing.gzq.cache;


import ing.gzq.base.Result;

import static ing.gzq.base.ResultStatusMessage.M_FAILURE;
import static ing.gzq.base.ResultStatusMessage.M_OK;
import static ing.gzq.base.ResultStatusMessage.M_PERMISSION_DENIED;
import static ing.gzq.base.ResultStatusValues.V_FAILURE;
import static ing.gzq.base.ResultStatusValues.V_OK;
import static ing.gzq.base.ResultStatusValues.V_PERMISSION_DENIED;

/**
 * Created by 王镜鑫 on 17-4-23 下午10:04.
 */
public class ResultCache {
    public static final Result OK = new Result(V_OK, M_OK);
    public static final Result FAILURE = new Result(V_FAILURE, M_FAILURE);
    public static final Result PERMISSION_DENIED = new Result(V_PERMISSION_DENIED, M_PERMISSION_DENIED);

    public static Result getCache(int type) {
        if (type == 0) return FAILURE;
        if (type == 1) return OK;
        if (type == 3) return PERMISSION_DENIED;
        return null;
    }

    public static Result getDataOk(Object object) {
        Result result = new Result(V_OK, M_OK);
        result.setData(object);
        return result;
    }

    public static Result getFailureDetail(String message) {
        Result result = new Result(V_FAILURE,message);
        return result;
    }
}
