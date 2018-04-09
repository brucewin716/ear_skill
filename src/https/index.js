import axios from 'axios';
var instance=axios.create({
	// timeout:3000,
	headers:{'x-eryi-ajax':'taolineryi'}
})

export const get=function(opts){
	opts.method='GET';
	return instance(opts);

	// return instance({
	// 	method:"get",
	// 	url:url,
	// 	params:params||{},
	// 	headers:headers||{}
	// })
}

export const post=function(opts){
	opts.method='POST';
	return instance(opts);
	// return instance({
	// 	method:"post",
	// 	url:url,
	// 	data:options.data||{},
	// 	headers:options.headers||{}
	// });
}


export default instance

