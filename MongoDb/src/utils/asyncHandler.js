const asyncHandler = function name(requestHandler) {
    // return requestHandler
    return(req,res,next) =>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((err)=> next((err)))

    }
}
export{asyncHandler}

//const asyncHandler = (fn)=>{} higher order functions are those functions which can accept functions as a paramiter or return
// const asyncHandlers = (fu)=>{()=>{}}
    
// const asyncHandler = (fn)=> async(req,res,next)=>{
//     try {
//         await fn(req,res,next)
//     } catch (err) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }

// export{asyncHandler}

/*
The second version immediately responds with an error message,
while the first version passes the error to the next middleware.
 */