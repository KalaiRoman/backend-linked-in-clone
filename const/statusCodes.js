const codes={
// 200
ok:{code:200,message:"Ok"},
create:{code:201,message:"Created"},
Accepted:{code:202,message:"Accepted"},
NoContent:{code:204,message:"No Content"},
// 400
BadRequest:{code:400,message:"Bad Request"},
Unauthorized:{code:401,message:"Unauthorized"},
Forbidden:{code:403,message:"Forbidden"},
notfound:{code:404,message:"Not Found"},
Conflict:{code:409,message:"Conflict"},
UnprocessableEntity:{code:422,message:"Unprocessable Entity"},
// 500
InternalServerError:{code:500,message:"Internal Server Error"},
BadGateway:{code:500,message:"Bad Gateway"},
ServiceUnavailable:{code:503,message:"Service Unavailable:"},
GatewayTimeout:{code:504,message:"Gateway Timeout"},


// message success or failed
success:true,
failed:false,

}
export default codes;