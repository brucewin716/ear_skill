import * as api  from '../constants/api';

import * as http from './index';

export function check_login(){
	console.log(api.CHECK_LOGIN);
	return http.post({
		url:api.CHECK_LOGIN
	});
}

export function login(obj){
	return http.post({
		url:api.LOGIN,
		data:obj
	})
}

export function get_Time( ){
	return http.post({
		url:api.GET_TIME,
	}) 
}

export function get_emyloyee_list(obj){
	return http.post({
		url:api.GET_EMPLOYEE_LIST,
		data:obj||{}
	})
}

export function submit_service_items(obj){
	return http.post({
		url:api.SUBMIT_SERVICE_ITEMS,
		data:obj||{}
	})
}

export function get_business_amount(obj){
	return http.post({
		url:api.GET_BUSINESS_AMOUNT,
		data:obj
	});
}

export function submit_business_amount(obj){
	return http.post({
		url:api.SUBMIT_BUSINESS_AMOUNT,
		data:obj||{}
	});
}

//获取今天情况
export function get_today_situation(obj){
	return http.post({
		url:api.GET_TODAY_SITUATION,
		data:obj||{}
	});
}
// export function get_employee_kaohe(obj){
// 	return http.post({
// 		url:api.GET_EMPLOYYEE_KAOHE,
// 		data:obj||{}
// 	})
// }
// export function submit_employee_kaohe(obj){
// 	return http.post({
// 		url:api.SUBMIT_EMPLOYEE_KAOHE,
// 		data:obj||{}
// 	})
// }



