module.exports = {
    successResponse: (res, msg) => {
        let data = {
            status: 200,
            message: msg
        }
        return res.status(200).json(data);
    },
    successResponseWithUid: (res, uid, msg) => {
        let data1 = {
            status: 200,
            uid: uid,
            message: msg
        }
        return res.status(200).json(data1);
    },
    successResponseWithData: (res, data, msg) => {
        let data1 = {
            status: 200,
            data: data,
            message: msg
        }
        return res.status(200).json(data1);
    },
    successResponseWithToken: (res, token, msg) => {
        var data = {
            status: 200,
            token: token,
            message: msg,

        }
        return res.status(200).json(data);
    },
    successResponseWithDataAndToken: (res, data, token, msg) => {
        var data = {
            status: 200,
            data: data,
            token: token,
            message: msg,
        }
        return res.status(200).json(data);
    },
    noDataResponse:(res,msg)=>{
        var data={
            status:404,
            msg:msg,
        }
        return res.status(200).json(msg)
    },
    successResponseWithAnotherStatus: (res, msg) => {
        var data = {
            status: 203,
            message: msg,

        }
        return res.status(203).json(data);
    },

    successResponseWithMultipleData: (res, data1, data2, msg) => {
        var data = {
            status: 200,
            data1: data1,
            data2: data2,
            message: msg,
        }
        return res.status(200).json(data);
    },

    successResponseWithAnotherStatusWithData: (res, data, msg) => {
        var data = {
            status: 181,
            message: msg,
            data: data,

        }
        return res.status(203).json(data);
    },

    errorResponse: (res, msg) => {
        var data = {
            status: 400,
            message: msg
        };
        return res.status(400).json(data);
    },

    errorResponseWithData: (res, msg, data) => {
        var data = {
            status: 400,
            message: msg,
            data: data
        };
        return res.status(400).json(data);
    },
    unAuthorizedResponse: (res, msg) => {
        var data = {
            status: 401,
            message: msg
        };
        return res.status(401).json(data);
    },

    validationErrorWithData: (res, data, msg) => {
        var data = {
            status: 400,
            data: data,
            message: msg
        };
        return res.status(400).json(data);
    },

    failedResponseWithCustomCode: (res, code, err) => {
        if (!code) code = 400;
        return res.status(code).json({
            status: code,
            error: err
        });
    },
    successDataResponse: (res, data)=>{
        var data={
            status: 200,
            data: data
        };
        return res.status(200).json(data)
    }
}