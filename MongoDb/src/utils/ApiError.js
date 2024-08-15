class ApiError extends Error{
    constructor(statusCode,message= "Something went wrong",errors=[],stack=""){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false //not passing the success code cause we are handling api error handling but not api response
        this.errors = errors

        if (stack) {
            this.stack = stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }

    }
}

export {ApiError}